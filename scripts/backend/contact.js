/** 
 * Simple Contact model holding relation ids.
 * @constructor
 */
class Contact {
    constructor(id, user_owner_id, friend_user_id) {
        this.id = id;
        this.user_owner_id = user_owner_id;
        this.friend_user_id = friend_user_id;
    }
}


/**
 * Resolve successful fetch responses as JSON or reject with the original response.
 * @param {Response} r - Fetch response object to inspect.
 * @returns {Promise<any>} Parsed JSON payload or a rejected promise for error cases.
 */
const json = (r) => r.ok ? r.json() : Promise.reject(r);


/**
 * Convenience helper to send PUT requests with a JSON body.
 * @param {string} url - Absolute URL to send the request to.
 * @param {Object} data - Payload to stringify and send as the request body.
 * @returns {Promise<Response>} The fetch promise for further handling.
 */
const putJSON = (url, data) =>
    fetch(url, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });


/** 
 * Load all contacts from backend, normalize data and render list.
 */
async function loadContacts() {
    try {
        const res = await fetch(BASE_URL + "contacts.json");
        contacts = Object.entries(await res.json() || {}).map(([id, c]) => ({
            id,
            name: c.name?.trim() || "Unbekannt", email: c.email || "", phone: c.phone || "", color: c.color || "black",
        }));
        renderContactList();
        if (!activeContactId) return;
        const active = contacts.find(c => c.id === activeContactId);
        if (active) {
            showContactContent(active);
            document.querySelector(`.contact-item[data-id="${activeContactId}"]`)?.classList.add("active");
        }
    } catch (err) {console.error("Fehler beim Laden:", err);}
}


/** 
 * Read add-contact form, validate and create a new contact then update UI.
 */
async function addContact(event) {
    event.preventDefault();
    const form = document.getElementById("add-contact-form");
    if (!validateForm(form)) return;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    try {
        const contact = getContactFromForm(form);
        const { name: newId } = await createContact(contact);
        contact.id = newId;
        updateUIAfterAdd(form, newId, contact);
    } catch (err) {
        console.error("Error adding contact:", err);
    }
}


/** 
 * Delete contact by id from backend and refresh contact view/UI.
 */
async function deleteContactById(id) {
    try {
        await updateTasksForDeletedContact(id);
        await deleteContactRemote(id);
        closeEditOverlayIfOpen();
        resetActiveIfDeleted(id);
        await loadContacts();
        clearDetailsAndDeactivate();
        ensureSidebarOpenOnMobile();
        showToast("Contact deleted");
    } catch (e) {
        console.error("Fehler beim Löschen:", e);
        showToast("Error deleting contact");
    }
}


/**
 * Update tasks for a deleted contact by removing the contact from all task arrays.
 */
async function updateTasksForDeletedContact(id) {
    const tasks = await json(await fetch(`${BASE_URL}/tasks.json`));
    const updates = [];

    for (const [taskId, t] of Object.entries(tasks || {})) {
        const idx = t?.contactsId?.indexOf(id);
        if (idx > -1) {
            for (const key of ["contactsId", "contactsNames", "contactsInitials", "contactsColor"]) {
                const next = (t[key] || []).filter((_, j) => j !== idx);
                updates.push(putJSON(`${BASE_URL}/tasks/${taskId}/${key}.json`, next));
            }
        }
    }
    await Promise.all(updates);
}


/**
 * DELETE contact from backend by id.
 */
const deleteContactRemote = (id) =>
    fetch(`${BASE_URL}/contacts/${id}.json`, { method: "DELETE" });


/**
 * Close edit overlay if it's open.
 */
function closeEditOverlayIfOpen() {
    const overlay = document.getElementById("contact-edit-overlay");
    if (overlay && !overlay.classList.contains("d_none")) editContactOverlay();
}


/**
 * Clear contact details and deactivate the current contact.
 */
function clearDetailsAndDeactivate() {
    document.getElementById("contact-details")?.classList.remove("is-open");
    const panel = document.getElementById("contact-details");
    if (panel) panel.innerHTML = "";
    document.querySelector(".contact-item.active")?.classList.remove("active");
}


/**
 * Ensure the sidebar is open on mobile devices.
 */
function ensureSidebarOpenOnMobile() {
    if (window.innerWidth <= 1000) {
        document.querySelector(".contact-sidebar")?.classList.remove("hide");
        document.querySelector(".contact-main")?.classList.remove("is-open");
    }
}


/**
 * Reset active contact UI if the deleted contact was active.
 */
function resetActiveIfDeleted(id) {
    if (String(activeContactId) === String(id)) {
        resetActiveContactUI();
    } else {
        clearDetailsAndDeactivate();
    }
}


/** 
 * POST a new contact to backend, ensuring it has a color.
 */
async function createContact(contact) {
    if (!contact.color) {
        contact.color = getRandomColor();
    }

    const res = await fetch(BASE_URL + "contacts.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
    });

    return res.json();
}


/** 
 * Save edited contact data (own user or normal contact) and refresh UI.
 */
async function saveEditedContact(event) {
    event.preventDefault(); const form = event.target; if (!validateForm(form)) return;
    const id = form.dataset.id, c = { name: form['edit-name'].value.trim(), email: form['edit-email'].value.trim(), phone: form['edit-phone'].value.trim() };
    if (id === currentUserId)
        return await User.updateOwnUser({ ...c, color: getRandomColor() }),
            showOwnContact(), editContactOverlay(),
            document.querySelectorAll(".menu-options.show,.menu-toggle.active").forEach(el => el.classList.remove("show", "active")),
            showToast("Own contact updated"); try {
                const r = await fetch(`${BASE_URL}contacts/${id}.json`); if (!r.ok) throw new Error(); const existing = await r.json() || {};
                await updateContactInDatabase(id, { ...existing, ...c, color: existing.color ?? getRandomColor() });
                await loadContacts(); renderContactList(); editContactOverlay();
                document.querySelectorAll(".menu-options.show,.menu-toggle.active").forEach(el => el.classList.remove("show", "active"));
                showToast("Contact updated");
            } catch (err) { console.error(err); showToast("Error updating contact"); }
}


/** 
 * PUT updated contact object to backend by id.
 */
async function updateContactInDatabase(id, updatedContact) {
    await fetch(`${BASE_URL}contacts/${id}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact)
    });
}