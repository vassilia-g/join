/** 
 * Local state and DOM references used by the task overlay module.
 */
let deletedContacts = [];
let boards;
let searchBarElement = document.querySelector('.board-search-bar');
let warningText = document.querySelector('.no-task-found-warning');


/** 
 * Initialize board definitions (container + filler) for the four columns.
 * Returns an array with references used to observe and manage empty-state fillers.
 */
function initBoards() {
  return [
    { container: document.getElementById('new-task-div'), filler: document.getElementById('to-do-filler') },
    { container: document.getElementById('new-task-progress-div'), filler: document.getElementById('progress-filler') },
    { container: document.getElementById('new-task-feedback-div'), filler: document.getElementById('feedback-filler') },
    { container: document.getElementById('new-task-done-div'), filler: document.getElementById('done-filler') }
  ];
}


/** 
 * Set up MutationObservers for each board to toggle its empty-state filler
 * whenever children are added or removed.
 */
document.addEventListener('DOMContentLoaded', () => {
  boards = initBoards();
  boards.forEach(board => {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(() => {
        if (board.container.children.length > 0) {
          board.filler.classList.add('d-none');
        } else {
          board.filler.classList.remove('d-none');
        }
      });
    });
    observer.observe(board.container, { childList: true });
  });
});


/** 
 * Fetch a specific task from the backend and open the overlay with its data.
 * Handles network errors and missing task cases.
 */
async function openTaskOverlay(taskId) {
  try {
    const response = await fetch(`${BASE_URL}/tasks.json`);
    if (!response.ok) throw new Error('Fehler beim Laden der Tasks');
    const data = await response.json();
    const task = data[taskId];
    if (!task) {
      console.warn(`Task mit ID ${taskId} nicht gefunden.`);
      return;
    }
    getOverlayContentWithTask(task, taskId);
    updateCategoryColor();
  } catch (error) {
    console.error('Fehler beim Öffnen des Task-Overlays:', error);
    alert('Task konnte nicht geladen werden.');
  }
}


/** 
 * Inject the task markup into the overlay and animate it visible.
 * Uses the boardTaskOverlayTemplate to build the content.
 */
function getOverlayContentWithTask(task, taskId) {
  const overlay = document.getElementById('task-overlay');
  const overlayContent = document.getElementById('task-overlay-content');
  overlayContent.innerHTML = boardTaskOverlayTemplate(task, taskId);
  overlay.classList.remove('d-none');
  overlayContent.classList.remove('d-none');
  setTimeout(() => {
    overlay.classList.add('active');
    overlayContent.classList.add('active');
  }, 10);
}


/** 
 * Close the visible task overlay with exit animation and hide afterwards.
 */
function closeTaskOverlay() {
  const overlay = document.getElementById('task-overlay');
  const overlayContent = document.getElementById('task-overlay-content');
  overlay.classList.remove('active');
  overlayContent.classList.remove('active');
  setTimeout(() => {
    overlay.classList.add('d-none');
    overlayContent.classList.add('d-none');
  }, 500);
}


/** 
 * Update category label colors for all category elements in the overlay/board.
 * Specific categories get hardcoded background colors.
 */
function updateCategoryColor() {
  const categoryElements = document.querySelectorAll('.category');
  categoryElements.forEach(categoryElement => {
    const categoryText = categoryElement.innerText.trim();
    if (categoryText === "User Story") {
      categoryElement.style.backgroundColor = '#0038FF';
    } else if (categoryText === "Technical Task") {
      categoryElement.style.backgroundColor = '#1FD7C1';
    } else {
      categoryElement.style.backgroundColor = '';
    }
  });
}


/** 
 * Check if the given tasks array is empty and toggle the search/no-results UI.
 * Also inspects each task's rendered element to toggle visibility of parts
 * depending on available task data (description, contacts, subtasks).
 */
function checkIfEmpty(tasks) {
  if (tasks.length == 0) {
    searchBarElement.classList.add('no-task-found');
    warningText.classList.remove('d-none');
  } else {
    searchBarElement.classList.remove('no-task-found');
    warningText.classList.add('d-none');
  }

  tasks.forEach(task => {
    const taskElement = document.querySelector(`[data-task-index="${task.id}"]`);
    if (!taskElement) return;
    const taskInfo = taskElement.querySelector('.task-info');
    const taskContent = taskElement.querySelector('.task-content');
    const taskStatus = taskElement.querySelector('.task-status');
    checkContentFromTask(taskInfo, taskContent, taskStatus, task);
  });
}


