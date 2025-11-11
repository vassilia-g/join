/** 
 * Validates the name at sign up while input.
 */
function validateNameForSignUp() {
    const input = document.getElementById("input-sign-up-name");
    const allowedRegex = /[^a-zA-ZäöüÄÖÜßàâéèêëîïôùûçÅåØøÆæÑñ\-`' ]+/g;

    input.addEventListener("input", () => {
        input.value = input.value
            .replace(/\s{2,}/g, ' ')
    })

    if (input.value.typeof == "number" || allowedRegex.test(input.value)) {
        errorTextUserName.classList.remove("d-none");
        signUpButton.disabled = true;
    } else {
        errorTextUserName.classList.add("d-none");
        signUpButton.disabled = false;
    }
    if (input.value.trim().length < 2) {
        errorTextToShortUserName.classList.remove("d-none");
        signUpButton.disabled = true;
    } else {
        errorTextToShortUserName.classList.add("d-none");
        signUpButton.disabled = false;
    }
}


/** 
 * Validates the email address at sign up.
 */
function validateEmailInputForSignUp() {
    const input = inputSignUpEmail.value.trim();
    const emailRegex = /^[a-zA-Z0-9äöüÄÖÜ]+([._%+-]?[a-zA-Z0-9äöüÄÖÜ]+)*@[a-zA-Z0-9äöüÄÖÜ]+([.-]?[a-zA-Z0-9äöüÄÖÜ]+)*\.[a-zA-ZäöüÄÖÜ]{2,}$/;

    if (!emailRegex.test(input)) {
        emailErrorSignUp.classList.remove('d-none');
        inputEmail.value = "";
        signUpButton.disabled = true;
        return false
    }
    emailErrorSignUp.classList.add('d-none');
    signUpButton.disabled = false;
    return true;
}


/** 
 * Validates the email address at sign up when blur.
 */
inputSignUpEmail.addEventListener('blur', () => {
    const input = inputSignUpEmail.value.trim();
    const emailRegex = /^[a-zA-Z0-9äöüÄÖÜ]+([._%+-]?[a-zA-Z0-9äöüÄÖÜ]+)*@[a-zA-Z0-9äöüÄÖÜ]+([.-]?[a-zA-Z0-9äöüÄÖÜ]+)*\.[a-zA-ZäöüÄÖÜ]{2,}$/;
    if (!emailRegex.test(input)) {
        emailErrorSignUp.classList.remove('d-none');
        inputEmail.value = "";
        signUpButton.disabled = true;
        return false
    }
    if (input.length === 0 || inputSignUpEmail.value === "" || inputSignUpEmail.value.length < 6) {
        emailErrorSignUp.classList.add('d-none');
        return false
    }
    if (!validateEmailInputForSignUp()) {
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
        inputEmail.value = "";
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
 * Removes the error text for reqired inputs at sign up when input starts.
 */
inputSignUpName.addEventListener('input', () => {
    errorUsernameAndMailRequired.classList.add("d-none")
});


/** 
 * Removes the error text for wrong and to short password at sign up when input starts.
 */
password.addEventListener('input', () => {
    errorText.classList.add('d-none');
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
 * Validate sign-up password and confirmation in realtime; show error message aslong they don't match.
 */
// function checkSignUpPasswordsOnInput() {
//     if (confirmPassword.value.length > 0) {
//         errorText.classList.remove("d-none");
//     }

//     if (confirmPassword.value === password.value && confirmPassword.value.length > 0) {
//         errorText.classList.add("d-none");
//     }
// }


/** 
 * Validate sign-up password and confirmation; show error message when they don't match.
 */
// function checkSignUpPasswords(event) {
//     event.preventDefault();
//     if (password.value.trim().length < 5) {
//         errorTextPasswordLength.classList.remove("d-none");
//         signUpButton.disabled = true;
//     } else {
//         errorTextPasswordLength.classList.add("d-none");
//         signUpButton.disabled = false;
//     }
//     if (password.value.trim() !== confirmPassword.value.trim()) {
//         errorText.classList.remove("d-none");
//         signUpButton.disabled = true;
//     } else {
//         errorText.classList.add("d-none");
//         signUpButton.disabled = false;
//     }
//     if (inputSignUpEmail.value.trim().length < 6 || inputSignUpName.value.trim().length < 2 && inputSignUpName.value.typeof == "number") {
//         errorUsernameAndMailRequired.classList.remove("d-none");
//         signUpButton.disabled = true;
//     } else {
//         errorUsernameAndMailRequired.classList.add("d-none");
//         signUpButton.disabled = false;
//     }
// }


/**
 * Validate all sign-up inputs (email, username, passwords)
 * and show relevant error messages. Enables or disables the sign-up button accordingly.
 */
function checkSignUpPasswordsOnInput(event) {
    if (event) event.preventDefault();

    let valid = true;

    const name = inputSignUpName.value.trim();
    const email = inputSignUpEmail.value.trim();
    const pass = password.value.trim();
    const confirm = confirmPassword.value.trim();

    // Passwortlänge prüfen
    if (pass.length < 5) {
        errorTextPasswordLength.classList.remove("d-none");
        valid = false;
    } else {
        errorTextPasswordLength.classList.add("d-none");
    }

    // Passwortvergleich prüfen
    if (pass !== confirm && confirm.length > 0) {
        errorText.classList.remove("d-none");
        valid = false;
    } else {
        errorText.classList.add("d-none");
    }

    // Benutzername & E-Mail prüfen
    if (name.length < 2 || !isNaN(name) || email.length < 6) {
        errorUsernameAndMailRequired.classList.remove("d-none");
        valid = false;
    } else {
        errorUsernameAndMailRequired.classList.add("d-none");
    }

    // Button aktivieren/deaktivieren
    signUpButton.disabled = !valid;

    return valid;
}
