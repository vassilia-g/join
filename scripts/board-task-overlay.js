
let deletedContacts = [];
let boards;

function initBoards() {
  return [
    { container: document.getElementById('new-task-div'), filler: document.getElementById('to-do-filler') },
    { container: document.getElementById('new-task-progress-div'), filler: document.getElementById('progress-filler') },
    { container: document.getElementById('new-task-feedback-div'), filler: document.getElementById('feedback-filler') },
    { container: document.getElementById('new-task-done-div'), filler: document.getElementById('done-filler') }
  ];
}


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


async function openTaskOverlay(taskId) {
  try {
    const response = await fetch(`${BASE_URL}/tasks.json`);
    if (!response.ok) throw new Error('Fehler beim Laden der Tasks');
    const data = await response.json();
    const task = data[taskId];
    if (!task) {
      console.warn(`❌ Task mit ID ${taskId} nicht gefunden.`);
      return;
    }
    getOverlayContentWithTask(task, taskId);
    updateCategoryColor();
  } catch (error) {
    console.error('Fehler beim Öffnen des Task-Overlays:', error);
    alert('Task konnte nicht geladen werden.');
  }
}


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


function checkIfEmpty(tasks) {
  tasks.forEach(task => {
    const taskElement = document.querySelector(`[data-task-index="${task.id}"]`);
    if (!taskElement) return;
    const taskInfo = taskElement.querySelector('.task-info');
    const taskContent = taskElement.querySelector('.task-content');
    const taskStatus = taskElement.querySelector('.task-status');
    checkContentFromTask(taskInfo, taskContent, taskStatus, task);
  });
}


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


function toggleTaskDivs(taskInfo, taskContent, taskStatus, hasContent, hasDetails, hasSubtasks) {
    if (taskInfo) taskInfo.classList.toggle('d-none', !hasDetails);
    if (taskContent) taskContent.classList.toggle('d-none', !hasContent);
    if (taskStatus) taskStatus.classList.toggle('d-none', !hasSubtasks);
}


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


async function editTask(taskId) {
  const overlay = document.getElementById('task-overlay');
  const overlayContent = document.getElementById('task-overlay-content');
  await getTaskContentFromApi(overlay, overlayContent, taskId); 
}


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


function disableCategoryEdit() {
  const categoryEdit = document.getElementById('task-category');
  categoryEdit.onclick = null;
  categoryEdit.style.cursor = "default";
}


async function getAddTaskInput(taskId, overlayContent, task) {
  const htmlResponse = await fetch('../html/add-task.html');
    const html = await htmlResponse.text();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const taskContent = tempDiv.querySelector('.create-task');
    getOverlayContent(overlayContent, taskContent, taskId, task);
}


async function getTaskContacts(task, taskId) {
  if (task?.contactsId) {
    renderSelectedContactsFromApi(task, taskId)
  } else {
    return;
  }
}


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


async function allAddTaskScripts() {
    await loadScriptOnce('add-task-script', '../scripts/add-task.js');
    await loadScriptOnce('add-task-sub-menu-script', '../scripts/add-task-sub-menus.js');
    await loadScriptOnce('add-task-template-script', '../scripts/templates/add-task-template.js');
}


function getOverlayContent(overlayContent, taskContent, taskId, task) {
  overlayContent.innerHTML = '';
  overlayContent.appendChild(taskContent.cloneNode(true));
  const innerContainer = document.createElement('div');
  innerContainer.id = 'edit-task-btn-div';
  innerContainer.classList.add('edit-extra');
  overlayContent.appendChild(innerContainer);
  innerContainer.innerHTML += editandResetTaskBtnTemplate(taskId, task);
}


function getTaskPriority(task) {
  const urgentButton = document.getElementById('urgent-priority-btn');
  const mediumButton = document.getElementById('medium-priority-btn');
  const lowButton = document.getElementById('low-priority-btn');
  getPriorityFromTaskApi(urgentButton, mediumButton, lowButton, task)
  urgentButton.addEventListener('click', () => togglePriorityBtn(urgentButton));
  mediumButton.addEventListener('click', () => togglePriorityBtn(mediumButton));
  lowButton.addEventListener('click', () => togglePriorityBtn(lowButton));
}


function getPriorityFromTaskApi(urgentButton, mediumButton, lowButton, task) {
    if (task.priorityLevel === 'urgent') {
    urgentButton.classList.add('priority-urgent-active');
    urgentButton.classList.remove('priority-urgent-default');
  }
  else if (task.priorityLevel === 'medium') {
    mediumButton.classList.add('priority-medium-active');
    mediumButton.classList.remove('priority-medium-default');
  }
  else if (task.priorityLevel === 'low') {
    lowButton.classList.add('priority-low-active');
    lowButton.classList.remove('priority-low-default');
  };
}


function getTaskContent(task, taskId) {
  document.getElementById('task-title').value = task.title || '';
  document.getElementById('task-description').value = task.description || '';
  document.getElementById('task-due-date').value = task.dueDate || '';
  document.getElementById('input-category').innerText = task.category || '';
  const newSubtaskInput = document.getElementById('task-subtasks');
  newSubtaskInput.addEventListener('click', () => showSubtaskPicks(taskId));
  getSubtasks(task, taskId);
}


function showSubtaskPicks(taskId) {
    const subtaskPicks = document.getElementById('delete-or-keep-subtask');
    const addSubtaskSvg = document.getElementById('add-subtask-svg');
    subtaskPicks.classList.remove('d-none');
    addSubtaskSvg.addEventListener('click', () => getNewSubtaskToApi(taskId));
}


function getSubtasks(task, taskId) {
  const subtasksList = document.getElementById('selected-subtasks');
  subtasksList.innerHTML = '';
  if (task.subtasks && task.subtasks.length > 0) {
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


async function getNewSubtaskToApi(taskId) {
  const subtaskInput = document.getElementById('task-subtasks').value.trim();
  if (!subtaskInput) {
    alert('Bitte gib eine Subtask-Beschreibung ein.');
    return;
  }
  await getSubtasksFromApi(subtaskInput, taskId);
}


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
    console.error('❌ Fehler beim Laden des Subtasks:', error);
  }
}


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


function toggleBoxChecked(checkbox) {
  const isChecked = checkbox.classList.toggle('checked');
  checkbox.classList.toggle('unchecked', !isChecked);
  checkbox.innerHTML = isChecked ? checkedBox : uncheckedBox;
}
