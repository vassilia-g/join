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

function showSignUpContainer() {
    const signUpContainer = document.getElementById("sign-up-container");
    const logInContainer = document.getElementById("log-in-container");
    const registryContainer = document.getElementById("registry-container");
    if (signUpContainer) {
        signUpContainer.classList.remove("d-none");
        logInContainer.classList.add("d-none");
        registryContainer.classList.add("d-none");
    }
}

function enableSignUpButton() {
    const checkbox = document.getElementById("checkbox");
    const signUpButton = document.getElementById("sign-up-form-button");
    
    if (checkbox && signUpButton) {
        if (checkbox.checked) {
            signUpButton.disabled = false;
            signUpButton.classList.remove("disabled-sign-up-form-button");
            signUpButton.classList.add("enabled-sign-up-form-button");
        } else {
            signUpButton.disabled = true;
            signUpButton.classList.add("disabled-sign-up-form-button");
            signUpButton.classList.remove("enabled-sign-up-form-button");
        }
    }
}