/** 
 * Inspect a single task's data and determine which UI parts should be visible.
 * Detects presence of description, details (priority/contacts) and subtasks.
 */
function checkContentFromTask(taskInfo, taskContent, taskStatus, task) {
  const hasContent =
    (typeof task.description === 'string' && task.description.trim() !== '');
  const hasDetails =
    (typeof task.priorityValue === 'string' && task.priorityValue.trim() !== '') ||
    (task.contactsInitials && Object.keys(task.contactsInitials).length > 0);
  const hasSubtasks = (() => {
    if (!task.subtasks) return false;
    if (Array.isArray(task.subtasks)) return task.subtasks.length > 0;
    if (typeof task.subtasks === 'string') return task.subtasks.trim() !== '';
    return false;
  })();
  toggleTaskDivs(taskInfo, taskContent, taskStatus, hasContent, hasDetails, hasSubtasks)
}


/** 
 * Show or hide specific sub-elements of a task card based on booleans.
 */
function toggleTaskDivs(taskInfo, taskContent, taskStatus, hasContent, hasDetails, hasSubtasks) {
  if (taskInfo) taskInfo.classList.toggle('d-none', !hasDetails);
  if (taskContent) taskContent.classList.toggle('d-none', !hasContent);
  if (taskStatus) taskStatus.classList.toggle('d-none', !hasSubtasks);
}


/** 
 * Prompt for deletion and remove a task via DELETE API call, then refresh UI.
 */
async function deleteTask(taskId) {
  if (!confirm("Willst du diese Task wirklich löschen?")) return;
  try {
    await deleteData(`tasks/${taskId}`);
    closeTaskOverlay();
    loadTasks();
  } catch (error) {
    alert('Task konnte nicht gelöscht werden.');
  }
}


/** 
 * Utility to load a script tag only once. Returns a promise resolved when loaded.
 */
