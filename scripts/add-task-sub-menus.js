const contactsToSelect = document.getElementById('contacts-to-select');
const selectedContacts = document.getElementById('selected-contacts');
let SelectedContactsComplete = '';
const dropdownIcon = document.getElementById('dropdown-icon');
const categories = document.getElementById('categories');
const dropdownIconCategories = document.getElementById('dropdown-icon-categories');
const categoryInput = document.getElementById('input-category');
const contactInputAndDropdown = document.getElementById('contact-input-and-dropdown');
const categoryInputAndDropdown = document.getElementById('category-input-and-dropdown');
const subtaskInput = document.getElementById('task-subtasks');
const subtaskPick = document.getElementById('delete-or-keep-subtask');
const selectedSubtasks = document.getElementById('selected-subtasks');
let subtasks = [];
const CONTACTS_URL = "https://join-eeec9-default-rtdb.europe-west1.firebasedatabase.app/contacts";
let subtaskListElement;
let lastGeneratedId = null;

function deleteSubtask() {
    subtaskInput.value = "";
    subtaskPick.classList.add('d-none');
}

subtaskInput.addEventListener("click", showSubtaskPick);
document.getElementById("task-title").addEventListener("input", enableCreateTaskButton);

function showSubtaskPick() {
    subtaskPick.classList.remove('d-none');
}

function addSubtask() {
    subtasks.push(subtaskInput.value);
    selectedSubtasks.innerHTML = "";
    for (let index = 0; index < subtasks.length; index++) {
        selectedSubtasks.innerHTML += showSubtask(index);
    }
    subtaskInput.value = "";
    subtaskPick.classList.add('d-none');
}

function deleteSubtaskFromList(index) {
    subtasks.splice(index, 1);
    selectedSubtasks.innerHTML = "";
    for (let index = 0; index < subtasks.length; index++) {
        selectedSubtasks.innerHTML += showSubtask(index);
    }
}

function editSubtask(index) {
    selectedSubtasks.innerHTML = "";
    for (let index = 0; index < subtasks.length; index++) {
        selectedSubtasks.innerHTML += showSubtask(index);
    }
    subtaskListElement = document.getElementsByClassName('subtask-list-element');
    subtaskListElement[index].classList.add('subtask-list-element-edit');
    subtaskListElement[index].innerHTML = showSubtaskToEdit(index);
}

function deleteEditedSubtask(index) {
    subtaskListElement = document.getElementsByClassName('subtask-list-element');
    subtaskListElement[index].remove();
    subtasks.splice(index, 1);
}

function keepEditedSubtask(index) {
    let editInput = document.getElementById('edit-input');
    subtasks[index] = editInput.value;
    selectedSubtasks.innerHTML = "";
    for (let index = 0; index < subtasks.length; index++) {
        selectedSubtasks.innerHTML += showSubtask(index);
    }
}

function isContactSelected(initials) {
    const selectedSvgs = selectedContacts.querySelectorAll("svg text");
    return Array.from(selectedSvgs).some(textE1 => textE1.textContent.trim() === initials);
}


function openDropdownContacts() {

    if (contactsToSelect.innerHTML == '') {
        for (let i = 0; i < contacts.length; i++) {
            contactsToSelect.innerHTML += showContactsWithSelectionState(i);
        }
        setTimeout(() => {
            contactsToSelect.classList.add('show');
        }, 10);
    } else {
        hideDropdownContacts();
        showSelectedContacts();
    }
    dropdownIcon.classList.toggle("open");
    selectedContacts.classList.add('d-none');
}

document.onclick = function (event) {
    const isClickOnSvg = event.target.closest('svg');
    if (isClickOnSvg) {
        return;
    }
    if (!contactInputAndDropdown.contains(event.target) && contactsToSelect.classList.contains('show')) {
        hideDropdownContacts();
        dropdownIcon.classList.toggle("open");
        showSelectedContacts();
    }
    if (!categoryInputAndDropdown.contains(event.target) && categories.classList.contains('show')) {
        hideDropdownCategories();
        dropdownIconCategories.classList.toggle("open");
    }
}

function hideDropdownContacts() {
    contactsToSelect.classList.remove('show');
    setTimeout(() => {
        contactsToSelect.innerHTML = '';
    }, 300);
    setTimeout(() => {
        selectedContacts.classList.remove('d-none');
    }, 300);

}

