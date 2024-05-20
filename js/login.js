document.addEventListener('DOMContentLoaded', function() {
    // Obtener el parámetro 'error' de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');

    // Si hay un error de inicio de sesión, mostrar el mensaje de error
    if (error === '1') {
        // Mostrar el mensaje de error
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Campos incorrectos';
        errorMessage.style.display = 'block';

        // Agregar la clase 'error' a los campos de entrada correspondientes
        const emailInput = document.getElementById('email');
        emailInput.classList.add('error');

        const passwordInput = document.getElementById('password');
        passwordInput.classList.add('error');

        // Ocultar el mensaje de error después de 15 segundos
        setTimeout(function() {
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';
            emailInput.classList.remove('error');
            passwordInput.classList.remove('error');
        }, 5000); // 5 segundos
    }
});