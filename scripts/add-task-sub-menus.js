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

function selectSubtask() {
    let subtaskInputValue = subtaskInput.value;
    if (subtaskInputValue.length > 0) {
        subtaskPick.classList.remove('d-none');
    } else {
        subtaskPick.classList.add('d-none');
    }
}

function deleteSubtask() {
    subtaskInput.value = "";
    subtaskPick.classList.add('d-none');
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

function openDropdownContacts() {
    selectedContacts.innerHTML = '';
    if (contactsToSelect.innerHTML == '') {
        for (let i = 0; i < contacts.length; i++) {
            contactsToSelect.innerHTML += showContacts(i);
        }
        setTimeout(() => {
            contactsToSelect.classList.add('show');
        }, 10);
    } else {
        hideDropdownContacts();
        showSelectedContacts();
    }
    dropdownIcon.classList.toggle("open");
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
    } else {
        checkbox.classList.add("checked");
        initials.classList.add("checked");
        svgContainer.outerHTML = showCheckedCheckbox(i);
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
    const taskPayload = {
        contactsHTML: SelectedContactsComplete
    };

    try {
        const response = await fetch(BASE_URL + 'tasks/selected-contacts.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskPayload)
        });

        const data = await response.json();
        console.log('Kontakte erfolgreich an API gesendet:', data);

    } catch (error) {
        console.error('Fehler beim Senden der Kontakte:', error);
    }
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