function hideDropdownCategories() {
    categories.classList.remove('show');
    setTimeout(() => {
        categories.innerHTML = '';
    }, 300);
}

function getInitials(name) {
    const parts = name.split(" ");
    const first = parts[0].charAt(0);
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
    return (first + last).toUpperCase();
}


function checkContact(i) {
    let checkbox = document.getElementById(`checkbox-${i}`);
    let initials = document.getElementById(`initials-${i}`);

    let svgContainer = checkbox.querySelector('svg');
    if (checkbox.classList.contains("checked")) {
        initials.classList.remove("checked");
        checkbox.classList.remove("checked");
        svgContainer.outerHTML = showEmptyCheckbox(i);
        const svgHTML = initials.outerHTML;
        const name = contacts[i].name;
        removeContactToAPI(svgHTML, name);
    } else {
        checkbox.classList.add("checked");
        initials.classList.add("checked");
        svgContainer.outerHTML = showCheckedCheckbox(i);
        const svgHTML = initials.outerHTML;
        const name = contacts[i].name;
        sendContactToAPI(svgHTML, name);
    }
}

async function sendContactToAPI(initialsSVG, name) {
    try {
        const response = await fetch(`${BASE_URL}/tempContact/Initials.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ svg: initialsSVG })
        });
        const data = await response.json();
        const generatedId = data.name;
        lastGeneratedId = generatedId;
        await fetch(`${BASE_URL}/tempContact/name/${generatedId}.json`, {
            method: 'PUT', // PUT, damit Key gleich bleibt
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(name)
        });

        console.log("Kontakt erfolgreich gesendet:", name);
    } catch (error) {
        console.error("Fehler beim Senden des Kontakts:", error);
    }
}

async function removeContactToAPI() {
    if (!lastGeneratedId) return;

    try {
        await fetch(`${BASE_URL}/tempContact/Initials/${lastGeneratedId}.json`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        await fetch(`${BASE_URL}/tempContact/name/${lastGeneratedId}.json`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        console.log("Kontakt erfolgreich entfernt");
        lastGeneratedId = null;
    } catch (error) {
        console.error("Fehler beim Entfernen des Kontakts:", error);
    }
}

async function showSelectedContacts() {
    SelectedContactsComplete = '';
    let checkedInitials = document.querySelectorAll("svg.checked");

    if (checkedInitials.length <= 3) {
        checkedInitials.forEach(svg => {
            SelectedContactsComplete += `<div class="selected-contacts-svg">${svg.outerHTML}</div>`;
        });
    } else {
        for (let i = 0; i < 3; i++) {
            SelectedContactsComplete += `<div class="selected-contacts-svg">${checkedInitials[i].outerHTML}</div>`;
        }
        const extraInitials = Array.from(checkedInitials).slice(3);
        SelectedContactsComplete += showMoreContacts(extraInitials);
    }
    selectedContacts.innerHTML = SelectedContactsComplete;
}

function openCategories() {
    if (categories.innerHTML == '') {
        categories.innerHTML += showCategories();
        setTimeout(() => {
            categories.classList.add('show');
        }, 10);
    } else {
        hideDropdownCategories();
    }
    dropdownIconCategories.classList.toggle("open");
}

function showTechnicalTaskInInput() {
    categoryInput.innerHTML = 'Technical Task';
    dropdownIconCategories.classList.toggle("open");
    categories.classList.remove('show');
    categories.innerHTML = '';
    selectedCategory = "Technical Task";
    // setCategory();
    enableCreateTaskButton();
}

function showUserStoryInInput() {
    categoryInput.innerHTML = 'User Story';
    dropdownIconCategories.classList.toggle("open");
    categories.classList.remove('show');
    categories.innerHTML = '';
    selectedCategory = "User Story";
    // setCategory();
    enableCreateTaskButton();
}

function eventListenerForSelectCategory(inputElement, warning, categorySpan) {
    if (!inputElement.dataset.listenerAdded) {
        const observer = new MutationObserver(() => {
            if (categorySpan.textContent.trim() !== "Select task category") {
                warning.classList.add("d-none");
                inputElement.classList.remove("error");
            } else {
                warning.classList.remove("d-none");
                inputElement.classList.add("error");
            }
        });
        observer.observe(categorySpan, { childList: true, characterData: true, subtree: true });
        inputElement.dataset.listenerAdded = "true";
    }
}