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


function getOverlayContentWithTask(task,taskId) {
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
  tasks.forEach((task, i) => {
    const taskElement = document.querySelector(`[data-task-index="${i}"]`);
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
    const response = await fetch(`${BASE_URL}/tasks/${taskId}.json`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Fehler beim Löschen der Task');
    loadTasks();
    closeTaskOverlay();
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
  currentTaskId = taskId;
  const overlay = document.getElementById('task-overlay');
  const overlayContent = document.getElementById('task-overlay-content');
  await getTaskContentFromApi(overlay, overlayContent, taskId); 
}


async function getTaskContentFromApi(overlay, overlayContent, taskId) {
  try {
    const response = await fetch(`${BASE_URL}/tasks.json`);
    const data = await response.json();
    const task = data[taskId];
    if (!task) throw new Error(`Task mit ID ${taskId} nicht gefunden`);
    await getAddTaskInput(taskId, overlayContent)
    await allAddTaskScripts();
    getTaskPriority(task);
    getTaskContent(task, taskId);
    getTaskContacts(task, taskId);
    overlay.classList.remove('d-none');
    overlay.classList.add('active');
  } catch (error) {
    alert('Task konnte nicht geladen werden.');
  }
}


async function getAddTaskInput(taskId, overlayContent) {
  const htmlResponse = await fetch('../html/add-task.html');
    const html = await htmlResponse.text();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const taskContent = tempDiv.querySelector('.create-task');
    getOverlayContent(overlayContent, taskContent, taskId);
}


function getTaskContacts(task, taskId) {
  const contactsToSelect = document.getElementById('contacts-to-select');
  const dropdownIcon = document.getElementById('dropdown-icon');
  const selectedContacts = document.getElementById('selected-contacts');
  dropdownIcon.addEventListener('click', () => openDropdownContacts(contactsToSelect, selectedContacts));
}


async function allAddTaskScripts() {
    await loadScriptOnce('add-task-script', '../scripts/add-task.js');
    await loadScriptOnce('add-task-sub-menu-script', '../scripts/add-task-sub-menus.js');
    await loadScriptOnce('add-task-template-script', '../scripts/add-task-template.js');
}


function getOverlayContent(overlayContent, taskContent) {
  overlayContent.innerHTML = '';
  overlayContent.appendChild(taskContent.cloneNode(true));
  const innerContainer = document.createElement('div');
  innerContainer.id = 'edit-task-btn-div';
  innerContainer.classList.add('edit-extra');
  overlayContent.appendChild(innerContainer);
  innerContainer.innerHTML += editTaskBtnTemplate();
}


function getTaskPriority(task) {
  const urgentButton = document.getElementById('urgent-priority-btn');
  const mediumButton = document.getElementById('medium-priority-btn');
  const lowButton = document.getElementById('low-priority-btn');

  getPriorityFromTask(urgentButton, mediumButton, lowButton, task)

  urgentButton.addEventListener('click', () => togglePriorityBtn(urgentButton));
  mediumButton.addEventListener('click', () => togglePriorityBtn(mediumButton));
  lowButton.addEventListener('click', () => togglePriorityBtn(lowButton));
}


function getPriorityFromTask(urgentButton, mediumButton, lowButton, task) {
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
  newSubtaskInput.addEventListener('click', () => showSubtaskPicks(task, taskId));
  getSubtasks(task, taskId);
}


function showSubtaskPicks(task, taskId) {
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
    await fetch(`${BASE_URL}/tasks/${taskId}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
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


 async function checkEditedApiSubtask(taskId, subtaskIndex) {
  const inputValue = document.getElementById('edit-input').value;
  console.log(subtaskIndex);
  try {
    const response = await fetch(`${BASE_URL}/tasks.json`);
    const data = await response.json();
    const task = data[taskId];
    if (!task) throw new Error(`Task mit ID ${taskId} nicht gefunden`);
    checkIfSubtaskWasEdited(task, inputValue, subtaskIndex, taskId);
    getSubtasks(task, taskId);    
  } catch (error) {
    console.error('❌ Fehler beim Öffnen des Edit-Overlays:', error);
    alert('Task konnte nicht geladen werden.');
  }
}


async function deleteSubtaskFromApi(taskId, subtaskIndex) {
  try {
    const response = await fetch(`${BASE_URL}/tasks.json`);
    const data = await response.json();
    const task = data[taskId];
    if (!task) throw new Error(`Task mit ID ${taskId} nicht gefunden`);
    if (!Array.isArray(task.subtasks)) {
      return;
    }
    task.subtasks.splice(subtaskIndex, 1);
    await fetch(`${BASE_URL}/tasks/${taskId}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    getSubtasks(task, taskId);
  } catch (error) {
    alert('Subtask konnte nicht gelöscht werden.');
  }   
}


async function checkIfSubtaskWasEdited(task, input, subtaskIndex, taskId) {
  const oldValue = task.subtasks[subtaskIndex];
  if (oldValue === input) {
    console.log('🟢 Keine Änderung am Subtask.');
    return;
  }
  console.log(`✏️ Subtask geändert: "${oldValue}" → "${input}"`);
  task.subtasks[subtaskIndex] = input;
  try {
    await fetch(`${BASE_URL}/tasks/${taskId}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });

  } catch (error) {
    alert('Subtask konnte nicht gespeichert werden.');
  }
}


function toggleBoxChecked(checkbox) {
  const isChecked = checkbox.classList.toggle('checked');
  checkbox.classList.toggle('unchecked', !isChecked);
  checkbox.innerHTML = isChecked ? checkedBox : uncheckedBox;
}


async function pushCheckedSubtasks(taskId) {
  const subtasksList = document.getElementById('selected-subtasks');
  if (!subtasksList) return;
  const subtasksItems = subtasksList.querySelectorAll('li');
  const checkedSubtasks = [];
  subtasksItems.forEach(li => {
    const checkboxDiv = li.querySelector('.checkbox-subtasks');
    const subtaskText = li.querySelector('p').innerText.trim();
    if (checkboxDiv && checkboxDiv.classList.contains('checked')) {
      checkedSubtasks.push(subtaskText);
    }
  });
  await pushCheckedSubtasksToApi(taskId, checkedSubtasks);
}


async function pushCheckedSubtasksToApi(taskId, checkedSubtasks) {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}/checkedSubtasks.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subtasks: checkedSubtasks })
    });
    if (!response.ok) throw new Error("Fehler beim Pushen der Subtasks");
  } catch (error) {
    console.error('❌ Fehler beim Pushen der Subtasks:', error);
  }
}


function updateProgressBar(task) {
  const progressBar = document.getElementById(`progress-bar-${task.id}`);
  const total = task.subtasks?.length || 0;
  const done = task.checkedSubtasks?.subtasks?.length || 0;
  const getProgress = total > 0 ? (100 * done) / total : 0;
  progressBar.style.width = `${getProgress}%`;
}


async function updateTaskAfterEdit(taskId) {
  const urgentButton = document.getElementById('urgent-priority-btn');
  const mediumButton = document.getElementById('medium-priority-btn');
  const lowButton = document.getElementById('low-priority-btn');
  if (urgentButton.classList.contains('priority-urgent-active')) {
    priorityValue = urgentBoardSvg;
    priorityLevel = 'urgent';
  } else if (mediumButton.classList.contains('priority-medium-active')) {
    priorityValue = mediumBoardSvg;
    priorityLevel = 'medium';
  } else if (lowButton.classList.contains('priority-low-active')) {
    priorityValue = lowBoardSvg;
    priorityLevel = 'low';
  }
  await updateTaskWithPriority(priorityLevel, priorityValue, taskId);
  await pushCheckedSubtasks(taskId);
  closeTaskOverlay();
  loadTasks(updatedTask);
}


async function updateTaskWithPriority(priorityLevel, priorityValue, taskId) {
  const updatedTask = {
    title: document.getElementById('task-title').value,
    description: document.getElementById('task-description').value,
    dueDate: document.getElementById('task-due-date').value,
    category: document.getElementById('input-category').innerText,
    priorityValue,
    priorityLevel
  };
  await pushUpdatedTaskTpApi(updatedTask);
}


async function pushUpdatedTaskTpApi(updatedTask, taskId) {
    try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    if (!response.ok) throw new Error("Fehler beim Speichern der Neuerungen");
  } catch (error) {
    console.error('❌ Fehler beim Aktualisieren:', error);
  }
}
