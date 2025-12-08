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
 * Validation rules for contact form fields.
 */
const validationRules = {
    name: {
        regex: /^[a-zA-ZäöüÄÖÜßàâéèêëîïôùûçÅåØøÆæÑñ\-`' ]+$/,
        emptyMsg: "Name is required.",
        invalidMsg: "Only letters from a–z are allowed."
    },
    email: {
        regex: /^[a-zA-Z0-9äöüÄÖÜ]+([._%+-]?[a-zA-Z0-9äöüÄÖÜ]+)*@[a-zA-Z0-9äöüÄÖÜ]+([.-]?[a-zA-Z0-9äöüÄÖÜ]+)*\.[a-zA-ZäöüÄÖÜ]{2,}$/,
        emptyMsg: "Email is required.",
        invalidMsg: "Please enter a valid email address."
    },
    phone: {
        regex: /^[0-9]+$/,
        emptyMsg: "Phone number is required.",
        invalidMsg: "Only numbers are allowed."
    }
};


/**
 * Validate a single input field based on its data-validate attribute.
 */
function validateField(input) {
    const { validate: type, error: errorId } = input.dataset;
    const rule = validationRules[type];
    const errorDiv = document.getElementById(errorId);
    const value = input.value.trim();
    if (!rule || !errorDiv) return true;
    const msg = value === "" ? rule.emptyMsg :
        !rule.regex.test(value) ? rule.invalidMsg : "";
    errorDiv.textContent = msg;
    input.classList.toggle("invalid", !!msg);
    return !msg;
}

/** 
 * Validate all fields in a form that have data-validate attributes.
 */
function validateForm(form) {
    const inputs = form.querySelectorAll("[data-validate]");
    let isValid = true;
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    return isValid;
}

/** 
 * Handle add contact form submission with validation.
 */
function handleAddContact(event) {
    event.preventDefault();
    const form = event.target;
    if (!validateForm(form)) return false;
    addContact(event);
    return false;
}


/** 
 * Render current logged-in user's contact in the UI.
 */
async function showOwnContact() {
    const ownContactContainer = document.getElementById('own-contact');
    const user = await getUser();
    if (!user) return;
    const isGuest = localStorage.getItem('currentUserId') === 'guest';
    if (!isGuest && !user.color) {user.color = 'black';}
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
    if (panel) { panel.innerHTML = ""; panel.classList.remove("is-open"); panel.style.display = "";}
    if (main) {main.classList.remove("is-open"); main.style.display = "";}
    if (window.innerWidth <= 1000) {sidebar?.classList.remove("hide");}
    activeContactId = null;
}


/** 
 * Toggle active state for a contact and show/hide details panel.
 */
function setActiveContact(element, contact) {
    const ui = getContactLayoutElements();
    if (!ui.panel || !ui.main || !ui.sidebar) return;
    const sameContact = isSameActiveContact(element, contact);
    deactivateAllContacts();
    if (sameContact) {
        resetActiveContactUI();
        return;
    }
    activateContact(element, contact, ui);
}


/**
 * Collect frequently used DOM nodes for contact layouts.
 */
function getContactLayoutElements() {
    const panel = document.getElementById("contact-details");
    const sidebar = document.querySelector(".contact-sidebar");
    const main = document.querySelector(".contact-main");
    return { panel, sidebar, main };
}


/**
 * Determine if the clicked contact is already the active one.
 */
function isSameActiveContact(element, contact) {
    const isSameId = String(activeContactId) === String(contact.id);
    return isSameId && element.classList.contains("active");
}


/**
 * Remove the active state from every contact list entry.
 */
function deactivateAllContacts() {
    document.querySelectorAll(".contact-item")
        .forEach(i => i.classList.remove("active"));
}


/**
 * Activate the selected contact and handle responsive behavior.
 */
function activateContact(element, contact, ui) {
    element.classList.add("active");
    activeContactId = contact.id;
    showContactContent(contact);
    ui.panel.classList.add("is-open");
    ui.main.classList.add("is-open");
    if (window.innerWidth <= 1000) {
        ui.sidebar.classList.add("hide");
        ui.main.style.display = ui.panel.style.display = "block";
    }
}


/** 
 * Handle resize events to adapt sidebar/main layout responsively.
 */
function handleResize() {
    const ui = getContactLayoutElements();
    if (!ui.panel || !ui.main || !ui.sidebar) return;
    const isMobile = window.innerWidth <= 1000;
    toggleSidebarForResize(ui.sidebar, isMobile);
    toggleContactDetails(ui, isMobile);
}


/**
 * Toggle sidebar visibility depending on viewport width and selection.
 */
function toggleSidebarForResize(sidebar, isMobile) {
    const shouldHide = isMobile && activeContactId;
    sidebar.classList.toggle("hide", shouldHide);
    if (!isMobile) sidebar.classList.remove("hide");
}


/**
 * Show or hide the contact details panel when resizing.
 */
function toggleContactDetails(ui, isMobile) {
    const shouldShow = !isMobile || (isMobile && activeContactId);
    const display = shouldShow ? "block" : "none";
    ui.main.style.display = ui.panel.style.display = display;
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
