/** 
 * Contacts storage and currently selected contact id.
 */
let contacts = [];
let activeContactId = null;


/** 
 * Initialize contacts module: load contacts and show current user's contact.
 */
function initContacts() {
    loadContacts();
    showOwnContact();
}


/** 
 * Render current logged-in user's contact in the UI.
 */
async function showOwnContact() {
    const ownContactContainer = document.getElementById('own-contact');
    const user = await getUser();
    if (!user.color) {
        user.color = getRandomColor();
    }
    ownContactContainer.innerHTML = showOwnContactDetails(user);
    const contactItem = document.getElementById('contact-item');
    ownContactContainer.onclick = function () {
        setActiveContact(contactItem, user);
        document.querySelector('.edit-delete-button').onclick = function () {
            fillEditContactForm(user);
            editContactOverlay(user.id);
        };
    };
}


/** 
 * Inject sidebar and header markup and username initials into UI.
 */
function showSidebarAndHeader() {
    let sidebar = document.getElementById('sidebar');
    let header = document.getElementById('header');
    let userInitials = localStorage.getItem('userInitials') || 'GU';
    sidebar.innerHTML = showSidebar();
    header.innerHTML = showHeader(userInitials);
}


/** 
 * Render contact list grouped by initial letter.
 */
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


/** 
 * Render contact list grouped by initial letter.
 */
function getSortedContacts() {
    return [...contacts].sort((a, b) => {
        const nameA = (a.name || "").toLowerCase();
        const nameB = (b.name || "").toLowerCase();
        return nameA.localeCompare(nameB);
    });
}


/** 
 * Create a DOM header element for a given alphabet letter.
 */
function createLetterHeader(letter) {
    const letterDiv = document.createElement("div");
    letterDiv.className = "contact-letter";
    letterDiv.textContent = letter;
    return letterDiv;
}


/** 
 * Build a contact item DOM node and attach click handler.
 */
function createContactItem(contact, index, sortedContacts) {
    const div = document.createElement("div");
    div.className = "contact-item";
    div.setAttribute("data-id", contact.id);
    div.innerHTML = contactList(contact);

    div.onclick = () => {
        setActiveContact(div, sortedContacts[index]);
    };

    return div;
}


/** 
 * Toggle active state for a contact and show/hide details panel.
 */
function setActiveContact(element, contact) {
    const isActive = element.classList.contains("active");
    const panel = document.getElementById("contact-details");
    const sidebar = document.querySelector(".contact-sidebar");
    const main = document.querySelector(".contact-main");

    document.querySelectorAll(".contact-item").forEach(item => {
        item.classList.remove("active");
    });

    if (!isActive) {
        element.classList.add("active");
        showContactContent(contact);
        panel.classList.add("is-open");
        main.classList.add("is-open");

        if (window.innerWidth <= 1000) {
            sidebar.classList.add("hide");
            main.style.display = "block";
            panel.style.display = "block";
        }

        activeContactId = contact.id;
    } else {
        hideContactContent();
        activeContactId = null;
    }
}


/** 
 * Handle resize events to adapt sidebar/main layout responsively.
 */
function handleResize() {
    const sidebar = document.querySelector(".contact-sidebar");
    const main = document.querySelector(".contact-main");
    const panel = document.getElementById("contact-details");
    // if required elements are missing, bail out safely
    if (!sidebar || !main || !panel) return;

    if (window.innerWidth <= 1000) {
        if (activeContactId) {
            // Show details view on mobile when contact is active
            sidebar.classList.add("hide");
            main.style.display = "block";
            panel.style.display = "block";
        } else {
            // Hide main content when no contact is active
            sidebar.classList.remove("hide");
            main.style.display = "none";
            panel.style.display = "none";
        }
    } else if (window.innerWidth > 1000) {
        // Desktop view - show both sidebar and main
        sidebar.classList.remove("hide");
        main.style.display = "block";
        panel.style.display = "block";
    }
}


// attach resize handler after DOM is ready to avoid null elements
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.addEventListener('resize', handleResize);
        // run once to initialize correct layout
        handleResize();
    });
} else {
    window.addEventListener('resize', handleResize);
    handleResize();
}


/** 
 * Hide the contact details panel and reset active selection.
 */
function hideContactContent() {
    const panel = document.getElementById("contact-details");
    const sidebar = document.querySelector(".contact-sidebar");
    const main = document.querySelector(".contact-main");
    if (!panel) return;

    panel.classList.remove("is-open");
    main.classList.remove("is-open");

    if (window.innerWidth <= 1000) {
        sidebar.classList.remove("hide");
        main.style.display = "none";
        sidebar.style.width = "100%";
        sidebar.style.display = "block";
    }

    document.querySelectorAll(".contact-item").forEach(item => {
        item.classList.remove("active");
    });

    activeContactId = null;

    setTimeout(() => {
        panel.innerHTML = "";
    }, 100);
}


/** 
 * Compute initials from a full name for avatar display.
 */
function getInitials(name) {
    if (!name || typeof name !== "string" || !name.trim()) {
        return "?";
    }

    const parts = name.trim().split(" ").filter(Boolean);
    let initials = parts[0][0].toUpperCase();

    if (parts.length > 1) {
        initials += parts[parts.length - 1][0].toUpperCase();
    }

    return initials;
}


/** 
 * Return a random color string from the palette.
 */
function getRandomColor() {
    const colors = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B",];
    return colors[Math.floor(Math.random() * colors.length)];
}


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
        <div style="background-color: ${contact.color}; width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 47px; font-weight: 500;">
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

        function closeOnOutsideClick(event) {
            if (!menu.contains(event.target) && event.target !== btn) {
                menu.classList.remove("show");
                document.removeEventListener("click", closeOnOutsideClick);
            }
        }

        document.addEventListener("click", closeOnOutsideClick);
    }
}