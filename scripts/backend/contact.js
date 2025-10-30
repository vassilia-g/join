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
 * Load all contacts from backend, normalize data and render list.
 */
async function loadContacts() {
    try {
        const res = await fetch(BASE_URL + "contacts.json");
        contacts = Object.entries(await res.json() || {}).map(([id, c]) => ({
            id,
            name: c.name?.trim() || "Unbekannt",
            email: c.email || "",
            phone: c.phone || "",
            color: c.color || getRandomColor()
        }));

        renderContactList();
        if (!activeContactId) return;
        const active = contacts.find(c => c.id === activeContactId);
        if (active) {
            showContactContent(active);
            document.querySelector(`.contact-item[data-id="${activeContactId}"]`)
                ?.classList.add("active");
        }
    } catch (err) {
        console.error("Fehler beim Laden:", err);
    }
}


/** 
 * Read add-contact form, validate and create a new contact then update UI.
 */
async function addContact(event) {
    event.preventDefault();

    const form = document.getElementById("add-contact-form");
    if (!form.checkValidity()) return form.reportValidity();

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
        await fetch(`${BASE_URL}/contacts/${id}.json`, {
            method: "DELETE"
        });

        await loadContacts();
        document.getElementById("contact-details").innerHTML = "";

        const sidebar = document.querySelector(".contact-sidebar");
        const main = document.querySelector(".contact-main");

        if (window.innerWidth <= 720) {
            sidebar.classList.remove("hide");
            main.classList.remove("is-open");
        }

        showToast("Contact deleted");
    } catch (err) {
        console.error("Fehler beim Löschen:", err);
        showToast("Error deleting contact");
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
    event.preventDefault();
    const form = event.target;
    const id = form.dataset.id;
    const updatedContact = {
        name: form['edit-name'].value.trim(),
        email: form['edit-email'].value.trim(),
        phone: form['edit-phone'].value.trim(),
        color: getRandomColor()
    };

    if (id === currentUserId) {
        await User.updateOwnUser(updatedContact);
        showOwnContact();
        editContactOverlay();
        showToast("Own contact updated");
        return;
    }

    // Für normale Kontakte:
    await updateContactInDatabase(id, updatedContact);
    await loadContacts();
    renderContactList();
    editContactOverlay();
    showToast("Contact updated");
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