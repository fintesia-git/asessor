import Chart from 'chart.js/auto';

const almondData = {
    years: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    prices: [2.48, 2.08, 1.56, 1.41, 0.86, 0.97, 0.91, 1.11, 1.57, 2.21, 2.81, 2.06, 1.75, 1.45, 1.65, 1.79, 1.99, 2.58, 3.21, 4.00, 3.13, 2.39, 2.53, 2.50, 2.45, 1.71, 1.86, 1.40, 1.72, 2.14],
    production: [370, 510, 759, 750, 680, 780, 900, 890, 1000, 1070, 1100, 1140, 1330, 1560, 1480, 1600, 2030, 1890, 2010, 1870, 1900, 2140, 2270, 2280, 2560, 3115, 2935, 2580, 2455, 2730]
};

const nutritionData = {
    labels: ['Grasas (14g)', 'Carbohidratos (6g)', 'Proteínas (6g)'],
    data: [14, 6, 6]
};

const driversData = {
    labels: ['Intolerancia a la Lactosa', 'Salud y Bienestar', 'Dietas Veganas/Vegetarianas', 'Innovación de Producto', 'Sostenibilidad'],
    data: [68, 60, 45, 35, 30]
};

export function createPriceProductionChart() {
    const ctx = document.getElementById('priceProductionChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: almondData.years,
            datasets: [{
                type: 'line',
                label: 'Precio Recibido (USD/lb)',
                data: almondData.prices,
                borderColor: '#C89B7B',
                backgroundColor: '#C89B7B',
                yAxisID: 'y1',
                tension: 0.3,
            }, {
                type: 'bar',
                label: 'Producción (Millones de lbs)',
                data: almondData.production,
                backgroundColor: '#EFEBE9',
                borderColor: '#E0E0E0',
                borderWidth: 1,
                yAxisID: 'y',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: {
                    grid: { display: false }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Producción (Millones de lbs)'
                    },
                    grid: { color: '#f0f0f0' }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Precio (USD/lb)'
                    },
                    grid: { display: false }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                if(context.dataset.type === 'line'){
                                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                                } else {
                                    label += context.parsed.y + ' M lbs';
                                }
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}

export function createNutritionChart() {
    const ctx = document.getElementById('nutritionChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: nutritionData.labels,
            datasets: [{
                data: nutritionData.data,
                backgroundColor: ['#8D6E63', '#C89B7B', '#EFEBE9'],
                borderColor: '#FDFBF7',
                borderWidth: 4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` ${context.label}`;
                        }
                    }
                }
            }
        }
    });
}

export function createDriversChart() {
    const ctx = document.getElementById('driversChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: driversData.labels,
            datasets: [{
                label: 'Importancia Relativa',
                data: driversData.data,
                backgroundColor: '#C89B7B',
                borderColor: '#8D6E63',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { display: false },
                    ticks: { display: false }
                },
                y: {
                    grid: { display: false }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '';
                        }
                    }
                }
            }
        }
    });
} 