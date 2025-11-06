/**
 * HTML snippet holding rendered selected contacts (used when building contact display).
 * @type {string}
 */
let SelectedContactsComplete = '';


/**
 * DOM references for dropdown icons, category and contact elements, subtasks and lists.
 * These are queried once and reused by the sub-menu functions.
 */
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


/**
 * Local state for subtasks and contacts used by the add-task UI.
 * subtasks: working list of new subtasks (array of strings)
 * tempContactIds: temporary mapping used when creating contacts
 * contactActionInProgress: flags to prevent concurrent contact actions
 */
let subtasks = [];
const CONTACTS_URL = "https://join-eeec9-default-rtdb.europe-west1.firebasedatabase.app/contacts";
let subtaskListElement;
let lastGeneratedId = null;
const tempContactIds = {};
let contactActionInProgress = {};


/**
 * Attach click handler to the "add subtask" SVG button if present.
 */
addSubtaskSvgs?.addEventListener('click', addSubtask);


/**
 * Clear the current subtask input and hide the subtask action controls.
 */
function deleteSubtask() {
    subtaskInput.value = "";
    subtaskPick.classList.add('d-none');
}


/**
 * Show the subtask controls when the subtask input is focused/clicked.
 */
subtaskInput.addEventListener("click", showSubtaskPick);


/**
 * Reveal subtask action controls.
 */
function showSubtaskPick() {
    subtaskPick.classList.remove('d-none');
}


/**
 * Add the current subtask input value to local subtasks array and render list.
 * When editing an existing task it will render subtasks from the task instead.
 */
async function addSubtask() {
    subtasks.push(subtaskInput.value);
    selectedSubtasks.innerHTML = "";
    if (isEditingTask && currentTaskId) {
        const task = await getData(`tasks/${currentTaskId}`);
        renderSubtasksFromTask(task, currentTaskId);
    } else {
        renderSubtasks(subtasks);
    }
    subtaskInput.value = "";
    subtaskPick.classList.add('d-none');
}


/**
 * Render subtasks using task data (for editing).
 * Preserves the checked state by comparing against checkedSubtasks in the task.
 * @param {Object} task - task object from backend
 * @param {string} taskId - id of the task
 */
function renderSubtasksFromTask(task, taskId) {
    const checked = Array.isArray(task.checkedSubtasks?.subtasks)
        ? task.checkedSubtasks.subtasks
        : Object.values(task.checkedSubtasks?.subtasks || []);
    subtasks.forEach((subtask, i) => {
        const isChecked = checked.includes(subtask);
        selectedSubtasks.innerHTML += showApiSubtask(
            isChecked ? 'checked' : 'unchecked',
            isChecked ? checkedBox : uncheckedBox,
            taskId, i, subtask
        );
    });
}


/**
 * Render a list of new subtasks (used when creating a task).
 * @param {Array<string>} list - array of subtask text values
 */
function renderSubtasks(list) {
    list.forEach((subtask, i) => selectedSubtasks.innerHTML += showSubtask(i, subtask));
}


/**
 * Remove a subtask from the local subtasks list and re-render the list.
 * @param {number} index - index of subtask to delete
 */
function deleteSubtaskFromList(index) {
    subtasks.splice(index, 1);
    selectedSubtasks.innerHTML = "";
    for (let index = 0; index < subtasks.length; index++) {
        selectedSubtasks.innerHTML += showSubtask(index);
    }
}


/**
 * Replace the given subtask entry with an edit input UI.
 * @param {number} index - index of subtask to edit
 */
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


/**
 * Remove the currently edited subtask element from the DOM and local subtasks.
 * @param {number} index - index of the edited subtask to remove
 */
function deleteEditedSubtask(index) {
    subtaskListElement = document.getElementsByClassName('subtask-list-element');
    subtaskListElement[index].remove();
    subtasks.splice(index, 1);
}


/**
 * Keep the edited subtask value and re-render the subtasks list.
 * @param {number} index - index of the subtask
 */
