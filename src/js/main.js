import { createPriceProductionChart, createNutritionChart, createDriversChart } from './charts.js';
import '../styles/main.css';

document.addEventListener('DOMContentLoaded', () => {
    createPriceProductionChart();
    createNutritionChart();
    createDriversChart();

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });
}); 