function loadScriptOnce(id, src) {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) return resolve();
    const s = document.createElement('script');
    s.id = id;
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Script ${src} konnte nicht geladen werden`));
    document.body.appendChild(s);
  });
}


/** 
 * Enter edit mode for a task: set flags and fetch edit-ready content into overlay.
 */
async function editTask(taskId) {
  isEditingTask = true;
  currentTaskId = taskId;
  const overlay = document.getElementById('task-overlay');
  const overlayContent = document.getElementById('task-overlay-content');
  await getTaskContentFromApi(overlay, overlayContent, taskId);
}


/** 
 * Fetch task data and prepare the add-task form populated with that task's values.
 * Loads required scripts and initializes UI (priority, contacts, subtasks).
 */
async function getTaskContentFromApi(overlay, overlayContent, taskId) {
  const data = await getData('tasks/');
  const task = data[taskId];
  if (!task) throw new Error(`Task mit ID ${taskId} nicht gefunden`);
  await getAddTaskInput(taskId, overlayContent, task)
  await allAddTaskScripts();
  disableCategoryEdit();
  getTaskPriority(task);
  getTaskContent(task, taskId);
  getTaskContacts(task, taskId);
  overlay.classList.remove('d-none');
  overlay.classList.add('active');
}


/** 
 * Disable category editing in the add/edit overlay to prevent changing it while editing.
 */
function disableCategoryEdit() {
  const categoryEdit = document.getElementById('task-category');
  categoryEdit.onclick = null;
  categoryEdit.style.cursor = "default";
}


/** 
 * Load the add-task HTML fragment, clone the form structure and insert into overlay.
 */
async function getAddTaskInput(taskId, overlayContent, task) {
  const htmlResponse = await fetch('../html/add-task.html');
  const html = await htmlResponse.text();
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const taskContent = tempDiv.querySelector('.create-task');
  getOverlayContent(overlayContent, taskContent, taskId, task);
}


/** 
 * If task has contact IDs, render the selected contacts into the edit overlay.
 */
async function getTaskContacts(task, taskId) {
  if (task?.contactsId) {
    renderSelectedContactsFromApi(task, taskId)
  } else {
    return;
  }
}


/** 
 * Populate the selected-contacts container from task contact arrays.
 * Ensures checkedContacts global receives the rendered items for later updates.
 */
async function renderSelectedContactsFromApi(task, taskId) {
  const selectedContacts = document.getElementById('selected-contacts')
  const { contactsColor = [], contactsInitials = [], contactsNames = [], contactsId = [], contactsEmail = [], contactsPhones = [] } = task;
  if (contactsColor.length !== contactsInitials.length) console.warn(`⚠️ Unterschiedliche Längen in contactsColor und contactsInitials bei Task ${taskId}`);
  contactsInitials.forEach((initials, i) => {
    const contact = {
      id: contactsId[i],
      color: contactsColor[i] || '#ccc',
      initials,
      name: contactsNames[i],
      email: contactsEmail[i] || '',
      phone: contactsPhones[i] || ''
    };
    if (!checkedContacts.some(c => c.id === contact.id)) checkedContacts.push(contact);
    selectedContacts.innerHTML += svgTemplate(contact.color, contact.initials);
  });
}


/** 
 * Ensure all add-task related scripts are loaded (used when editing to reuse the form UI).
 */
async function allAddTaskScripts() {
  await loadScriptOnce('add-task-script', '../scripts/add-task.js');
  await loadScriptOnce('add-task-sub-menu-script', '../scripts/add-task-sub-menus.js');
  await loadScriptOnce('add-task-template-script', '../scripts/templates/add-task-template.js');
}


/** 
 * Replace overlayContent with a cloned create-task form and append edit buttons area.
 */
function getOverlayContent(overlayContent, taskContent, taskId, task) {
  overlayContent.innerHTML = '';
  overlayContent.appendChild(taskContent.cloneNode(true));
  const innerContainer = document.createElement('div');
  innerContainer.id = 'edit-task-btn-div';
  innerContainer.classList.add('edit-extra');
  overlayContent.appendChild(innerContainer);
  innerContainer.innerHTML += editandResetTaskBtnTemplate(taskId, task);
}


/** 
 * Initialize priority button state and attach click handlers to toggle selection.
 */
function getTaskPriority(task) {
  const urgentButton = document.getElementById('urgent-priority-btn');
  const mediumButton = document.getElementById('medium-priority-btn');
  const lowButton = document.getElementById('low-priority-btn');
  getPriorityFromTaskApi(urgentButton, mediumButton, lowButton, task);
  urgentButton.removeEventListener('click', () => togglePriorityBtn(urgentButton));
  mediumButton.removeEventListener('click', () => togglePriorityBtn(mediumButton));
  lowButton.removeEventListener('click', () => togglePriorityBtn(lowButton));
  urgentButton.addEventListener('click', () => togglePriorityBtn(urgentButton));
  mediumButton.addEventListener('click', () => togglePriorityBtn(mediumButton));
  lowButton.addEventListener('click', () => togglePriorityBtn(lowButton));
}


/** 
 * Set the active priority button according to task.priorityLevel.
 */
function getPriorityFromTaskApi(urgent, medium, low, task) {
  const map = {urgent, medium, low};
  Object.entries(map).forEach(([level, btn]) => {
    const active = task.priorityLevel === level;
    btn.classList.toggle(`priority-${level}-active`, active);
    btn.classList.toggle(`priority-${level}-default`, !active);
  });
}


/** 
 * Populate add-task inputs (title, description, due date, category) and initialize subtasks UI.
 */
function getTaskContent(task, taskId) {
  document.getElementById('task-title').value = task.title || '';
  document.getElementById('task-description').value = task.description || '';
  document.getElementById('task-due-date').value = task.dueDate || '';
  document.getElementById('input-category').innerText = task.category || '';

  // ▼ Subtask Input Events
  const subtaskInput = document.getElementById('task-subtasks');
  subtaskInput.onclick = () => showSubtaskPicks(taskId);
  subtaskInput.onkeyup = (ev) => {
    if (ev.key === 'Enter') addSubtask();
  };

  // ▼ Subtask SVG Event (NEU BINDEN!)
  const addSubtaskSvg = document.getElementById('add-subtask-svg');
  if (addSubtaskSvg) {
    addSubtaskSvg.onclick = addSubtask;  
  }

  getSubtasks(task, taskId);
}


/** 
 * Reveal the subtask action controls (delete/keep) when user focuses the subtask input area.
 */
function showSubtaskPicks(taskId) {
  const subtaskPicks = document.getElementById('delete-or-keep-subtask');
  const addSubtaskSvg = document.getElementById('add-subtask-svg');
  subtaskPicks.classList.remove('d-none');
}


/** 
 * Render the task's subtasks into the selected-subtasks list and mark checked states.
 */
function getSubtasks(task, taskId) {
  const subtasksList = document.getElementById('selected-subtasks');
  subtasksList.innerHTML = '';
  if (task?.subtasks?.length > 0) {
    subtasks.push(...task.subtasks);
    let checkedSubtasks = task.checkedSubtasks || [];
    if (!Array.isArray(checkedSubtasks)) {
      checkedSubtasks = Object.values(checkedSubtasks);
    }
    checkedSubtasks = checkedSubtasks.flat();
    task.subtasks.forEach((subtask, index) => {
      const isChecked = checkedSubtasks.includes(subtask);
      const checkboxClass = isChecked ? 'checked' : 'unchecked';
      const checkboxIcon = isChecked ? checkedBox : uncheckedBox;
      subtasksList.innerHTML += showApiSubtask(checkboxClass, checkboxIcon, taskId, index, subtask);
    });
  }
}


/** 
 * Read new subtask input and forward to the API add helper.
 */
async function getNewSubtaskToApi(taskId) {
  const subtaskInput = document.getElementById('task-subtasks').value.trim();
  if (!subtaskInput) {
    alert('Bitte gib eine Subtask-Beschreibung ein.');
    return;
  }
  await getSubtasksFromApi(subtaskInput, taskId);
}


/** 
 * Fetch task, append a new subtask and PUT the updated task back to the backend.
 */
async function getSubtasksFromApi(subtaskInput, taskId) {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}.json`);
    const task = await response.json();
    if (!task) throw new Error(`Task mit ID ${taskId} nicht gefunden`);
    if (!Array.isArray(task.subtasks)) {
      task.subtasks = [];
    }
    task.subtasks.push(subtaskInput);
    await putData(`tasks/${taskId}`, task);
    getSubtasks(task, taskId);
    document.getElementById('task-subtasks').value = '';
  } catch (error) {
    alert('Subtask konnte nicht hinzugefügt werden.');
  }
}


