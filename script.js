document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('multiStepForm');
  if (!form) return;

  const steps = Array.from(form.querySelectorAll('.step'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentStep = 0;

  const controlOptions = document.getElementById('controlOptions');
  const controlInput = document.getElementById('controlInput');

  if (controlOptions) {
    controlOptions.addEventListener('click', e => {
      const box = e.target.closest('.option-box');
      if (!box) return;
      controlOptions.querySelectorAll('.option-box').forEach(el => el.classList.remove('selected'));
      box.classList.add('selected');
      controlInput.value = box.dataset.value;
    });
  }

  const showStep = (stepIndex) => {
    steps.forEach((step, index) => {
      step.classList.toggle('active', index === stepIndex);
    });
    prevBtn.disabled = stepIndex === 0;
    nextBtn.textContent = stepIndex === steps.length - 1 ? 'Enviar' : 'Siguiente';
  };

  const validateStep = () => {
    const activeStep = steps[currentStep];
    const inputs = activeStep.querySelectorAll('input[required], select[required], textarea[required]');
    for (const input of inputs) {
      if (!input.value.trim()) {
        const label = form.querySelector(`label[for="${input.id}"]`);
        const labelText = label ? label.textContent : input.name;
        alert(`Por favor, completa el campo: "${labelText}"`);
        input.focus();
        return false;
      }
    }
    if (currentStep === 0 && !controlInput.value) {
      alert('Por favor, selecciona una opción de relación.');
      return false;
    }
    return true;
  };
  
  // --- NUEVA FUNCIÓN PARA ENVÍO ASÍNCRONO ---
  const handleFormSubmit = async () => {
    const statusContainer = document.getElementById('form-submission-status');
    const data = new FormData(form);

    // Deshabilitar botones para evitar envíos múltiples
    nextBtn.disabled = true;
    nextBtn.textContent = 'Enviando...';

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      // Ocultar el formulario
      form.classList.add('hidden');

      if (response.ok) {
        // Mostrar mensaje de éxito
        statusContainer.innerHTML = `
          <h3>Gracias por registrarte</h3>
          <p>Tu formulario fue enviado con éxito.</p>
        `;
      } else {
        // Mostrar mensaje de error del servidor
        statusContainer.classList.add('error');
        statusContainer.innerHTML = `
          <h3>Hubo un error</h3>
          <p>No se pudo enviar el formulario. Por favor, inténtalo de nuevo más tarde o contáctame directamente.</p>
        `;
      }
    } catch (error) {
      // Ocultar el formulario y mostrar error de red
      form.classList.add('hidden');
      statusContainer.classList.add('error');
      statusContainer.innerHTML = `
        <h3>Hubo un error de conexión</h3>
        <p>No se pudo enviar el formulario. Revisa tu conexión a internet e inténtalo de nuevo.</p>
      `;
    }
  };

  nextBtn.addEventListener('click', () => {
    if (!validateStep()) {
      return;
    }

    if (currentStep === steps.length - 1) {
      // En el último paso, llamar a la nueva función en lugar de submit()
      handleFormSubmit();
    } else {
      currentStep++;
      showStep(currentStep);
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });

  showStep(currentStep);
});