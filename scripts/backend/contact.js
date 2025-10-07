class Contact {
    constructor(id, user_owner_id, friend_user_id) {
        this.id = id;
        this.user_owner_id = user_owner_id;
        this.friend_user_id = friend_user_id;
    }
}

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

async function deleteContactById(id) {
    if (!confirm("Willst du diesen Kontakt wirklich löschen?")) return;

    try {
        await fetch(`${BASE_URL}/contacts/${id}.json`, {
            method: "DELETE"
        });

        await loadContacts();
        document.getElementById("contact-details").innerHTML = "";
    } catch (err) {
        console.error("Fehler beim Löschen:", err);
    }
}

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