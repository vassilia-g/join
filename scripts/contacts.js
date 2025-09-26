
let contacts = [];

const BASE_URL = "https://join-f759f-default-rtdb.europe-west1.firebasedatabase.app/contacts";
async function loadContacts() {
    try {
        const response = await fetch(BASE_URL + ".json");
        contacts = await response.json();
        contacts = Object.entries(contacts || {}).map(([id, contact]) => ({
            id,
            ...contact
        }));


        renderContactList();
    } catch (error) {
        console.error("Fehler beim Laden:", error);
    }
}


function renderContactList() {
    const list = document.getElementById("contact-list");
    list.innerHTML = "";

    const sortedContacts = getSortedContacts();

    let currentLetter = "";
    sortedContacts.forEach((contact, index) => {
        const firstLetter = contact.name.charAt(0).toUpperCase();

        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            list.appendChild(createLetterHeader(currentLetter));
        }

        const contactDiv = createContactItem(contact, index, sortedContacts);
        list.appendChild(contactDiv);
    });
}

function getSortedContacts() {
    return [...contacts].sort((a, b) => a.name.localeCompare(b.name));
}

function createLetterHeader(letter) {
    const letterDiv = document.createElement("div");
    letterDiv.className = "contact-letter";
    letterDiv.textContent = letter;
    return letterDiv;
}

function createContactItem(contact, index, sortedContacts) {
    const div = document.createElement("div");
    div.className = "contact-item";
    div.innerHTML = contactList(contact);

    div.onclick = () => {
        setActiveContact(div, sortedContacts[index]);
    };

    return div;
}

function setActiveContact(element, contact) {
    const isActive = element.classList.contains("active");
    const panel = document.getElementById("contact-details");

    document.querySelectorAll(".contact-item").forEach(item => {
        item.classList.remove("active");
    });

    if (!isActive) {
        element.classList.add("active");
        showContactContent(contact);
        panel.classList.add("is-open");
    } else {
        hideContactContent();
    }
}

function hideContactContent() {
    const panel = document.getElementById("contact-details");
    if (!panel) return;

    panel.classList.remove("is-open");
    setTimeout(() => {
        panel.innerHTML = "";
    }, 100);
}

function getInitials(name) {
    const parts = name.trim().split(" ");
    let initials = parts[0][0].toUpperCase();
    if (parts.length > 1) {
        initials += parts[parts.length - 1][0].toUpperCase();
    }
    return initials;
}

function getRandomColor() {
    const colors = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#6A5ACD", "#FF8C00", "#20B2AA"];
    return colors[Math.floor(Math.random() * colors.length)];
}


renderContactList();



function addContactOverlay() {
    const overlay = document.getElementById("overlay-contact");
    const popup = overlay.querySelector(".popup-contact");

    if (overlay.classList.contains("d_none")) {
        overlay.classList.remove("d_none");
        setTimeout(() => {
            overlay.classList.add("active");
            popup.classList.add("active");
        }, 10);
    } else {
        overlay.classList.remove("active");
        popup.classList.remove("active");

        popup.addEventListener("transitionend", function handler() {
            overlay.classList.add("d_none");
            popup.removeEventListener("transitionend", handler);
        });
    }
}

function editContactOverlay() {
    const overlay = document.getElementById("contact-edit-overlay");
    const popup = overlay.querySelector(".popup-contact");

    if (overlay.classList.contains("d_none")) {
        overlay.classList.remove("d_none");
        setTimeout(() => {
            overlay.classList.add("active");
            popup.classList.add("active");
        }, 10);
    } else {
        overlay.classList.remove("active");
        popup.classList.remove("active");

        popup.addEventListener("transitionend", function handler() {
            overlay.classList.add("d_none");
            popup.removeEventListener("transitionend", handler);
        });
    }
}

function fillEditContactForm(contact) {
    document.getElementById("edit-name").value = contact.name;
    document.getElementById("edit-email").value = contact.email;
    document.getElementById("edit-phone").value = contact.phone;

    document.getElementById("edit-contact-form").dataset.id = contact.id;

}

function onEditContact(index) {
    const contact = contacts[index];
    fillEditContactForm(contact);
    editContactOverlay();
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

async function saveContact(event) {
    event.preventDefault();

    const form = document.getElementById("edit-contact-form");

    if (form.checkValidity()) {
        const id = form.dataset.id;
        const name = document.getElementById("edit-name").value.trim();
        const email = document.getElementById("edit-email").value.trim();
        const phone = document.getElementById("edit-phone").value.trim();

        const updatedContact = { name, email, phone };

        try {
            await fetch(`${BASE_URL}/${id}.json`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedContact)
                }
            );

            await loadContacts();
            await renderContactList();
            editContactOverlay();

        } catch (error) {
            console.error("Fehler beim Aktualisieren:", error);
        }
    } else {
        form.reportValidity();
    }
}

async function addContact(event) {
    event.preventDefault();

    const form = document.getElementById("add-contact-form");

    if (form.checkValidity()) {

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        const contact = { name, email, phone };

        try {
            const res = await fetch(BASE_URL + ".json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contact)
            });

            const data = await res.json();
            await loadContacts();
            form.reset();
            addContactOverlay();

        } catch (error) {
            console.error("Error adding contact:", error);
        }

    } else {
        form.reportValidity();
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