function keepEditedSubtask(index) {
    let editInput = document.getElementById('edit-input');
    subtasks[index] = editInput.value;
    selectedSubtasks.innerHTML = "";
    for (let index = 0; index < subtasks.length; index++) {
        selectedSubtasks.innerHTML += showSubtask(index);
    }
}


/**
 * Check whether a contact with given initials is already selected in the UI.
 * @param {string} initials - initials text to check
 * @returns {boolean} true if contact is already selected
 */
function isContactSelected(initials) {
    const selectedSvgs = selectedContacts.querySelectorAll("svg text");
    return Array.from(selectedSvgs).some(textE1 => textE1.textContent.trim() === initials);
}


/**
 * Fetch tasks and contacts from the API and return arrays for both.
 * @returns {Promise<{tasksArray: Array, contactsArray: Array}>}
 */
async function getContactsAndTask() {
    const dataRes = await getData("tasks/");
    const contactRes = await getData("contacts/");
    const tasksArray = dataRes ? Object.values(dataRes) : [];
    const contactsArray = contactRes
        ? Object.entries(contactRes).map(([id, contact]) => ({ id, ...contact }))
        : [];
    return { tasksArray, contactsArray };
}


/**
 * Open the contacts dropdown, load contacts, render items and toggle visibility.
 * Maintains the checkedContacts selection state.
 */
async function openDropdownContacts() {
    const contactsToSelect = document.getElementById('contacts-to-select');
    const dropdownIcon = document.getElementById('dropdown-icon');
    const selectedContacts = document.getElementById('selected-contacts');
    const { contactsArray } = await getContactsAndTask();
    const contacts = getContactsInitials(contactsArray);
    globalContactsArray = contacts;
    if (contactsToSelect.classList.contains('show')) {
        hideDropdownContacts(contactsToSelect, dropdownIcon, selectedContacts);
        dropdownIcon.classList.remove("open");
        showSelectedContacts(selectedContacts);
        return;
    }
    contactsToSelect.innerHTML = contacts.map(c => renderContact(c)).join('');
    toggleClasslistForDropdown(contactsToSelect, dropdownIcon, selectedContacts);
}


/**
 * Render a single contact row for the dropdown. Uses checkedContacts to set checkbox state.
 * @param {Object} contact - contact object with id, name, color, initials
 * @returns {string} HTML string for the contact row
 */
function renderContact(contact) {
    const isChecked = checkedContacts.some(c => c.id === contact.id);
    if (isChecked) checkedContacts = [...checkedContacts.filter(c => c.id !== contact.id), contact];
    const checkboxSvg = isChecked ? showCheckedCheckbox(contact) : showEmptyCheckbox(contact);
    return selectedContactsFromTaskTemplate(contact, getInitials(contact.name), checkboxSvg);
}


/**
 * Map contact objects to include initials for display.
 * @param {Array<Object>} contacts - array of contact objects
 * @returns {Array<Object>} contacts with initials property
 */
function getContactsInitials(contacts) {
    return contacts.map(contact => {
        return {
            ...contact,
            initials: getInitials(contact.name)
        };
    });
}


/**
 * Toggle the CSS classes to show the contacts dropdown and hide the compact selected-contacts view.
 * @param {Element} contactsToSelect - dropdown container
 * @param {Element} dropdownIcon - dropdown icon element
 * @param {Element} selectedContacts - compact selected contacts element
 */
function toggleClasslistForDropdown(contactsToSelect, dropdownIcon, selectedContacts) {
    contactsToSelect.classList.add('show');
    dropdownIcon.classList.add("open");
    selectedContacts.classList.add('d-none');
}


/**
 * Global click handler to close dropdowns when clicking outside and ignore clicks on SVGs.
 */
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


/**
 * Hide the contacts dropdown and restore the compact selected-contacts view after a short delay.
 */
function hideDropdownContacts() {
    const contactsToSelect = document.getElementById('contacts-to-select');
    const dropdownIcon = document.getElementById('dropdown-icon');
    const selectedContacts = document.getElementById('selected-contacts');
    if (!contactsToSelect || !dropdownIcon || !selectedContacts) return;
    contactsToSelect.classList.remove('show');
    dropdownIcon.classList.remove("open");
    setTimeout(() => {
        selectedContacts.classList.remove('d-none');
    }, 200);
}


