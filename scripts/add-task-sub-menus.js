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
const tempContactIds = {};
let contactActionInProgress = {};


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


async function getContactsAndTask() {
    const dataRes = await getData("tasks/");
    const contactRes = await getData("contacts/");
    const tasksArray = dataRes ? Object.values(dataRes) : [];
    const contactsArray = contactRes
        ? Object.entries(contactRes).map(([id, contact]) => ({ id, ...contact }))
        : [];
    return { tasksArray, contactsArray };
}


async function openDropdownContacts() {
    let { tasksArray, contactsArray } = await getContactsAndTask();
    contactsArray = getContactsInitials(contactsArray);
    console.log(contactsArray);
    if (contactsToSelect.classList.contains('show')) {
        hideDropdownContacts();
        dropdownIcon.classList.remove("open");
        showSelectedContacts();
        return;
    }
    for (let i = 0; i < contactsArray.length; i++) {
        contactsToSelect.innerHTML += showContacts(contactsArray, i);   
    }
    toggleClasslistForDropdown();
}

function getContactsInitials(contacts) {
    return contacts.map(contact => {
        return {
            ...contact,
            initials: getInitials(contact.name)
        };
    });
}


function toggleClasslistForDropdown() {
    contactsToSelect.classList.add('show');
    dropdownIcon.classList.add("open");
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
    dropdownIcon.classList.remove("open");
    selectedContacts.classList.remove('d-none');
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
        removeContactToAPI(i);
    } else {
        selectedContactsState[i] = true;
        initials.classList.add("checked");
        checkbox.classList.add("checked");
        checkbox.innerHTML = showCheckedCheckbox(i);
        sendContactToAPI(i);
    }
    showSelectedContacts();
}


async function sendContactToAPI(i) {
    let {contactsArray } = await getContactsAndTask();
    contactsArray = getContactsInitials(contactsArray);
    let contactsIds = contactsArray.map(contact => contact.id);
    console.log(contactsIds);
    const payload = {
            id: contactsIds[i],
            name: contactsArray[i].name,
            initials: contactsArray[i].initials,
            color: contactsArray[i].color
        };
    await postData("tempContacts", payload)
}


async function removeContactToAPI(i) {
  const lastGeneratedId = tempContactIds[i];
  if (!lastGeneratedId) {
    console.warn("⚠️ Keine gespeicherte ID für Index", i);
    return;
  }
  try {
    await fetch(`${BASE_URL}/tempContact/Initials/${lastGeneratedId}.json`, { method: 'DELETE' });
    await fetch(`${BASE_URL}/tempContact/name/${lastGeneratedId}.json`, { method: 'DELETE' });
    await fetch(`${BASE_URL}/tempContact/color/${lastGeneratedId}.json`, { method: 'DELETE' });
    delete tempContactIds[i];
  } catch (err) {
    console.error("❌ Fehler beim Entfernen:", err);
  }
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