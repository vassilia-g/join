document.addEventListener('DOMContentLoaded', moveLogoToTopLeft);
const password = "0000"

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

function disableSignUpButton() {
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

// function behavePasswordInput(event) {
//     const passwordInput = document.getElementById('input-password');
//     const passwordValue = passwordInput.value;

//     if (passwordValue.length < 6 && passwordValue.length >= 1 && passwordInput.type === 'password') {
//         checkVisibilityOff(event);
//     } else if (passwordValue.length < 6 && passwordValue.length >= 1 && passwordInput.type === 'text') {
//         checkVisibilityOn(event);
//     } else if (passwordValue.length < 1) {
//         checkPasswortIsEmpty(event)
//     }
// }

function behavePasswordInput(event) {
    const passwordInput = document.getElementById('input-password');
    const passwordValue = passwordInput.value;

    if (passwordValue != password && passwordInput.type === 'password') {
        checkVisibilityOff(event);
    } else if (passwordValue != password && passwordInput.type === 'text') {
        checkVisibilityOn(event);
    } else if (passwordValue.length == 0) {
        checkPasswortIsEmpty(event)
    }
}

function checkPasswortIsEmpty(event) {
    event.preventDefault();
    document.getElementById('visibility-on').classList.add('d-none');
    document.getElementById('visibility-off').classList.add('d-none');
    document.getElementById('lock-symbol').classList.remove('d-none');
    document.getElementById('error-password-length').classList.remove('d-none');
    document.getElementById('forgotten-password').classList.add('d-none');
    document.getElementById('input-password').focus();
}

function checkVisibilityOff(event) {
    event.preventDefault();
    document.getElementById('visibility-off').classList.remove('d-none');
    document.getElementById('visibility-on').classList.add('d-none');
    document.getElementById('forgotten-password').classList.add('d-none');
    document.getElementById('error-password-length').classList.remove('d-none');
    document.getElementById('input-password').focus();
}

function checkVisibilityOn(event) {
    event.preventDefault();
    document.getElementById('visibility-on').classList.remove('d-none');
    document.getElementById('lock-symbol').classList.add('d-none');
    document.getElementById('forgotten-password').classList.add('d-none');
    document.getElementById('error-password-length').classList.remove('d-none');
    document.getElementById('input-password').focus();
}

function changeSymbols() {
    const passwordInput = document.getElementById('input-password');
    const passwordValue = passwordInput.value;
    const lockSymbol = document.getElementById('lock-symbol');
    const visibilityOffSymbol = document.getElementById('visibility-off');
    const visibilityOnSymbol = document.getElementById('visibility-on');

    if (passwordValue.length >= 1) {
        lockSymbol.classList.add('d-none');
        if (passwordInput.type === 'password') {
            visibilityOffSymbol.classList.remove('d-none');
        } if (passwordInput.type === 'text') {
            visibilityOnSymbol.classList.remove('d-none');
        }
    } else {
        visibilityOffSymbol.classList.add('d-none');
        visibilityOnSymbol.classList.add('d-none');
        lockSymbol.classList.remove('d-none');
    }
}


// function clearInput() {
//     const lockSymbol = document.getElementById('lock-symbol');
//     const visibilityOffSymbol = document.getElementById('visibility-off');
//     const visibilityOnSymbol = document.getElementById('visibility-on');
//     if (!visibilityOnSymbol.contains('d-none')) {
//         return;
//     } else {
//         document.getElementById('input-password').value = ''
//         document.getElementById('error-password-length').classList.add('d-none');
//         document.getElementById('forgotten-password').classList.remove('d-none');
//         lockSymbol.classList.remove('d-none');
//         visibilityOffSymbol.classList.add('d-none');
//     }
// }

function goToOtherPage(event) {
    event.preventDefault()
    window.location.replace("html/sidebar.html");
}

function makePasswordVisible() {
    const visibilityOffSymbol = document.getElementById('visibility-off');
    const visibilityOnSymbol = document.getElementById('visibility-on');
    visibilityOffSymbol.classList.add('d-none');
    visibilityOnSymbol.classList.remove('d-none');
    document.getElementById('input-password').type = 'text';
}

function hidePassword() {
    const visibilityOffSymbol = document.getElementById('visibility-off');
    const visibilityOnSymbol = document.getElementById('visibility-on');
    visibilityOnSymbol.classList.add('d-none');
    visibilityOffSymbol.classList.remove('d-none');
    document.getElementById('input-password').type = 'password';
}