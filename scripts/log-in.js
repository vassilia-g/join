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
    const signUpButton = document.getElementById("sign-up-form-button");
    const customCheckbox = document.getElementById("custom-checkbox");
    const customCheckedCheckbox = document.getElementById("custom-checked-checkbox");

    if (customCheckbox) {
        signUpButton.disabled = false;
        signUpButton.classList.remove("disabled-sign-up-form-button");
        signUpButton.classList.add("enabled-sign-up-form-button");
        customCheckbox.classList.add("d-none");
        customCheckedCheckbox.classList.remove("d-none");
    } else {
        signUpButton.disabled = true;
        signUpButton.classList.add("disabled-sign-up-form-button");
        signUpButton.classList.remove("enabled-sign-up-form-button");
    }
}

function disableSignUpButton(){
    const signUpButton = document.getElementById("sign-up-form-button");
    const customCheckbox = document.getElementById("custom-checkbox");
    const customCheckedCheckbox = document.getElementById("custom-checked-checkbox");
    
    if (customCheckedCheckbox) {
        signUpButton.disabled = true;
        signUpButton.classList.add("disabled-sign-up-form-button");
        signUpButton.classList.remove("enabled-sign-up-form-button");
        customCheckedCheckbox.classList.add("d-none");
        customCheckbox.classList.remove("d-none");
    }
}
