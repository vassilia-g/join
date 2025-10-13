//Funktion wird bei DOMload ausgeführt und führt die Funktions aus moveLogoToTopLeft
document.addEventListener("DOMContentLoaded", moveLogoToTopLeft)

const users = getAllUsers();

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

//function ativated when DOM is loaded
//logo moves to top left
//sign up and log in container become visible
//log in area become visible
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

//function changes log in to sign up container
function showSignUpContainer() {
    const signUpContainer = document.getElementById("sign-up-container");
    const logInContainer = document.getElementById("log-in-container");
    const registryContainer = document.getElementById("registry-container");

    if (signUpContainer) {
        const errorText = document.getElementById("error-text-password-match");
        const errorEmailExists = document.getElementById('error-email-exists');
        const responsiveRegistryContainer = document.getElementById('responsive-registry-container');
        errorText.classList.add('d-none');
        errorEmailExists.classList.add('d-none');
        signUpContainer.classList.remove("d-none");
        logInContainer.classList.add("d-none");
        registryContainer.classList.add("d-none");
        responsiveRegistryContainer.classList.add("d-none");
    }
}
//function enables the button when checkbox is checked
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

//function disables the button when checkbox is unchecked
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

//function checks if passwords match and shows error text if not
function checkSignUpPasswords(event) {
    event.preventDefault();
    const password = document.getElementById("input-sign-up-password");
    const confirmPassword = document.getElementById("input-sign-up-confirm-password");
    const errorText = document.getElementById("error-text-password-match");
    if (!(password.value == confirmPassword.value)) {
        errorText.classList.remove("d-none");
    } else {
        errorText.classList.add("d-none");
    }
}

//function shows success text when signed up and goes back to log in container
function visibleSignUp() {
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
    }, 2000);
}

function showOverlay() {
    // event.preventDefault();
    const overlay = document.getElementById("overlay");
    overlay.classList.remove("d-none");
}

function hideOverlay() {
    const overlay = document.getElementById("overlay");
    overlay.classList.add("d-none");
}

//Function is activ when something is typed in the password field
//changes symbolls depending on input and pw visibility
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

//on log in function is checking PW and Email and if correct, goes to other page 
async function goToStartpage(event) {
    event.preventDefault();

    const inputEmail = document.getElementById("input-email");
    const inputPassword = document.getElementById("input-password");
    const redError = document.getElementById("error-email-password-text");

    const users = await getAllUsers(); // <-- await hier
    const user = (users || []).find(u => u.email === inputEmail.value);
    if (user && user.password === inputPassword.value) {
        localStorage.setItem("currentUserId", user.id);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userInitials', (user.username.match(/\b\w/g) || []).join('').toUpperCase());
        window.location.replace("html/summary.html"); // <-- overlay? + Infotext
    } else {
        redError.classList.remove("d-none");
    }
}

//function chnanges the type of the password and the symbol accordingly
function makePasswordVisible() {
    const visibilityOffSymbol = document.getElementById('visibility-off');
    const visibilityOnSymbol = document.getElementById('visibility-on');
    visibilityOffSymbol.classList.add('d-none');
    visibilityOnSymbol.classList.remove('d-none');
    document.getElementById('input-password').type = 'text';
}

//function changes the type of the password and the symbol accordingly
function hidePassword() {
    const visibilityOffSymbol = document.getElementById('visibility-off');
    const visibilityOnSymbol = document.getElementById('visibility-on');
    visibilityOnSymbol.classList.add('d-none');
    visibilityOffSymbol.classList.remove('d-none');
    document.getElementById('input-password').type = 'password';
}

//function goes back to log in an disables checkbox
function backtoLogIn() {
    const logInContainer = document.getElementById('log-in-container');
    logInContainer.classList.remove('d-none');
    const signUpContainer = document.getElementById('sign-up-container');
    signUpContainer.classList.add('d-none');
    const registryContainer = document.getElementById('registry-container');
    registryContainer.classList.remove('d-none');
    const responsiveRegistryContainer = document.getElementById(`responsive-registry-container`);
    responsiveRegistryContainer.classList.remove('d-none');
    disableSignUpButton();
    clearSignUpForm();
}

function clearSignUpForm() {
    const signUpForm = document.getElementById("form-sign-up");
    signUpForm.reset();
}

function guestLogIn() {
    localStorage.setItem("currentUserId", "guest");
    localStorage.setItem('isLoggedIn', 'true');
    window.location.replace("./html/summary.html");
}
