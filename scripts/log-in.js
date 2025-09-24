//Funktion wird bei DOMload ausgeführt und führt die Funktions aus moveLogoToTopLeft
document.addEventListener("DOMContentLoaded", moveLogoToTopLeft)
const users = [
    { email: "a@a.com", password: "aaa" },
    { email: "b@b.com", password: "bbb" },
    { email: "c@c.com", password: "ccc" }
];

//Funktion wird bei DOMload ausgeführt und führt die Funktion aus, die das Logo bewegen und den Log in Bereich anzeigen lässt.
// lässt focussierte Inputfelder blau umrandet erscheinen
document.addEventListener("DOMContentLoaded",
    () => {
        const inputs = document.querySelectorAll(".input-email-container input, .input-password-container input, .input-sign-up-name-container input, .input-sign-up-email-container input, .input-sign-up-password-container input, .input-sign-up-confirm-password-container input");

        inputs.forEach(input => {
            input.addEventListener("focus", () => {
                input.parentElement.classList.add("active-border-color");
            });

            input.addEventListener("blur", () => {
                input.parentElement.classList.remove("active-border-color");
            });
        });
    });

//Die Funktion wird bei DOMload ausgeführt
//Das Logo geht links in die Ecke
//Der Sign up Buton wird sichtbar
//Der Log in Bereicht wird sichtbar
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

//Die Funktion lässt den Log in Bereich zum Sign up Bereich werden
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
//Die Funktion setzt den Button auf enabled, wenn Checkbox aktiviert wurde
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

//Die Funktion setzt den Button auf disabled, wenn checkbox deaktiviert wird
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

//Funktion prüft ob Passwörter übereinstimmen
function checkSignUpPasswords(event) {
    event.preventDefault();
    const password = document.getElementById("input-sign-up-password");
    const confirmPassword = document.getElementById("input-sign-up-confirm-password");
    const errorText = document.getElementById("error-text-password-match");
    if (!(password.value == confirmPassword.value)) {
        errorText.classList.remove("d-none");
    } else {
        errorText.classList.add("d-none");
        visibleSignUp(event)
    }
}

//Funktion lässt optischen Erfolg reinschweben und leitet dann weiter zum Log in
function visibleSignUp(event) {
    event.preventDefault();
    const successText = document.getElementById("successfully-signed-up")
    setTimeout(() => {
        showOverlay(event);
        successText.classList.remove("d-none");
        successText.classList.add("from-bottom-to-the-mid");
    }, 500)
    setTimeout(() => {
        hideOverlay();
    }, 2000);
    setTimeout(() => {
        backtoLogIn();
    }, 2500);
}

function showOverlay(event) {
    event.preventDefault();
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("d-none");
}

function hideOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.classList.add("d-none");
}

//Funktion wird ausgeführt wenn im Passwortfeld etwas eingegeben wird
//Es verändert die Symbole des Passwortfeldes bei Eingabe
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

//Die Funktion prüft Email und Passwort und leitet weiter 
function goToOtherPage(event) {
    event.preventDefault()

    const inputEmail = document.getElementById("input-email");
    const inputPassword = document.getElementById("input-password");
    const user = users.find(u => u.email === inputEmail.value);
    const redError = document.getElementById("error-email-password-text");

    if (user && user.password === inputPassword.value) {
        window.location.replace("html/summary.html");
    } else {
        redError.classList.remove("d-none")
    }
}

//Die Funktion ändert den Type des Passwortes und das Symbol entsprechend
function makePasswordVisible() {
    const visibilityOffSymbol = document.getElementById('visibility-off');
    const visibilityOnSymbol = document.getElementById('visibility-on');
    visibilityOffSymbol.classList.add('d-none');
    visibilityOnSymbol.classList.remove('d-none');
    document.getElementById('input-password').type = 'text';
}

//Die Funktion ändert den Type des Passwortes und das Symbol entsprechend
function hidePassword() {
    const visibilityOffSymbol = document.getElementById('visibility-off');
    const visibilityOnSymbol = document.getElementById('visibility-on');
    visibilityOnSymbol.classList.add('d-none');
    visibilityOffSymbol.classList.remove('d-none');
    document.getElementById('input-password').type = 'password';
}

//Funktion führt zum Log in Bereich zurück und disabled eventuell enabled Checkbox
function backtoLogIn() {
    const logInContainer = document.getElementById('log-in-container');
    logInContainer.classList.remove('d-none');
    const signUpContainer = document.getElementById('sign-up-container');
    signUpContainer.classList.add('d-none');
    const registryContainer = document.getElementById('registry-container');
    registryContainer.classList.remove('d-none');
    disableSignUpButton();
    clearSignUpForm();
}

function clearSignUpForm() {
    const signUpForm = document.getElementById("form-sign-up");
    signUpForm.reset();
}

