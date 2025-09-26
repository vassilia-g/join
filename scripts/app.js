// Read HTML function signUpUser() return true / false
function getSignUpValues() {
    return {
        username: document.getElementById("input-sign-up-name")?.value.trim(),
        email: document.getElementById("input-sign-up-email")?.value.trim(),
        pw: document.getElementById("input-sign-up-password")?.value,
        pw2: document.getElementById("input-sign-up-confirm-password")?.value,
    };
}