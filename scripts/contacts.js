
let contacts = [
    { name: "Anna Müller", email: "anna@example.com", phone: "+49123456789" },
    { name: "Max Schmidt", email: "max@example.com", phone: "+49123456788" },
    { name: "Beate Fischer", email: "beate@example.com", phone: "+49123456787" }
];

function renderContactList() {
    const list = document.getElementById("contact-list");
    list.innerHTML = "";

    contacts.sort((a, b) => a.name.localeCompare(b.name));

    contacts.forEach((contact, index) => {
        const div = document.createElement("div");
        div.className = "contact-item";
        div.innerHTML = contactList(contact);

        div.onclick = () => {
            document.querySelectorAll(".contact-item").forEach(item => {
                item.classList.remove("active");
            });

            div.classList.add("active");
            showContactDetails(index);
        };

        list.appendChild(div);
    });
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

function showContactDetails(index) {
    const details = document.getElementById("contact-details");
    const contact = contacts[index];
    details.innerHTML = showContactContent(contact);
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

        console.log("Contact saved:", { name, email, phone });
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

        console.log("Contact saved:", { name, email, phone });
    } else {
        form.reportValidity();
    }
}
