const allowedRegex = /[^a-zA-ZäöüÄÖÜßàâéèêëîïôùûçÅåØøÆæÑñ\-`' ]+/g;
const numberRegex = /\d/;


/** 
 * adds event listeners to validate name at sign up in realtime and on blur
 */
inputSignUpName.addEventListener("input", validateNameNumberForSignUp);
inputSignUpName.addEventListener("blur", validateNameLengthForSignUp);


/** 
 * Validates the name at sign up. When name contains numbers, error text will be showen when blur the field
 */
function validateNameNumberForSignUp() {
    const value = inputSignUpName.value.trim();
    const hasNumber = numberRegex.test(value);
    const hasInvalidChar = allowedRegex.test(value);

    if (hasNumber || hasInvalidChar) {
        errorTextUserName.classList.remove("d-none");
        disableSignUpButton();
    } else {
        errorTextUserName.classList.add("d-none");
    }

    errorUsernameAndMailRequired.classList.add("d-none", !hasNumber)
    inputSignUpName.value = value.replace(/\s{2,}/g, ' ');
}


/** 
 * valdidates the length of the name when blur the field.
 */
function validateNameLengthForSignUp() {

    const value = inputSignUpName.value.trim();

    if (value.length < 2) {
        errorTextToShortUserName.classList.remove("d-none");
        disableSignUpButton();
    } else {
        errorTextToShortUserName.classList.add("d-none");
    }
}


/** 
 * Validates the email address at sign up.
 */
function validateEmailInputForSignUp() {
    const input = inputSignUpEmail.value.trim();

    if (!emailRegex.test(input)) {
        emailErrorSignUp.classList.remove('d-none');
        inputEmail.value = "";
        disableSignUpButton();
        return false
    }
    emailErrorSignUp.classList.add('d-none');
    return true;
}


/** 
 * Validates the email address length at sign up when blur.
 */
inputSignUpEmail.addEventListener('blur', () => {
    const input = inputSignUpEmail.value.trim();

    if (input.length === 0 || input === "") {
        emailErrorSignUp.classList.add('d-none');
        disableSignUpButton();
        return false
    }
    if (!validateEmailInputForSignUp() || input.length < 6) {
        emailErrorSignUp.classList.remove('d-none');
    } else {
        emailErrorSignUp.classList.add('d-none');
    };
})


/** 
 * Validates the email address at log in.
 */
function validateEmailInputForLogin() {

    const input = inputEmail.value.trim();
    const emailRegex = /^[a-zA-Z0-9äöüÄÖÜ]+([._%+-]?[a-zA-Z0-9äöüÄÖÜ]+)*@[a-zA-Z0-9äöüÄÖÜ]+([.-]?[a-zA-Z0-9äöüÄÖÜ]+)*\.[a-zA-ZäöüÄÖÜ]{2,}$/;;

    if (!emailRegex.test(input)) {
        emailError.classList.remove('d-none');
        disableSignUpButton();
        return false
    }
    emailError.classList.add('d-none');
    return true;
}


/** 
 * Removes the error text forwrong email address or password when input starts.
 */
inputEmail.addEventListener('input', () => {
    redError.classList.add('d-none');
});


/** 
 * Removes the error text forwrong email address or password when input starts.
 */
inputPassword.addEventListener('input', () => {
    redError.classList.add('d-none');
});


/** 
 * Removes the error text for invalid emailaddress at login when input starts.
 */
inputEmail.addEventListener('input', () => {
    emailError.classList.add('d-none');
});


/** 
 * Removes the error text for invalid email address and the error text for reqired inputs at sign up when input starts.
 */
inputSignUpEmail.addEventListener('input', () => {
    emailErrorSignUp.classList.add('d-none');
    errorUsernameAndMailRequired.classList.add("d-none")
});


/** 
 * Removes the error text for wrong and to short password at sign up when input starts.
 */
password.addEventListener('input', () => {
    errorTextPasswordMatch.classList.add('d-none');
    errorTextPasswordLength.classList.add('d-none');
});


/** 
 * Validates the email address at log-in when blur.
 */
inputEmail.addEventListener('blur', () => {
    const input = inputEmail.value.trim();
    if (input.length === 0) {
        emailError.classList.add('d-none');
        return
    }
    if (!validateEmailInputForLogin()) {
        emailError.classList.remove('d-none');
    } else {
        emailError.classList.add('d-none');
    };
})


/** 
 * Validate sign-up email in realtime; show error message when email allreday exists.
 */
async function checkEmailExistsOnInput() {

    const data = await getData("users") || {};
    const users = Object.entries(data).map(([key, u = {}]) => new User(
        key,
        u.color ?? null,
        u.username ?? "",
        u.password ?? "",
        u.email ?? "",
        u.status ?? "active",
        u.createdAt ?? null,
        u.phone ?? ""
    ));
    const exists = users.some(user => user.email === inputSignUpEmail.value);
    if (exists) {
        errorEmailExists.classList.remove("d-none");
    } else {
        errorEmailExists.classList.add("d-none")
    }
}


/** 
 * Validate sign-up password and confirmation; show error message when they don't match.
 */
function saveNewUser(event) {
    event.preventDefault();
    visibleSignUp();
}


/** 
 * 
 */
password.addEventListener("input", checkSignUpPasswordsOnInput);
confirmPassword.addEventListener("input", checkSignUpPasswordsOnInput);

password.addEventListener("blur", checkSignUpPasswordsOnInput);
confirmPassword.addEventListener("blur", checkSignUpPasswordsOnInput);


/**
 * Validate passwords on input at sign-up
 * and show relevant error messages. Enables or disables the sign-up button accordingly.
 */
function checkSignUpPasswordsOnInput(event) {
    if (event) event.preventDefault();
    // const email = inputSignUpEmail.value.trim();
    // const userName = inputSignUpName.value.trim();
    const pass = password.value.trim();
    const confirm = confirmPassword.value.trim();
    
    if (pass.length < 5) {
        errorTextPasswordLength.classList.remove("d-none");
        disableSignUpButton();
    } else {
        errorTextPasswordLength.classList.add("d-none");
    }
    if (pass !== confirm && confirm.length > 0) {
        errorTextPasswordMatch.classList.remove("d-none");
        disableSignUpButton();
    } else {
        errorTextPasswordMatch.classList.add("d-none");
    }
}