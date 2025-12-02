/** 
 * Open the add-contact overlay and initialize animation.
 */
function addContactOverlay() {
    const overlay = document.getElementById("overlay-contact");
    const popup = overlay.querySelector(".popup-contact");
    if (overlay.classList.contains("d_none")) {
        clearInputs();
        overlay.classList.remove("d_none");
        setTimeout(() => {
            overlay.classList.add("active");
            popup.classList.add("active");
        }, 10);
    } else {
        removeActiveFromOverlayContact(overlay, popup);
    }
    resetWarnings();
}


/** 
 * Hide all warning fields and error signals.
 */
function resetWarnings() {
    const warnings = document.querySelectorAll(".input-add-contact");
    warnings.forEach(warning => {
        warning.classList.remove('invalid');
    });
    const errors = document.querySelectorAll(".error-message");
    errors.forEach(error => {
        error.innerHTML = "";
    });
}


/** 
 * Close the add-contact overlay with transition handling.
 */
function removeActiveFromOverlayContact(overlay, popup) {

    overlay.classList.remove("active");
    popup.classList.remove("active");
    popup.addEventListener("transitionend", function handler() {
        overlay.classList.add("d_none");
        popup.removeEventListener("transitionend", handler);
    });
}


/** 
 * Clear input fields in the add-contact form.
 */
function clearInputs() {
    const contactInputs = document.querySelectorAll(".input-add-contact");
    for (let i = 0; i < contactInputs.length; i++) {
        contactInputs[i].value = "";
    }
}


/** 
 * Toggle edit-contact overlay and insert edit form for a user.
 */
function editContactOverlay(user) {
    const overlay = document.getElementById("contact-edit-overlay");
    const popup = overlay.querySelector(".popup-contact");

    if (overlay.classList.contains("d_none")) {
        overlay.classList.remove("d_none");
        setTimeout(() => {
            overlay.classList.add("active");
            popup.classList.add("active");
        }, 10);
        const inputBtn = document.getElementById('input-button');
        inputBtn.innerHTML = showInputButtons(user);
    } else {
        overlay.classList.remove("active");
        popup.classList.remove("active");

        popup.addEventListener("transitionend", function handler() {
            overlay.classList.add("d_none");
            popup.removeEventListener("transitionend", handler);
        });
    }
    resetWarnings()
}


/** 
 * Fill the edit contact form fields and avatar preview.
 */
function fillEditContactForm(contact) {
    document.getElementById("edit-name").value = contact.name || contact.username;
    document.getElementById("edit-email").value = contact.email;
    document.getElementById("edit-phone").value = contact.phone || '';
    document.getElementById("edit-contact-form").dataset.id = contact.id;

    const avatarDiv = document.getElementById("edit-contact-avatar");
    const initials = getInitials(contact.name || contact.username);
    avatarDiv.innerHTML = `
        <div class="edit-avatar" style="background-color: ${contact.color};">
            ${initials}
        </div>
    `;

}


/** 
 * Open edit overlay for a contact id (or current user).
 */
function onEditContact(contactId) {
    let contact = contacts.find(c => c.id === contactId);
    if (!contact && contactId === currentUserId) {
        getUser().then(user => {
            fillEditContactForm(user);
            editContactOverlay(contactId);
        });
        return;
    }
    if (!contact) return;
    fillEditContactForm(contact);
    editContactOverlay(contactId);
}


/** 
 * Extract contact data from an add-contact or edit-contact form.
 */
function getContactFromForm(form) {
    return {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim()
    };
}


/** 
 * After creating a contact, refresh list, reset form and select the new contact.
 */
function updateUIAfterAdd(form, newId, contact) {
    loadContacts().then(() => {
        form.reset();
        addContactOverlay();
        showToast("Contact successfully created");

        const newElement = document.querySelector(`[data-id="${newId}"]`);
        if (newElement) {
            setActiveContact(newElement, { id: newId, ...contact });
        }
    });
}


/** 
 * Show a short toast message to the user.
 */
function showToast(message) {
    const container = document.getElementById("toast-container");

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 500);
    }, 2000);
}


/** 
 * Toggle a mobile context menu for a contact item and close on outside click.
 */
function toggleMobileMenu(btn) {
    const menu = btn.nextElementSibling;

    const isOpen = menu.classList.contains("show");
    document.querySelectorAll(".menu-options.show").forEach(el => el.classList.remove("show"));

    if (!isOpen) {
        menu.classList.add("show");

        /**
         * Close the context menu when clicking outside the button or menu element.
         * @param {MouseEvent} event - Click event used to determine if the menu should close.
         */
        function closeOnOutsideClick(event) {
            if (!menu.contains(event.target) && event.target !== btn) {
                menu.classList.remove("show");
                document.removeEventListener("click", closeOnOutsideClick);
            }
        }

        document.addEventListener("click", closeOnOutsideClick);
    }
}
