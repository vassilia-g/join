
let contacts = [
    { name: "Anna Müller", email: "anna@example.com", phone: "+49123456789" },
    { name: "Max Schmidt", email: "max@example.com", phone: "+49123456788" },
    { name: "Beate Fischer", email: "beate@example.com", phone: "+49123456787" }
];

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
    document.querySelectorAll(".contact-item").forEach(item => {
        item.classList.remove("active");
    });
    element.classList.add("active");
    showContactContent(contact);
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


function saveContact(event) {

    event.preventDefault();

    const form = document.getElementById("edit-contact-form");

    if (form.checkValidity()) {

        const name = document.getElementById("edit-name").value.trim();
        const email = document.getElementById("edit-email").value.trim();
        const phone = document.getElementById("edit-phone").value.trim();


    } else {
        form.reportValidity();
    }
}

function addContact(event) {

    event.preventDefault();

    const form = document.getElementById("add-contact-form");

    if (form.checkValidity()) {

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        const contact = { name, email, phone };
        contacts.push(contact);
        renderContactList();
        form.reset();
        addContactOverlay();
    } else {
        form.reportValidity();
    }
}
