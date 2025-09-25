class User {
    constructor(id, username, password, email, status = "active") {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.status = status;
    }
}
// app-integration.js  (NACH seinem Script laden)
const BASE_URL = "https://join-eeec9-default-rtdb.europe-west1.firebasedatabase.app/";

async function getData(path = "") {
    const response = await fetch(`${BASE_URL}${path}.json`);
    return await response.json();
}

async function postData(path = "", data = {}) {
    const response = await fetch(`${BASE_URL}${path}.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
    return await response.json();
}

async function hydrateUsersGlobal() {
    const allUsers = await getData("users");
    const array = [];
    for (const id in (allUsers || {})) {
        const u = allUsers[id];
        if (u?.email && u?.password) array.push({ email: u.email, password: u.password });
    }
    window.users = array;
}

function getSignUpValues() {
    return {
        username: document.getElementById("input-sign-up-name")?.value.trim(),
        email: document.getElementById("input-sign-up-email")?.value.trim(),
        pw: document.getElementById("input-sign-up-password")?.value,
        pw2: document.getElementById("input-sign-up-confirm-password")?.value,
    };
}

async function getNextUserId() {
    const allUsers = await getData("users") || {};
    const userIds = Object.values(allUsers).map(user => user.id || 0);
    return Math.max(0, ...userIds) + 1;
}

async function saveSignupIfValid(event) {
    const values = getSignUpValues();
    const newID = await getNextUserId();

    if (!values.username || !values.email || !values.pw || values.pw !== values.pw2) return;

    if (Array.isArray(window.users) && window.users.some(u => u.email === values.email)) return;

    await postData("users", {
        id: newID,
        createdAt: Date.now(),
        username: values.username,
        email: values.email,
        password: values.pw,
        status: "active",
    });

    (window.users ||= []).push({ email: values.email, password: values.pw }); // sein Login sofort füttern
}

function attachIntegration() {
    document.addEventListener(
        "submit",
        async (event) => {
            const form = event.target;
            if (form?.id === "form-sign-up") await saveSignupIfValid(event);
        },
        { capture: true }
    );
}

document.addEventListener("DOMContentLoaded", async () => {
    await hydrateUsersGlobal();
    attachIntegration();
});