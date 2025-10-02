class Contact {
    constructor(id, user_owner_id, friend_user_id) {
        this.id = id;
        this.user_owner_id = user_owner_id;
        this.friend_user_id = friend_user_id;
    }
}

async function loadContacts() {
    try {
        const res = await fetch(BASE_URL + ".json");
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
        await fetch(`${BASE_URL}/${id}.json`, {
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

    const res = await fetch(BASE_URL + ".json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
    });

    return res.json();
}

async function deleteContact(id) {
    const form = document.getElementById("edit-contact-form");
    const contactID = form.dataset.id;
    try {
        await fetch(`${BASE_URL}/${contactID}.json`, {
            method: "DELETE"
        });
        await loadContacts();
        document.getElementById("contact-details").innerHTML = "";
        editContactOverlay();
    } catch (err) {
        console.error("Fehler beim Löschen:", err);
    }
}

async function saveEditedContact(event) {
    event.preventDefault();
    const form = document.getElementById("edit-contact-form");
    if (!form.checkValidity()) return form.reportValidity();

    const id = form.dataset.id;
    const original = contacts.find(c => c.id === id);
    const updatedContact = {
        name: document.getElementById("edit-name").value.trim(),
        email: document.getElementById("edit-email").value.trim(),
        phone: document.getElementById("edit-phone").value.trim(),
        color: original?.color || getRandomColor()
    };

    await fetch(`${BASE_URL}/${id}.json`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact)
    });

    await loadContacts();
    editContactOverlay();
}