const urgentBoardSvg = `<svg id="urgent-svg" width="20" height="17" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <g>
                          <path d="M19.6528 9.25471C19.4182 9.25511 19.1896 9.18026 19.0007 9.04117L10.7487 2.958L2.49663 9.04117C2.38078 9.12673 2.24919 9.18866 2.10939 9.22341C1.96959 9.25816 1.82431 9.26506 1.68184 9.2437C1.53937 9.22235 1.40251 9.17316 1.27906 9.09895C1.15562 9.02474 1.04801 8.92697 0.96238 8.8112C0.876751 8.69544 0.814779 8.56395 0.780002 8.42425C0.745226 8.28455 0.738325 8.13938 0.759696 7.99702C0.802855 7.7095 0.958545 7.4509 1.19252 7.27809L10.0966 0.707612C10.2853 0.56802 10.5139 0.492676 10.7487 0.492676C10.9835 0.492676 11.212 0.56802 11.4007 0.707612L20.3048 7.27809C20.4908 7.41501 20.6286 7.60712 20.6988 7.827C20.7689 8.04688 20.7678 8.28328 20.6955 8.50246C20.6232 8.72165 20.4834 8.9124 20.2962 9.04749C20.1089 9.18258 19.8837 9.25511 19.6528 9.25471Z" fill="#FF3D00"/>
                          <path d="M19.6528 9.25471C19.4182 9.25511 19.1896 9.18026 19.0007 9.04117L10.7487 2.958L2.49663 9.04117C2.38078 9.12673 2.24919 9.18866 2.10939 9.22341C1.96959 9.25816 1.82431 9.26506 1.68184 9.2437C1.53937 9.22235 1.40251 9.17316 1.27906 9.09895C1.15562 9.02474 1.04801 8.92697 0.96238 8.8112C0.876751 8.69544 0.814779 8.56395 0.780002 8.42425C0.745226 8.28455 0.738325 8.13938 0.759696 7.99702C0.802855 7.7095 0.958545 7.4509 1.19252 7.27809L10.0966 0.707612C10.2853 0.56802 10.5139 0.492676 10.7487 0.492676C10.9835 0.492676 11.212 0.56802 11.4007 0.707612L20.3048 7.27809C20.4908 7.41501 20.6286 7.60712 20.6988 7.827C20.7689 8.04688 20.7678 8.28328 20.6955 8.50246C20.6232 8.72165 20.4834 8.9124 20.2962 9.04749C20.1089 9.18258 19.8837 9.25511 19.6528 9.25471Z" fill="#FF3D00" transform="translate(0,07)"/>
                        </g>
                      </svg>`
const mediumBoardSvg = `<svg id="medium-svg" width="20" height="14.51" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <g>
                          <path d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z" fill="#FFA800" />
                          <path d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z" fill="#FFA800" transform="translate(0,07)"/>
                        </g>
                      </svg>`
const lowBoardSvg = ` <svg id="low-svg" width="20" height="14.51" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <path d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z" fill="#7AE229"/>
                          <path d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z" transform="translate(0,07)" fill="#7AE229"/>
                        </g>
                      </svg>`
const uncheckedBox = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                      </svg>`
const checkedBox = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                      <path d="M5 9L9 13L17 1.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>`
const taskInfoRef = document.getElementById('task-info');
const assigneeRef = document.getElementById('assignee');
const priorityRef = document.getElementById('priority');
let tasksCache = [];
let currentTaskId;
let currentSvg = uncheckedBox;

const boards = [
  { container: document.getElementById('new-task-div'), filler: document.getElementById('to-do-filler') },
  { container: document.getElementById('new-task-progress-div'), filler: document.getElementById('progress-filler') },
  { container: document.getElementById('new-task-feedback-div'), filler: document.getElementById('feedback-filler') },
  { container: document.getElementById('new-task-done-div'), filler: document.getElementById('done-filler') }
]

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

