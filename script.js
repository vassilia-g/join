function dropdownMenu() {
    document.querySelector('.dropdown-content').classList.toggle('d-none');
}

function init() {
    showSidebarAndHeader();
}

function showSidebarAndHeader() {
    let sidebar = document.getElementById('sidebar');
    let header = document.getElementById('header');
    let ref = document.referrer;
    if (ref.includes("index.html")) {
        sidebar.innerHTML = showSidebarBeforeLogin();
        console.log('Von Log in Seite geklickt');
    } else {
        sidebar.innerHTML = showSidebar();
    }
    header.innerHTML = showHeader();
}