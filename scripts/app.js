/** 
 * User Sign-Up 
 */
/** 
 * Get sign-up field values from form (trimmed) 
 */
function getSignUpValues(form) {
    return {
        username: form.querySelector('#input-sign-up-name')?.value.trim(),
        email: form.querySelector('#input-sign-up-email')?.value.trim(),
        pw: form.querySelector('#input-sign-up-password')?.value,
        pw2: form.querySelector('#input-sign-up-confirm-password')?.value,
    };
}


/** 
 * Validate sign-up values and check if email already exists 
 */
async function validateSignUpValues(values) {
    if (!values.username || !values.email || !values.pw || values.pw !== values.pw2) return false;
    const errorEmailExists = document.getElementById('error-email-exists');
    const existingUser = await User.loadUserByEmail(values.email);
    if (existingUser) {
        errorEmailExists.classList.remove('d-none');
        return false;
    }

    return true;
}


/** 
 * Create and save a new user, update UI 
 */
async function signUpUser(form) {
    const values = getSignUpValues(form);
    const errorEmailExists = document.getElementById('error-email-exists');
    if (!await validateSignUpValues(values)) return;

    const user = new User(
        null,                    /** id */
        getRandomColor(),
        values.username,         /** username */
        values.pw,               /** password */
        values.email,            /** email */
        'active',                /** status */
        Date.now()               /** createdAt */
    );

    await user.save();
    errorEmailExists.classList.add('d-none');
    visibleSignUp();
    return true;
}


/** 
 * Return all users (async helper)
 */
async function getAllUsers() {
    return await UserCollection.loadAll();
}

/** 
 * Global submit handler: intercept sign-up form submission 
 */
document.addEventListener("submit", async (event) => {
    const form = event.target;
    if (form?.id === "form-sign-up") {
        const ok = await signUpUser(form);
        if (!ok) {
        }
    }
});


