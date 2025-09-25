class User {
    constructor(id, username, password, email, status = "active") {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.status = status;
    }
}

// async function createAccount() {
//     if (password !== confirmPassword) {
//         alert("Passwords do not match!");
//         return;
//     }

//     if(username, email, password, confirmPassword = true) {
//         let newUser = new User(Date.now(), username, email, password);
//         await postData("users", newUser);
//         postData();
//     };
// }

// app-integration.js  (NACH seinem Script laden)
const BASE_URL = "https://join-eeec9-default-rtdb.europe-west1.firebasedatabase.app/";

async function getData(path = "") {
    const response = await fetch(`${BASE_URL}${path}.json`);
    return await response.json();
}

async function postData(path = "", data = {}) {
    const response = await fetch(`${BASE_URL}${path}.json`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return await response.json();
}

async function hydrateUsersGlobal() {
    const all = await getData("users");
    const array = [];
    for (const id in all) array.push({ email: all[id].email, password: all[id].password });
    window.users = array; // überschreibt seine Demo-Liste, ohne seinen Code zu ändern
}

function getSignUpValues() {
    return {
        username: document.getElementById("input-sign-up-name")?.value.trim(),
        email: document.getElementById("input-sign-up-email")?.value.trim(),
        pw: document.getElementById("input-sign-up-password")?.value,
        pw2: document.getElementById("input-sign-up-confirm-password")?.value,
    };
}

async function saveSignupIfValid(e) {
    // läuft IM Capture vor seinen Handlern
    const v = getSignUpValues();
    if (!v.username || !v.email || !v.pw || v.pw !== v.pw2) return;
    await postData("users", { id: Date.now(), username: v.username, email: v.email, password: v.pw, status: "active" });
    (window.users ||= []).push({ email: v.email, password: v.pw }); // sein Login füttern
}

function attachIntegration() {
    document.addEventListener("submit", async (event) => {
        const form = event.target;
        if (form?.id === "form-sign-up") await saveSignupIfValid(event);
    }, { capture: true }); // ohne seinen Code zu ändern
}

document.addEventListener("DOMContentLoaded", async () => {
    await hydrateUsersGlobal();
    attachIntegration();
});