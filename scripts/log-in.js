const signUpContainer = document.getElementById("sign-up-container");
const logInContainer = document.getElementById("log-in-container");
const registryContainer = document.getElementById("registry-container");
const errorText = document.getElementById("error-text-password-match");
const errorEmailExists = document.getElementById('error-email-exists');
const responsiveRegistryContainer = document.getElementById('responsive-registry-container');
const signUpButton = document.getElementById("sign-up-form-button");
const customCheckbox = document.getElementById("custom-checkbox");
const customCheckedCheckbox = document.getElementById("custom-checked-checkbox");
const logoWrapper = document.getElementById('logo-wrapper');
const logoWeiß = document.getElementById('logo-weiß');
const passwordInput = document.getElementById('input-password');
const passwordValue = passwordInput.value;
const lockSymbol = document.getElementById('lock-symbol');
const signUpForm = document.getElementById("form-sign-up");
const visibilityOffSymbol = document.getElementById('visibility-off');
const visibilityOnSymbol = document.getElementById('visibility-on');
const inputEmail = document.getElementById("input-email");
const inputPassword = document.getElementById("input-password");
const redError = document.getElementById("error-email-password-text");
const overlay = document.getElementById("overlay");
const successText = document.getElementById("successfully-signed-up")
const password = document.getElementById("input-sign-up-password");
const confirmPassword = document.getElementById("input-sign-up-confirm-password");


/** 
 * On DOMContentLoaded: adjust logo position for small screens or move logo to top-left.
 * Also swaps logo image on small screens after a short delay.
 */
document.addEventListener("DOMContentLoaded", () => {

    if (window.innerWidth <= 733) {
        logoWrapper.classList.add("logo-move-to-top-left");
        setTimeout(() => {
            logoWeiß.src = "/assets/imgs/join-logo/capa-2.svg";
        }, 500);
    } else {
        moveLogoToTopLeft();
    }
});


/** 
 * Cached promise of loading all users from backend.
 * (Used later for login checks.)
 */
const users = getAllUsers();


/** 
 * On DOMContentLoaded: attach focus/blur handlers to inputs to toggle active border styles.
 */
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


/** 
 * Move logo element to top-left with animations and reveal login/registry containers.
 */
function moveLogoToTopLeft() {

    if (logoWrapper) {
        setTimeout(() => {
            logoWrapper.classList.add('logo-move-to-top-left');
            logoWeiß.classList.add('d-none');
            logInContainer.classList.remove('d-none');
            registryContainer.classList.remove('d-none');
        }, 700);
    };
}


/** 
 * Show the sign-up form container and hide login/registry UI, reset visible errors.
 */
function showSignUpContainer() {

    if (signUpContainer) {
        errorText.classList.add('d-none');
        errorEmailExists.classList.add('d-none');
        signUpContainer.classList.remove("d-none");
        logInContainer.classList.add("d-none");
        registryContainer.classList.add("d-none");
        responsiveRegistryContainer.classList.add("d-none");
    } else {
        alert.error("Sign up could not be loaded, please try again later.");
    }
}


/** 
 * Enable the sign-up button and toggle checkbox visuals when user accepts terms.
 */
function enableSignUpButton() {

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


/** 
 * Disable the sign-up button and toggle checkbox visuals when user unchecks acceptance.
 */
function disableSignUpButton() {

    if (customCheckedCheckbox) {
        signUpButton.disabled = true;
        signUpButton.classList.add("disabled-sign-up-form-button");
        signUpButton.classList.remove("enabled-sign-up-form-button");
        customCheckedCheckbox.classList.add("d-none");
        customCheckbox.classList.remove("d-none");
    }
}


/** 
 * Validate sign-up password and confirmation; show error message when they don't match.
 */
function checkSignUpPasswords(event) {
    event.preventDefault();

    if (!(password.value == confirmPassword.value)) {
        errorText.classList.remove("d-none");
    } else {
        errorText.classList.add("d-none");
    }
}


function checkSignUpPasswordsOnInput() {
    if (confirmPassword.value.length > 0) {
        errorText.classList.remove("d-none")
    }
    
    if (confirmPassword.value === password.value && confirmPassword.value.length > 0) {
        errorText.classList.add("d-none")
    }
}


/** 
 * Show a brief overlay animation after successful sign-up and return to login view.
 */
function visibleSignUp() {

    setTimeout(() => {
        showOverlay();
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


/** 
 * Reveal the generic overlay element.
 */
function showOverlay() {

    overlay.classList.remove("d-none");
}


/** 
 * Hide the generic overlay element.
 */
function hideOverlay() {

    overlay.classList.add("d-none");
}


/** 
 * Update password input symbols visibility based on input length.
 */
function changeSymbols() {


    if (passwordValue.length >= 1) {
        lockSymbol.classList.add('d-none');
        hidePassword();
        showPassword();
    } else {
        standardPasswordSymbol()
    }
}


/** 
 * Reset password visibility icons to default state.
 */
function standardPasswordSymbol() {

    visibilityOffSymbol.classList.add('d-none');
    visibilityOnSymbol.classList.add('d-none');
    lockSymbol.classList.remove('d-none');
}


/** 
 * Force the password field into masked mode and keep the hide icon visible.
 */
function hidePassword() {

    visibilityOnSymbol.classList.add('d-none');
    visibilityOffSymbol.classList.remove('d-none');
    document.getElementById('input-password').type = 'password';
    const passwordInput = document.getElementById('input-password');
    if (passwordInput.type === 'password') {
        visibilityOffSymbol.classList.remove('d-none');
    }
}


/** 
 * Show the plain-text password and update icons.
 */
function showPassword() {

    if (passwordInput.type === 'text') {
        visibilityOnSymbol.classList.remove('d-none');
    }
}


/** 
 * Handle user login: validate credentials and redirect to summary on success.
 */
async function goToStartpage(event) {
    event.preventDefault();

    const users = await getAllUsers();
    const user = (users || []).find(u => u.email === inputEmail.value);
    if (user && user.password === inputPassword.value) {
        localStorage.setItem("currentUserId", user.id);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userInitials', (user.username.match(/\b\w/g) || []).join('').toUpperCase());
        window.location.replace("html/summary.html");
    } else {
        redError.classList.remove("d-none");
    }
}


/** 
 * Make password visible: show "visibility on" icon and set input type to text.
 */
function makePasswordVisible() {

    visibilityOffSymbol.classList.add('d-none');
    visibilityOnSymbol.classList.remove('d-none');
    document.getElementById('input-password').type = 'text';
}


/** 
 * Return UI to login view, clear form and reset sign-up controls.
 */
function backtoLogIn() {

    logInContainer.classList.remove('d-none');
    signUpContainer.classList.add('d-none');
    registryContainer.classList.remove('d-none');
    responsiveRegistryContainer.classList.remove('d-none');
    disableSignUpButton();
    clearSignUpForm();
}


/** 
 * Reset the sign-up form fields.
 */
function clearSignUpForm() {

    signUpForm.reset();
}


/** 
 * Log in as guest: set guest id in localStorage and redirect to summary.
 */
function guestLogIn() {

    localStorage.setItem("currentUserId", "guest");
    localStorage.setItem('isLoggedIn', 'true');
    window.location.replace("./html/summary.html");
}
