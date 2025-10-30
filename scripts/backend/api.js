const BASE_URL = "https://join-eeec9-default-rtdb.europe-west1.firebasedatabase.app/";

/** 
 * Internal helper to perform fetch and handle JSON + errors 
 */
async function safeFetch(path = "", options = {}) {
    const url = BASE_URL + path + ".json";
    const response = await fetch(url, options);
    if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(`Request failed (${response.status}): ${text}`);
    }
    try {
        return await response.json();
    } catch (e) {
        return null;
    }
}


/** 
 * GET (Read) 
 */
async function getData(path = "") {
    return await safeFetch(path, { method: 'GET' });
}


/** 
 * POST (Create) 
 */
async function postData(path = "", data = {}) {
    return await safeFetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}


/** 
 * PUT (Replace) 
 */
async function putData(path = "", data = {}) {
    return await safeFetch(path, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}


/** 
 * PATCH (Partial update) 
 */
async function patchData(path = "", data = {}) {
    return await safeFetch(path, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}


/** 
 * DELETE (Delete) 
 */
async function deleteData(path = "") {
    return await safeFetch(path, { method: 'DELETE' });
}