async function openAddTaskOverlay() {
  const overlayRef = document.getElementById('add-task-overlay');
  const overlayContentRef = document.getElementById('add-task-overlay-content');
  const overlayBackgroundRef = document.getElementById('overlay-background');
  overlayBackgroundRef.classList.remove('d-none');

  if (overlayContentRef.innerHTML.trim() === "") {
    const response = await fetch('add-task.html');
    const html = await response.text();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const content = tempDiv.querySelector('.add-task-content');
    overlayContentRef.appendChild(content.cloneNode(true));
    await loadScriptOnce('add-task-script', '../scripts/add-task.js');
    await loadScriptOnce('add-task-sub-menu-script', '../scripts/add-task-sub-menus.js');
    await loadScriptOnce('add-task-template-script', '../scripts/add-task-template.js');
  }
  const createTaskButton = document.getElementById("create-task-btn");
  createTaskButton.disabled = true;
  overlayRef.classList.add('show');
  overlayRef.classList.remove('hide');
  overlayRef.classList.remove('d-none');

  const mediumButton = document.getElementById('medium-priority-btn');
  mediumButton.classList.remove('priority-medium-default');
  mediumButton.classList.add('priority-medium-active');
  mediumButton.isActive = true;
  lowButton.classList.remove('priority-low-active');
  lowButton.classList.add('priority-low-default');
  lowButton.isActive = false;
  urgentButton.classList.remove('priority-urgent-active');
  urgentButton.classList.add('priority-urgent-default');
  urgentButton.isActive = false;
}

function closeOverlay() {
  const overlayRef = document.getElementById('add-task-overlay');
  overlayRef.classList.remove('show');
  overlayRef.classList.add('hide');
  const overlayBackgroundRef = document.getElementById('overlay-background');
  overlayBackgroundRef.classList.add('d-none');
  setTimeout(() => {
    overlayRef.classList.add('d-none');
  }, 600);
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

async function drop(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(taskId);
  const dropZone = event.currentTarget;

  dropZone.appendChild(draggedElement);

  let newStatus;
  switch (dropZone.id) {
    case "new-task-div":
      newStatus = "toDo";
      break;
    case "new-task-progress-div":
      newStatus = "inProgress";
      break;
    case "new-task-feedback-div":
      newStatus = "awaitingFeedback";
      break;
    case "new-task-done-div":
      newStatus = "done";
      break;
    default:
      newStatus = "toDo";
  }

  try {
    await fetch(`${BASE_URL}/tasks/${taskId}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
  } catch (error) {
    console.error("❌ Fehler beim Aktualisieren:", error);
  }
  loadTasks(taskId);
}

async function createTask() {
  await loadContactsWithoutRendering();

  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-description').value;
  const dueDate = document.getElementById('task-due-date').value;
  const category = document.getElementById('input-category').innerText;
  const status = "toDo";
  let priorityLevel = '';
  if (urgentButton.isActive) priorityLevel = 'urgent';
  else if (mediumButton.isActive) priorityLevel = 'medium';
  else if (lowButton.isActive) priorityLevel = 'low';
  const priorityValue = document.querySelector('.priority-urgent-active')
    ? urgentBoardSvg
    : document.querySelector('.priority-medium-active')
      ? mediumBoardSvg
      : document.querySelector('.priority-low-active')
        ? lowBoardSvg
        : '';

  let initialsArray = [];
  let namesArray = [];

  try {
    const initialsResponse = await fetch(`${BASE_URL}/tempContact/Initials.json`);
    const initialsData = await initialsResponse.json();
    const namesResponse = await fetch(`${BASE_URL}/tempContact/name.json`);
    const namesData = await namesResponse.json();

    if (initialsData && namesData) {
      Object.keys(initialsData).forEach(key => {
        if (namesData[key]) {
          initialsArray.push(initialsData[key]);
          namesArray.push(namesData[key]);
        }
      });
    }
  } catch (err) {
    console.error('Fehler beim Laden von tempContact:', err);
  }
  const newTask = {
    title,
    description,
    dueDate,
    category,
    subtasks,
    status,
    priorityValue,
    createdAt: new Date().toISOString(),
    priorityLevel,
    contactsInitials: initialsArray,
    contactsNames: namesArray
  };

  removeTempContactToAPI();

  try {
    const response = await fetch(`${BASE_URL}/tasks.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    });

    if (!response.ok) {
      throw new Error(`Fehler beim Speichern: ${response.status}`);
    }

    const data = await response.json();
    console.log('Task erfolgreich erstellt:', data);
    newTask.id = data.name;
    window.location.href = "../html/board.html";

  } catch (error) {
    console.error('Fehler beim Erstellen der Task:', error);
    alert('Fehler beim Speichern der Task. Bitte versuche es erneut.');
  }
  updateCategoryColor();
}

