const BASE_URL = "https://join-eeec9-default-rtdb.europe-west1.firebasedatabase.app/";

// GET (Read)
async function getData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}

// POST (Create)
async function postData(path = "", data = {}) {
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
async function putData(path = "", data = {}) {
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
async function deleteData(path = "") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    });

    let responseToJson = null;
    try {
        responseToJson = await response.json();
    } catch (e) {
        responseToJson = null;
    }
    return responseToJson;
}