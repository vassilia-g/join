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
const addSubtaskSvgs = document.getElementById('add-subtask-svg');
let subtasks = [];
const CONTACTS_URL = "https://join-eeec9-default-rtdb.europe-west1.firebasedatabase.app/contacts";
let subtaskListElement;
let lastGeneratedId = null;
let selectedContactsState = {};

if (currentPage === 'add-task.html') {
  addSubtaskSvgs?.addEventListener('click', addSubtask);
} else if (currentPage === 'board.html') {
  addSubtaskSvgs?.addEventListener('click', () => getNewSubtaskToApi(taskId));
}

function deleteSubtask() {
    subtaskInput.value = "";
    subtaskPick.classList.add('d-none');
}

subtaskInput.addEventListener("click", showSubtaskPick);

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
    for (let i = 0; i < subtasks.length; i++) {
    if (i === index) {
      selectedSubtasks.innerHTML = "";
      selectedSubtasks.innerHTML += showSubtaskToEdit(i);
    } 
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
    const checkbox = document.getElementById(`checkbox-${i}`);
    const initials = document.getElementById(`initials-${i}`);
    if (!checkbox || !initials) return;
    if (selectedContactsState[i]) {
        selectedContactsState[i] = false;
        initials.classList.remove("checked");
        checkbox.classList.remove("checked");
        checkbox.innerHTML = showEmptyCheckbox(i);
        removeContactToAPI(checkbox);
    } else {
        selectedContactsState[i] = true;
        initials.classList.add("checked");
        checkbox.classList.add("checked");
        checkbox.innerHTML = showCheckedCheckbox(i);
        sendContactToAPI(initials.outerHTML, contacts[i].name, checkbox, i);
    }
    showSelectedContacts();
}

async function sendContactToAPI(initialsSVG, name, checkbox, i) {
    
    const response = await fetch(`${BASE_URL}/tempContact/Initials.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ svg: initialsSVG })
    });
    const data = await response.json();
    const generatedId = data.name;
    checkbox.dataset.lastId = generatedId;
    await fetch(`${BASE_URL}/tempContact/name/${generatedId}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(name)
    });
        await fetch(`${BASE_URL}/tempContact/color/${generatedId}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contacts[i].color)
    });
}

async function removeContactToAPI(checkbox) {
    const lastGeneratedId = checkbox.dataset.lastId;
    if (!lastGeneratedId) return;

    await fetch(`${BASE_URL}/tempContact/Initials/${lastGeneratedId}.json`, { method: 'DELETE' });
    await fetch(`${BASE_URL}/tempContact/name/${lastGeneratedId}.json`, { method: 'DELETE' });

    console.log("Kontakt erfolgreich entfernt");
    delete checkbox.dataset.lastId;
}

async function showSelectedContacts() {
    SelectedContactsComplete = '';
    const checkedIndices = Object.keys(selectedContactsState).filter(i => selectedContactsState[i]);
    checkedIndices.forEach((i, index) => {
        const initialsSVG = `<svg class="initials-svg checked" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="21" cy="21" r="20" fill="${contacts[i].color}" stroke="white" stroke-width="2"/>
            <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="14" fill="white">
            ${getInitials(contacts[i].name)}</text>
        </svg>`;
        
        if (index < 3) {
            SelectedContactsComplete += `<div class="selected-contacts-svg">${initialsSVG}</div>`;
        }
    });
    if (checkedIndices.length > 3) {
        const extraInitials = checkedIndices.slice(3);
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
    enableCreateTaskButton();
}

function showUserStoryInInput() {
    categoryInput.innerHTML = 'User Story';
    dropdownIconCategories.classList.toggle("open");
    categories.classList.remove('show');
    categories.innerHTML = '';
    selectedCategory = "User Story";
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