async function removeTempContactToAPI() {
  try {
    await fetch(`${BASE_URL}/tempContact.json`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Fehler beim Entfernen des Kontakts:", error);
  }
}

async function loadTasks(task) {
  const newTaskDiv = document.getElementById('new-task-div');
  const newTaskProgressDiv = document.getElementById('new-task-progress-div');
  const newTaskFeedbackDiv = document.getElementById('new-task-feedback-div');
  const newTaskDoneDiv = document.getElementById('new-task-done-div');
  newTaskDiv.innerHTML = '';
  newTaskProgressDiv.innerHTML = '';
  newTaskFeedbackDiv.innerHTML = '';
  newTaskDoneDiv.innerHTML = '';
  try {
    const response = await fetch(`${BASE_URL}/tasks.json`);
    if (!response.ok) throw new Error('Fehler beim Laden der Tasks');

    const data = await response.json();
    const tasksArray = data ? Object.entries(data).map(([taskId, task]) => {
      task.id = taskId;
      return task;
    }) : [];

    tasksArray.forEach((task, i) => {
      const taskElement = document.createElement('div');
      checkContactsLength (taskElement, task, task.id);
      taskElement.setAttribute("data-task-index", i);
      taskElement.setAttribute("onclick", `openTaskOverlay('${task.id}')`);
            let targetColumn;
      switch (task.status) {
        case 'inProgress':
          targetColumn = newTaskProgressDiv;
          break;
        case 'awaitingFeedback':
          targetColumn = newTaskFeedbackDiv;
          break;
        case 'done':
          targetColumn = newTaskDoneDiv;
          break;
        default:
          targetColumn = newTaskDiv;
      }
      targetColumn.appendChild(taskElement);
      updateProgressBar(task);
    });

    checkIfEmpty(tasksArray);
    updateCategoryColor();

  } catch (error) {
    console.error('Fehler beim Laden der Tasks:', error);
  }
}

function checkContactsLength(taskElement, task, taskId) {
  let selectedContactsComplete = '';

  if (!task.contactsInitials) task.contactsInitials = [];
  if (task.contactsInitials.length <= 3) {
    task.contactsInitials.forEach(contact => {
      selectedContactsComplete += `
        <div class="selected-contacts-svg">
          ${contact.svg || contact.initials || ''}
        </div>`;
    });
  } else {
    for (let i = 0; i < 3; i++) {
      const contact = task.contactsInitials[i];
      selectedContactsComplete += `
        <div class="selected-contacts-svg">
          ${contact.svg || contact.initials || ''}
        </div>`;
    }
    const extraInitials = task.contactsInitials.slice(3);
    selectedContactsComplete += showMoreContacts(extraInitials);
  }
  boardTaskTemplate(taskElement, task, taskId, selectedContactsComplete);

}

async function openTaskOverlay(taskId) {
  const overlay = document.getElementById('task-overlay');
  const overlayContent = document.getElementById('task-overlay-content');

  try {
    const response = await fetch(`${BASE_URL}/tasks.json`);
    if (!response.ok) throw new Error('Fehler beim Laden der Tasks');

    const data = await response.json();
    const task = data[taskId];

    if (!task) {
      console.warn(`❌ Task mit ID ${taskId} nicht gefunden.`);
      return;
    }
    overlayContent.innerHTML = boardTaskOverlayTemplate(task, taskId);
    overlay.classList.remove('d-none');
    overlayContent.classList.remove('d-none');

    setTimeout(() => {
      overlay.classList.add('active');
      overlayContent.classList.add('active');
    }, 10);

    updateCategoryColor();
  } catch (error) {
    console.error('Fehler beim Öffnen des Task-Overlays:', error);
    alert('Task konnte nicht geladen werden.');
  }
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

    if (taskInfo) taskInfo.classList.toggle('d-none', !hasDetails);
    if (taskContent) taskContent.classList.toggle('d-none', !hasContent);
    if (taskStatus) taskStatus.classList.toggle('d-none', !hasSubtasks);
  });
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
    console.error('Fehler beim Löschen der Task:', error);
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

  try {
    const response = await fetch(`${BASE_URL}/tasks.json`);
    const data = await response.json();
    const task = data[taskId];
    if (!task) throw new Error(`Task mit ID ${taskId} nicht gefunden`);

    const htmlResponse = await fetch('../html/add-task.html');
    const html = await htmlResponse.text();

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const taskContent = tempDiv.querySelector('.create-task');
    getOverlayContent(overlayContent, taskContent);
    await loadScriptOnce('add-task-script', '../scripts/add-task.js');
    await loadScriptOnce('add-task-sub-menu-script', '../scripts/add-task-sub-menus.js');
    await loadScriptOnce('add-task-template-script', '../scripts/add-task-template.js');
    getTaskPriority(task);
    getTaskContent(task);
    overlay.classList.remove('d-none');
    overlay.classList.add('active');

  } catch (error) {
    console.error('❌ Fehler beim Öffnen des Edit-Overlays:', error);
    alert('Task konnte nicht geladen werden.');
  }
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

  urgentButton.addEventListener('click', () => togglePriorityBtn(urgentButton));
  mediumButton.addEventListener('click', () => togglePriorityBtn(mediumButton));
  lowButton.addEventListener('click', () => togglePriorityBtn(lowButton));

}

