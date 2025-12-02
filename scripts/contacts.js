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
 * Automatic validation for only specific letters for names.
 */

function validateName() {
    const input = document.getElementById("name");
    const errorDiv = document.getElementById("nameError");
    const allowedRegex = /^[a-zA-ZäöüÄÖÜßàâéèêëîïôùûçÅåØøÆæÑñ\-`' ]+$/;
    const value = input.value.trim();

    if (value === "") {
        errorDiv.textContent = "Name is required.";
        input.classList.add("invalid");
        return false;
    } else if (!allowedRegex.test(value)) {
        errorDiv.textContent = "Only letters from a–z are allowed.";
        input.classList.add("invalid");
        return false;
    } else {
        errorDiv.textContent = "";
        input.classList.remove("invalid");
        return true;
    }
}

/**
 * Validate the name field inside the edit-contact form.
 * Ensures the input is non-empty and only contains allowed alphabetic characters.
 * @returns {boolean} true when the input is valid, otherwise false.
 */
function validateEditName() {
    const input = document.getElementById("edit-name");
    const errorDiv = document.getElementById("edit-nameError");
    const allowedRegex = /^[a-zA-ZäöüÄÖÜßàâéèêëîïôùûçÅåØøÆæÑñ\-`' ]+$/;
    const value = input.value.trim();

    if (value === "") {
        errorDiv.textContent = "Name is required.";
        input.classList.add("invalid");
        return false;
    } else if (!allowedRegex.test(value)) {
        errorDiv.textContent = "Only letters from a–z are allowed.";
        input.classList.add("invalid");
        return false;
    } else {
        errorDiv.textContent = "";
        input.classList.remove("invalid");
        return true;
    }
}


/** 
 * Automatic validation for correct email addresses.
 */
function validateEmail() {
    const input = document.getElementById("email");
    const errorDiv = document.getElementById("emailError");
    const value = input.value.trim();
    const emailRegex = /^[a-zA-Z0-9äöüÄÖÜ]+([._%+-]?[a-zA-Z0-9äöüÄÖÜ]+)*@[a-zA-Z0-9äöüÄÖÜ]+([.-]?[a-zA-Z0-9äöüÄÖÜ]+)*\.[a-zA-ZäöüÄÖÜ]{2,}$/;

    if (value === "") {
        errorDiv.textContent = "Email is required.";
        input.classList.add("invalid");
        return false;
    } else if (!emailRegex.test(value)) {
        errorDiv.textContent = "Please enter a valid email address.";
        input.classList.add("invalid");
        return false;
    } else {
        errorDiv.textContent = "";
        input.classList.remove("invalid");
        return true;
    }
}

/**
 * Validate the email field inside the edit-contact form using the same pattern as creation.
 * @returns {boolean} true when the input is a valid email, otherwise false.
 */
function validateEditEmail() {
    const input = document.getElementById("edit-email");
    const errorDiv = document.getElementById("edit-emailError");
    const value = input.value.trim();
    const emailRegex = /^[a-zA-Z0-9äöüÄÖÜ]+([._%+-]?[a-zA-Z0-9äöüÄÖÜ]+)*@[a-zA-Z0-9äöüÄÖÜ]+([.-]?[a-zA-Z0-9äöüÄÖÜ]+)*\.[a-zA-ZäöüÄÖÜ]{2,}$/;


    if (value === "") {
        errorDiv.textContent = "Email is required.";
        input.classList.add("invalid");
        return false;
    } else if (!emailRegex.test(value)) {
        errorDiv.textContent = "Please enter a valid email address.";
        input.classList.add("invalid");
        return false;
    } else {
        errorDiv.textContent = "";
        input.classList.remove("invalid");
        return true;
    }
}


/** 
 * Automatic validation for correct phone numbers.
 */
function validatePhone() {
    const input = document.getElementById("phone");
    const errorDiv = document.getElementById("phoneError");
    const value = input.value.trim();
    const allowedRegex = /^[0-9]+$/;

    if (value === "") {
        errorDiv.textContent = "Phone number is required.";
        input.classList.add("invalid");
        return false;
    } else if (!allowedRegex.test(value)) {
        errorDiv.textContent = "Only numbers are allowed.";
        input.classList.add("invalid");
        return false;
    } else {
        errorDiv.textContent = "";
        input.classList.remove("invalid");
        return true;
    }
}

/**
 * Validate the phone field inside the edit-contact form to allow only digits.
 * @returns {boolean} true when the phone number is valid, otherwise false.
 */
function validateEditPhone() {
    const input = document.getElementById("edit-phone");
    const errorDiv = document.getElementById("edit-phoneError");
    const value = input.value.trim();
    const allowedRegex = /^[0-9]+$/;

    if (value === "") {
        errorDiv.textContent = "Phone number is required.";
        input.classList.add("invalid");
        return false;
    } else if (!allowedRegex.test(value)) {
        errorDiv.textContent = "Only numbers are allowed.";
        input.classList.add("invalid");
        return false;
    } else {
        errorDiv.textContent = "";
        input.classList.remove("invalid");
        return true;
    }
}


/** 
 * Render current logged-in user's contact in the UI.
 */
async function showOwnContact() {
    const ownContactContainer = document.getElementById('own-contact');
    const user = await getUser();
    if (!user) return;

    const isGuest = localStorage.getItem('currentUserId') === 'guest';
    if (!isGuest && !user.color) {
        user.color = 'black';
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
 * Reset the UI state related to the active contact.
 */
function resetActiveContactUI() {
    const panel = document.getElementById("contact-details");
    const sidebar = document.querySelector(".contact-sidebar");
    const main = document.querySelector(".contact-main");

    document.querySelector(".contact-item.active")?.classList.remove("active");
    if (panel) {
        panel.innerHTML = "";
        panel.classList.remove("is-open");
        panel.style.display = "";
    }
    if (main) {
        main.classList.remove("is-open");
        main.style.display = "";
    }
    if (window.innerWidth <= 1000) {
        sidebar?.classList.remove("hide");
    }
    activeContactId = null;
}


/** 
 * Toggle active state for a contact and show/hide details panel.
 */
function setActiveContact(element, contact) {
    const panel = document.getElementById("contact-details");
    const sidebar = document.querySelector(".contact-sidebar");
    const main = document.querySelector(".contact-main");
    const isSameAsActive = String(activeContactId) === String(contact.id);
    document.querySelectorAll(".contact-item").forEach(i => i.classList.remove("active"));
    if (isSameAsActive && element.classList.contains("active")) {
        resetActiveContactUI();
        return;
    }
    element.classList.add("active");
    activeContactId = contact.id;
    showContactContent(contact);
    panel.classList.add("is-open");
    main.classList.add("is-open");
    if (window.innerWidth <= 1000) {
        sidebar.classList.add("hide");
        main.style.display = panel.style.display = "block";
    }
}


/** 
 * Handle resize events to adapt sidebar/main layout responsively.
 */
function handleResize() {
    const sidebar = document.querySelector(".contact-sidebar");
    const main = document.querySelector(".contact-main");
    const panel = document.getElementById("contact-details");
    if (!sidebar || !main || !panel) return;

    const isMobile = window.innerWidth <= 1000;
    const showDetails = isMobile && activeContactId;
    const showAll = !isMobile;

    sidebar.classList.toggle("hide", showDetails);
    main.style.display = panel.style.display =
        showAll || showDetails ? "block" : "none";

    if (showAll) sidebar.classList.remove("hide");
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
    if (!panel || !main || !sidebar) return;

    [panel, main].forEach(e => e.classList.remove("is-open"));
    document.querySelectorAll(".contact-item").forEach(i => i.classList.remove("active"));

    if (window.innerWidth <= 1000) {
        sidebar.classList.remove("hide");
        main.style.display = "none";
        Object.assign(sidebar.style, { width: "100%", display: "block" });
    }

    activeContactId = null;
    setTimeout(() => (panel.innerHTML = ""), 100);
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