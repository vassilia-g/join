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
  const contactsToSelect = document.getElementById('contacts-to-select');
  const dropdownIcon = document.getElementById('dropdown-icon');
  const selectedContacts = document.getElementById('selected-contacts');
  let { contactsArray } = await getContactsAndTask();
  contacts = getContactsInitials(contactsArray);
  globalContactsArray = contacts;
  console.log(contactsArray);

  if (contactsToSelect.classList.contains('show')) {
    hideDropdownContacts(contactsToSelect, dropdownIcon, selectedContacts);
    dropdownIcon.classList.remove("open");
    showSelectedContacts(selectedContacts);
    return;
  }

  contactsToSelect.innerHTML = '';

  for (let i = 0; i < contactsArray.length; i++) {
    const contact = contactsArray[i];
    const isChecked = checkedContacts.some(c => c.id === contact.id);
    const initials = getInitials(contact.name);
    const checkboxSvg = isChecked
      ? showCheckedCheckbox(contact)
      : showEmptyCheckbox(contact);
    contactsToSelect.innerHTML += selectedContactsFromTaskTemplate(contact, initials, checkboxSvg);
    if (isChecked) {
      checkedContacts = [
        ...checkedContacts.filter(c => c.id !== contact.id),
        contact
      ];
    }
  }

  toggleClasslistForDropdown(contactsToSelect, dropdownIcon, selectedContacts);
}


function getContactsInitials(contacts) {
    return contacts.map(contact => {
        return {
            ...contact,
            initials: getInitials(contact.name)
        };
    });
}


function toggleClasslistForDropdown(contactsToSelect, dropdownIcon, selectedContacts) {
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


function hideDropdownContacts(contactsToSelect, dropdownIcon, selectedContacts) {
    contactsToSelect.classList.remove('show');
    dropdownIcon.classList.remove("open");
        setTimeout(() => {
        selectedContacts.classList.remove('d-none');
    }, 200);
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


function checkContact(contactId) {
  const contact = globalContactsArray.find(c => c.id === contactId);
  if (!contact) return console.warn('⚠️ Kein Kontakt mit dieser ID gefunden:', contactId);
  contact.initials = getInitials(contact.name);
  const checkbox = document.getElementById(`checkbox-${contactId}`);
  const initialsSvg = document.getElementById(`initials-${contactId}`);
  if (!checkbox || !initialsSvg) return;

  const isChecked = checkbox.classList.contains("checked");

  if (isChecked) {
    initialsSvg.classList.remove("checked");
    checkbox.classList.remove("checked");
    checkbox.innerHTML = showEmptyCheckbox(contact);
    checkedContacts = checkedContacts.filter(c => c.id !== contact.id);
  } else {
    initialsSvg.classList.add("checked");
    checkbox.classList.add("checked");
    checkbox.innerHTML = showCheckedCheckbox(contact);
    if (!checkedContacts.some(c => c.id === contact.id)) {
      checkedContacts.push(contact);
    } else {
      checkedContacts = checkedContacts.map(c => c.id === contact.id ? contact : c);
    }
  }
  console.log("checkedContacts:", checkedContacts);
  showSelectedContacts();
}

async function showSelectedContacts() {
    const selectedContacts = document.getElementById('selected-contacts');
    selectedContacts.innerHTML = '';
    if (!checkedContacts || checkedContacts.length === 0) return;
    let contactsHTML = '';
    for (let i = 0; i < checkedContacts.length; i++) {
        const contact = checkedContacts[i];
        const color = contact.color || '#ccc';
        const initials = getInitials(contact.name || contact.email || '?');
        contactsHTML += svgTemplate(color, initials);
    }
    selectedContacts.innerHTML = contactsHTML;
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