function getTaskContent(task) {
  document.getElementById('task-title').value = task.title || '';
  document.getElementById('task-description').value = task.description || '';
  document.getElementById('task-due-date').value = task.dueDate || '';
  document.getElementById('input-category').innerText = task.category || '';
  const subtasksList = document.getElementById('selected-subtasks');
  subtasksList.innerHTML = '';
  if (task.subtasks && task.subtasks.length > 0) {
    let checkedSubtasks = task.checkedSubtasks || [];
    if (!Array.isArray(checkedSubtasks)) {
      checkedSubtasks = Object.values(checkedSubtasks);
    }
    checkedSubtasks = checkedSubtasks.flat();
    task.subtasks.forEach(subtask => {
      const isChecked = checkedSubtasks.includes(subtask);
      const checkboxClass = isChecked ? 'checked' : 'unchecked';
      const checkboxIcon = isChecked ? checkedBox : uncheckedBox;
      subtasksList.innerHTML += showApiSubtask(checkboxClass, checkboxIcon, subtask, subtasksList);
    });
  }
}

function showApiSubtask(checkboxClass, checkboxIcon, subtask) {
    return `
    <div class="subtasks-list-api">
      <li>
        <div class="checkbox-subtasks ${checkboxClass}" onclick="toggleBoxChecked(this)">
          ${checkboxIcon}
        </div>
        <p>${subtask}</p>
        <div class="delete-or-edit-icons">
          <svg onclick="editApiSubtask('${subtask}', document.getElementById('selected-subtasks'))" class="edit-svg" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_75592_9969" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
              <rect x="0.144531" width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_75592_9969)">
              <path d="M5.14453 19H6.54453L15.1695 10.375L13.7695 8.975L5.14453 17.6V19ZM19.4445 8.925L15.1945 4.725L16.5945 3.325C16.9779 2.94167 17.4487 2.75 18.007 2.75C18.5654 2.75 19.0362 2.94167 19.4195 3.325L20.8195 4.725C21.2029 5.10833 21.4029 5.57083 21.4195 6.1125C21.4362 6.65417 21.2529 7.11667 20.8695 7.5L19.4445 8.925ZM17.9945 10.4L7.39453 21H3.14453V16.75L13.7445 6.15L17.9945 10.4Z" fill="#2A3647"/>
            </g>
          </svg>
          <svg onclick="deleteSubtaskFromList()" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_75592_9951" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
              <rect x="0.144531" width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_75592_9951)">
              <path d="M7.14453 21C6.59453 21 6.1237 20.8042 5.73203 20.4125C5.34036 20.0208 5.14453 19.55 5.14453 19V6C4.8612 6 4.6237 5.90417 4.43203 5.7125C4.24036 5.52083 4.14453 5.28333 4.14453 5C4.14453 4.71667 4.24036 4.47917 4.43203 4.2875C4.6237 4.09583 4.8612 4 5.14453 4H9.14453C9.14453 3.71667 9.24036 3.47917 9.43203 3.2875C9.6237 3.09583 9.8612 3 10.1445 3H14.1445C14.4279 3 14.6654 3.09583 14.857 3.2875C15.0487 3.47917 15.1445 3.71667 15.1445 4H19.1445C19.4279 4 19.6654 4.09583 19.857 4.2875C20.0487 4.47917 20.1445 4.71667 20.1445 5C20.1445 5.28333 20.0487 5.52083 19.857 5.7125C19.6654 5.90417 19.4279 6 19.1445 6V19C19.1445 19.55 18.9487 20.0208 18.557 20.4125C18.1654 20.8042 17.6945 21 17.1445 21H7.14453ZM7.14453 6V19H17.1445V6H7.14453ZM9.14453 16C9.14453 16.2833 9.24036 16.5208 9.43203 16.7125C9.6237 16.9042 9.8612 17 10.1445 17C10.4279 17 10.6654 16.9042 10.857 16.7125C11.0487 16.5208 11.1445 16.2833 11.1445 16V9C11.1445 8.71667 11.0487 8.47917 10.857 8.2875C10.6654 8.09583 10.4279 8 10.1445 8C9.8612 8 9.6237 8.09583 9.43203 8.2875C9.24036 8.47917 9.14453 8.71667 9.14453 9V16ZM13.1445 16C13.1445 16.2833 13.2404 16.5208 13.432 16.7125C13.6237 16.9042 13.8612 17 14.1445 17C14.4279 17 14.6654 16.9042 14.857 16.7125C15.0487 16.5208 15.1445 16.2833 15.1445 16V9C15.1445 8.71667 15.0487 8.47917 14.857 8.2875C14.6654 8.09583 14.4279 8 14.1445 8C13.8612 8 13.6237 8.09583 13.432 8.2875C13.2404 8.47917 13.1445 8.71667 13.1445 9V16Z" fill="#2A3647"/>
            </g>
          </svg>
        </div>
      </li>
    </div>`;
}

function editApiSubtask(subtasks, subtasksList) {
  subtasksList.innerHTML = '';
  if (!Array.isArray(subtasks)) {
    subtasks = [subtasks]; // Sicherstellen, dass es ein Array ist
  }
  for (let i = 0; i < subtasks.length; i++) {
    subtasksList.innerHTML += showApiSubtaskToEdit(subtasks[i], i);
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

  const updatedTask = {
    title: document.getElementById('task-title').value,
    description: document.getElementById('task-description').value,
    dueDate: document.getElementById('task-due-date').value,
    category: document.getElementById('input-category').innerText,
    priorityValue,
    priorityLevel
  };

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

  await pushCheckedSubtasks(taskId);
  closeTaskOverlay();
  loadTasks(updatedTask);
}
