class User {
    constructor(id, username, password, email, status = "active") {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.status = status;
    }
}

// load_all_user
async function loadUsers() {
    let response = await getData("users");
    console.log(response);
}

// load_user_by_id
async function loadUserById(id) {
    let response = await getData("users/" + id);
    console.log(response);
}

// Collection
// async function hydrateUsersGlobal() {
//     const allUsers = await getData("users");

//     const array = [];
//     for (const id in (allUsers || {})) {
//         const u = allUsers[id];
//         if (u?.email && u?.password) array.push({ email: u.email, password: u.password });
//     }
//     window.users = array;
// }



// Internal Counter
async function getNextUserId() {
    const allUsers = await getData("users") || {};
    const userIds = Object.values(allUsers).map(user => user.id || 0);
    return Math.max(0, ...userIds) + 1;
}

// Object
async function saveSignupIfValid(event) {
    const values = getSignUpValues();
    const newID = await getNextUserId();

    if (!values.username || !values.email || !values.pw || values.pw !== values.pw2) return;

    // if (Array.isArray(window.users) && window.users.some(u => u.email === values.email)) return;

    await postData("users", {
        id: newID,
        createdAt: Date.now(),
        username: values.username,
        email: values.email,
        password: values.pw,
        status: "active",
    });

    // (window.users ||= []).push({ email: values.email, password: values.pw }); // sein Login sofort füttern
}

// Listener
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

// Listener
document.addEventListener("DOMContentLoaded", async () => {
    // await hydrateUsersGlobal();
    attachIntegration();
});