/** 
 * Populate the subtask edit UI for a single subtask index so the user can change text.
 */
async function editApiSubtask(taskId, subtaskIndex) {
  const subtasksList = document.getElementById('selected-subtasks');
  subtasksList.innerHTML = '';
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}.json`);
    const task = await response.json();
    if (!task || !task.subtasks) return;
    const subtask = task.subtasks[subtaskIndex];
    subtasksList.innerHTML += showApiSubtaskToEdit(subtask, subtaskIndex, taskId);
  } catch (error) {
    console.error('Fehler beim Laden des Subtasks:', error);
  }
}


/** 
 * Compare edited subtask value with the stored one and save if changed.
 */
async function checkIfSubtaskWasEdited(task, input, subtaskIndex, taskId) {
  const oldValue = task.subtasks[subtaskIndex];
  if (oldValue === input) {
    return;
  }
  task.subtasks[subtaskIndex] = input;
  try {
    await putData(`tasks/${taskId}`, task)
  } catch (error) {
    alert('Subtask konnte nicht gespeichert werden.');
  }
}


/** 
 * Toggle a subtask checkbox visual state and icon between checked/unchecked.
 */
function toggleBoxChecked(checkbox) {
  const isChecked = checkbox.classList.toggle('checked');
  checkbox.classList.toggle('unchecked', !isChecked);
  checkbox.innerHTML = isChecked ? checkedBox : uncheckedBox;
}


/** 
 * Render selected contacts (up to three) and an overflow indicator for a task card.
 * Builds HTML for selected contacts and forwards to the boardTaskTemplate builder.
 */
function checkContactsLength(taskElement, task, taskId) {
  let selectedContactsComplete = '';
  if (!task.contactsInitials) task.contactsInitials = [];
  if (!task.contactsColor) task.contactsColor = [];
  const displayCount = Math.min(task.contactsInitials.length, 3);
  for (let i = 0; i < displayCount; i++) {
    const contact = task.contactsInitials[i];
    const color = task.contactsColor[i] || '#ccc';
    const contactSVG = svgTemplate(color, contact);
    selectedContactsComplete += `<div class="selected-contacts-svg">${contactSVG}</div>`;
  }
  if (task.contactsInitials.length > 3) {
    const extraInitials = task.contactsInitials.slice(3);
    selectedContactsComplete += showMoreContacts(extraInitials);
  }
  boardTaskTemplate(taskElement, task, taskId, selectedContactsComplete);
}