/**
 * Hide the categories dropdown and clear its content after the closing transition.
 */
function hideDropdownCategories() {
    categories.classList.remove('show');
    setTimeout(() => {
        categories.innerHTML = '';
    }, 300);
}


/**
 * Compute initials from a name string (first and last word characters).
 * @param {string} name - full name
 * @returns {string} two-letter initials (uppercased)
 */
function getInitials(name) {
    const parts = name.split(" ");
    const first = parts[0].charAt(0);
    const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
    return (first + last).toUpperCase();
}


/**
 * Toggle a contact checkbox by id, update checkedContacts state and selected contacts view.
 * @param {string} contactId - id of the contact to toggle
 */
function checkContact(contactId) {
    const contact = globalContactsArray.find(c => c.id === contactId);
    if (!contact) return console.warn('⚠️ Kein Kontakt mit dieser ID gefunden:', contactId);
    contact.initials = getInitials(contact.name);
    const checkbox = document.getElementById(`checkbox-${contactId}`);
    const initialsSvg = document.getElementById(`initials-${contactId}`);
    if (!checkbox || !initialsSvg) return;
    toggleCheckbox(checkbox, initialsSvg, contact);
    showSelectedContacts();
}


/**
 * Internal helper to toggle a checkbox SVG and update the checkedContacts array.
 * @param {Element} checkbox - checkbox container element
 * @param {Element} initialsSvg - initials SVG element
 * @param {Object} contact - contact object
 */
function toggleCheckbox(checkbox, initialsSvg, contact) {
    const svg = checkbox.querySelector('svg');
    if (!svg) return console.warn('⚠️ Kein SVG in Checkbox gefunden:', contact.id);
    const isChecked = svg.classList.contains('checked');
    svg.classList.toggle('checked', !isChecked);
    initialsSvg.classList.toggle('checked', !isChecked);
    checkbox.innerHTML = isChecked ? showEmptyCheckbox(contact) : showCheckedCheckbox(contact);
    checkedContacts = isChecked
        ? checkedContacts.filter(c => c.id !== contact.id)
        : [...checkedContacts.filter(c => c.id !== contact.id), contact];
}


/**
 * Render the compact selected contacts area from checkedContacts state.
 * Shows nothing if no contacts are selected.
 */
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


/** Toggle categories dropdown visibility, injecting content when opened.*/
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


/** Select "Technical Task" as category and update UI state.*/
function showTechnicalTaskInInput() {
    categoryInput.innerHTML = 'Technical Task';
    dropdownIconCategories.classList.toggle("open");
    categories.classList.remove('show');
    categories.innerHTML = '';
    selectedCategory = "Technical Task";
    warningField.classList.add('d-none');
    enableCreateTaskButton();
}


/** Select "User Story" as category and update UI state.*/
function showUserStoryInInput() {
    categoryInput.innerHTML = 'User Story';
    dropdownIconCategories.classList.toggle("open");
    categories.classList.remove('show');
    categories.innerHTML = '';
    selectedCategory = "User Story";
    warningField.classList.add('d-none');
    enableCreateTaskButton();
}


/**
 * Observe category text node for changes to hide/show the validation warning.
 * Adds the observer only once per input element.
 * @param {Element} inputElement - wrapper element for category input
 * @param {Element} warning - warning element to toggle
 * @param {Element} categorySpan - the actual span containing category text
 */
function eventListenerForSelectCategory(el, warn, span) {
  if (el.dataset.listenerAdded) return;
  const obs = new MutationObserver(() => {
    const drop = document.getElementById("categories");
    const open = drop && drop.classList.contains("show");
    const empty = span?.textContent.trim() === "Select task category";
    if (!empty) {
      warn.classList.add("d-none");
      el.classList.remove("error");
    } else if (!open) {
      warn.classList.remove("d-none");
      el.classList.add("error");
    }
  });
  obs.observe(span, { childList: true, characterData: true, subtree: true });
  el.dataset.listenerAdded = "true";
}