document.addEventListener('DOMContentLoaded', moveLogoToTopLeft);

function moveLogoToTopLeft() {
    const logo = document.getElementById('logo');
    const logInContainer = document.getElementById('log-in-container');
    const registryContainer = document.getElementById('registry-container');
    if (logo) {
        setTimeout(() => {
            logo.classList.add('logo-move-to-top-left');
            logInContainer.classList.remove('d-none');
            registryContainer.classList.remove('d-none');
        }, 500);
    };
}

