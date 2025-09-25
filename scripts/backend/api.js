const BASE_URL = "https://join-eeec9-default-rtdb.europe-west1.firebasedatabase.app/";

// GET (Read)
async function getData(path="") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}

// POST (Create)
async function postData(path="", data={}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });
    let responseToJson = await response.json();
    return responseToJson;
}


// PUT (Update)
async function putData(path="", data = {}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });
    let responseToJson = await response.json();
    return responseToJson;
}

// DELETE (Delete)

// load_all_user
async function loadUsers() {
    getData("users");
}

// load_user_by_id
async function loadUserById(id) {
    getData("users/" + id);
}

// load_all_contacts
async function loadContacts() {
    let response = await getData("contacts");
    console.log(response);
}

// Test with node
// loadContacts();

// postData("users/4", {"username": "popi"});

