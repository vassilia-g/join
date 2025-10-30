/**
 * Collection of sidebar navigation link elements.
 * @type {HTMLCollectionOf<Element>}
 */
let navLinks = document.getElementsByClassName('nav');

/**
 * Collection of legal footer links used to highlight the active page.
 * @type {HTMLCollectionOf<Element>}
 */
let legalLinks = document.getElementsByClassName('legal-link');

/**
 * Log out the current user by clearing localStorage keys and redirecting to the index page.
 */
function logOut() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("userInitials");
    window.location.replace("../index.html");
}

/**
 * Toggle a small dropdown menu and install a one-time outside-click handler to close it.
 * @param {Event} event - click event from the dropdown trigger
 */
function dropdownMenu(event) {
    const dropdown = document.querySelector('.dropdown-content');

    dropdown.classList.toggle('d-none');

    document.addEventListener('click', function handleOutsideClick(e) {
        if (
            !dropdown.contains(e.target) &&
            !event.target.contains(e.target)
        ) {
            dropdown.classList.add('d-none');
            document.removeEventListener('click', handleOutsideClick);
        }
    });
}

/**
 * Initialize UI pieces needed after page load.
 * Calls routines to render header/sidebar and highlight the current sidebar link.
 */
function init() {
    showSidebarAndHeader();
    changeSidebarLinksStyle();
}

/**
 * Render the sidebar and header markup.
 * If the user is not logged in, show the pre-login header/sidebar variants.
 */
function showSidebarAndHeader() {
    let sidebar = document.getElementById('sidebar');
    let header = document.getElementById('header');
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        header.innerHTML = showHeaderBeforeLogin();
        sidebar.innerHTML = showSidebarBeforeLogin();
    } else {
        let userInitials = localStorage.getItem('userInitials') || 'GU';
        sidebar.innerHTML = showSidebar();
        header.innerHTML = showHeader(userInitials);
    }
}

/**
 * Determine the current page from the URL and apply the appropriate active styling
 * to the matching sidebar link.
 */
function changeSidebarLinksStyle() {
    let currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "add-task.html") {
        changeAddTaskLink();
    } else if (currentPage === "board.html") {
        changeBoardLink();
    } else if (currentPage === "contacts.html") {
        changeContactsLink();
    } else if (currentPage === "summary.html") {
        changeSummaryLink();
    } else if (currentPage === "help.html") {
        changeHelpLink();
    } else if (currentPage === "legal-notice.html") {
        changeLegalNoticeLink();
    } else {
        changePrivacyPolicyLink();
    }
}

/**
 * Highlight the "Add Task" sidebar link and prevent navigation to the same page.
 */
function changeAddTaskLink() {
    let addTaskIcon = document.getElementsByClassName('sidebar-add-task-icon')[0];
    let addTaskIconPath = addTaskIcon.querySelectorAll("path");
    navLinks[1].classList.add('selected-nav');
    navLinks[1].onclick = function (event) {
        event.preventDefault();
    };
    addTaskIconPath.forEach(path => {
        path.setAttribute("fill", "#FFFFFF");
    });
}

/**
 * Highlight the "Board" sidebar link and prevent navigation to the same page.
 */
function changeBoardLink() {
    let boardIcon = document.getElementsByClassName('sidebar-board-icon')[0];
    let boardIconPath = boardIcon.querySelectorAll("path");
    navLinks[2].classList.add('selected-nav');
    navLinks[2].onclick = function (event) {
        event.preventDefault();
    };
    boardIconPath.forEach(path => {
        path.setAttribute("fill", "#FFFFFF");
    });
}

/**
 * Highlight the "Contacts" sidebar link and prevent navigation to the same page.
 */
function changeContactsLink() {
    let contactsIcon = document.getElementsByClassName('sidebar-contacts-icon')[0];
    let contactsIconPath = contactsIcon.querySelectorAll("path");
    navLinks[3].classList.add('selected-nav');
    navLinks[3].onclick = function (event) {
        event.preventDefault();
    };
    contactsIconPath.forEach(path => {
        path.setAttribute("fill", "#FFFFFF");
    });
}

/**
 * Highlight the "Summary" sidebar link and prevent navigation to the same page.
 */
function changeSummaryLink() {
    let summaryIcon = document.getElementsByClassName('sidebar-summary-icon')[0];
    let summaryIconPath = summaryIcon.querySelectorAll("path");
    navLinks[0].classList.add('selected-nav');
    navLinks[0].onclick = function (event) {
        event.preventDefault();
    };
    summaryIconPath.forEach(path => {
        path.setAttribute("fill", "#FFFFFF");
    });
}

/**
 * Hide the help icon in the sidebar (used when on the help page).
 */
function changeHelpLink() {
    let helpIcon = document.getElementsByClassName('help');
    helpIcon[0].classList.add('d-none');
}

/**
 * Mark the legal notice footer link as active and disable navigation.
 */
function changeLegalNoticeLink() {
    legalLinks[1].classList.add('selected-legal-link');
    legalLinks[1].onclick = function (event) {
        event.preventDefault();
    };
}

/**
 * Mark the privacy policy footer link as active and disable navigation.
 */
function changePrivacyPolicyLink() {
    legalLinks[0].classList.add('selected-legal-link');
    legalLinks[0].onclick = function (event) {
        event.preventDefault();
    };
}