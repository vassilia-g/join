// User Sign-Up

function getSignUpValues(form) {
    return {
        username: form.querySelector('#input-sign-up-name')?.value.trim(),
        email: form.querySelector('#input-sign-up-email')?.value.trim(),
        pw: form.querySelector('#input-sign-up-password')?.value,
        pw2: form.querySelector('#input-sign-up-confirm-password')?.value,
    };
}

async function validateSignUpValues(values) {
    if (!values.username || !values.email || !values.pw || values.pw !== values.pw2) return false;
    const errorEmailExists = document.getElementById('error-email-exists');
    const existingUser = await User.loadUserByEmail(values.email);
    if (existingUser) {
        console.log('Email already registered:', values.email);
        errorEmailExists.classList.remove('d-none');
        return false;
    }

    return true;
}

// Use this function to sign up a new user
async function signUpUser(form) {
    console.log('signUpUser() wurde aufgerufen');
    const values = getSignUpValues(form);
    const errorEmailExists = document.getElementById('error-email-exists');
    if (!await validateSignUpValues(values)) return;

    const user = new User(
        null,                    // id
        values.username,         // username
        values.pw,               // password
        values.email,            // email
        'active',                // status
        Date.now()               // createdAt
    );

    await user.save();
    console.log('User saved:', user);
    errorEmailExists.classList.add('d-none');
    visibleSignUp();
    return true;
}

// Use this function to get all users (for admin or testing purposes)
async function getAllUsers() {
    return await UserCollection.loadAll();
}

// TEMPORARY: handle form submit globally
document.addEventListener("submit", async (event) => {
    const form = event.target;
    if (form?.id === "form-sign-up") {
        const ok = await signUpUser(form);
        if (!ok) {
            console.log('Sign up validation failed');
        }
    }
});