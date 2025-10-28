let navLinks = document.getElementsByClassName('nav');
let legalLinks = document.getElementsByClassName('legal-link');

// logout helper
function logOut() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("userInitials");
    window.location.replace("../index.html");
}


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


function init() {
    showSidebarAndHeader();
    changeSidebarLinksStyle();
}


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


function changeHelpLink() {
    let helpIcon = document.getElementsByClassName('help');
    helpIcon[0].classList.add('d-none');
}


function changeLegalNoticeLink() {
    legalLinks[1].classList.add('selected-legal-link');
    legalLinks[1].onclick = function (event) {
        event.preventDefault();
    };
}


function changePrivacyPolicyLink() {
    legalLinks[0].classList.add('selected-legal-link');
    legalLinks[0].onclick = function (event) {
        event.preventDefault();
    };
}