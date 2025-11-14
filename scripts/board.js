/**
 * @fileoverview Contains SVG templates and global references for the Task Board.
 * These variables are used to dynamically manage icons, UI states, 
 * and DOM elements within the Board view.
 */
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


/**
 * Global DOM references and state variables used throughout the Board view.
 * Includes element selectors, task cache handling, page detection, 
 * and task editing state management.
 */
const taskInfoRef = document.getElementById('task-info');
const assigneeRef = document.getElementById('assignee');
const priorityRef = document.getElementById('priority');
const inputElement = document.getElementById('board-search-input');
let tasksCache = [];
let currentSvg = uncheckedBox;
const currentPage = window.location.pathname.split('/').pop();
let isEditingTask = false;
let currentEditTaskId = null;


/** 
 * Return to add-task page on small screens or show overlay on large screens 
 */
function openAddTaskInstedOverlay() {
  const overlayBackground = document.getElementById('overlay-background');
  const content = document.getElementById('add-task-overlay');
  if (window.innerWidth < 1360) {
    overlayBackground.style.display = "none";
    content.style.display = "none";
    window.location.href = "../html/add-task.html";
  } else {
    overlayBackground.style.display = "flex";
    content.style.display = "flex";
  }
}


/** 
 * Open add-task overlay, load content and initialize controls 
 */
async function openAddTaskOverlay() {
  openAddTaskInstedOverlay();
  const overlayRef = document.getElementById('add-task-overlay');
  const overlayContentRef = document.getElementById('add-task-overlay-content');
  const overlayBackgroundRef = document.getElementById('overlay-background');
  overlayBackgroundRef.classList.remove('d-none');
  await getAddTaskContent(overlayContentRef);
  const createTaskButton = document.getElementById("create-task-btn");
  createTaskButton.disabled = true;
  showOverlay(overlayRef);
  getMediumForDefault();
  getContactDropdown();
  getSubtaskRef();
  refreshBoard()
}


/** 
 * Load add-task HTML fragment and required scripts once 
 */
async function getAddTaskContent(overlayContentRef) {
  if (overlayContentRef.innerHTML.trim() === "") {
    const response = await fetch('add-task.html');
    const html = await response.text();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const content = tempDiv.querySelector('.add-task-content');
    overlayContentRef.appendChild(content.cloneNode(true));
    await loadScriptOnce('add-task-script', '../scripts/add-task.js');
    await loadScriptOnce('add-task-sub-menu-script', '../scripts/add-task-sub-menus.js');
    await loadScriptOnce('add-task-template-script', '../scripts/templates/add-task-template.js');
  }
}


/** 
 * Show overlay element (make visible) 
 */
function showOverlay(overlayRef) {
  overlayRef.classList.add('show');
  overlayRef.classList.remove('hide');
  overlayRef.classList.remove('d-none');
}


/** 
 * Set medium priority as default in UI buttons 
 */
function getMediumForDefault() {
  const urgentButton = document.getElementById('urgent-priority-btn');
  const mediumButton = document.getElementById('medium-priority-btn');
  const lowButton = document.getElementById('low-priority-btn');
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


/** 
 * Prepare contact dropdown data for add-task overlay 
 */
async function getContactDropdown() {
  let { tasksArray, contactsArray } = await getContactsAndTask();
  contactsArray = getContactsInitials(contactsArray);
  const assignContacts = document.getElementById('assign-contacts');

}


/** 
 * Attach subtask add handler to SVG control 
 */
function getSubtaskRef() {
  const addSubtaskSvgs = document.getElementById('add-subtask-svg');
  addSubtaskSvgs.onclick = null;
}


/** 
 * Wire create-task button to createTask and close overlay 
 */
function refreshBoard() {
  const createTaskButton = document.getElementById("create-task-btn");
  createTaskButton.onclick = async () => {
    closeOverlay();
    await createTask();
  };
}


/** 
 * Hide overlay with exit animation 
 */
function closeOverlay() {
  const overlayRef = document.getElementById('add-task-overlay');
  overlayRef.classList.remove('show');
  overlayRef.classList.add('hide');
  const overlayBackgroundRef = document.getElementById('overlay-background');
  overlayBackgroundRef.classList.add('d-none');
  setTimeout(() => {
    overlayRef.classList.add('d-none');
    clearTask();
  }, 600);
  let warnings = document.querySelectorAll(".field-warning");
  warnings.forEach(warning => warning.classList.add('d-none'));
  let error = document.querySelectorAll(".input-border-size");
  error.forEach(errors => errors.classList.remove('error'));
}


/** 
 * Allow dropping by preventing default 
 */
function allowDrop(event) {
  event.preventDefault();
}


/** 
 * Set drag data when drag starts 
 */
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}


/** 
 * Handle drop: move element into drop zone and update status 
 */
async function drop(event) {
  event.preventDefault();

  const taskId = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(taskId);
  const dropZone = event.currentTarget;

  dropZone.appendChild(draggedElement);
  const placeholder = document.getElementById(`placeholder-${dropZone.id}`)
  if (placeholder) placeholder.classList.add('d-none');
  await switchStatus(dropZone, taskId);
}


document.addEventListener('DOMContentLoaded', getHoverEffect);

/** 
 * Create a visual placeholder element inside a drop zone 
 */
function createPlaceholder(zone) {
  const p = document.createElement('div');
  p.classList.add('placeholder-drag-and-drop');
  zone.appendChild(p);
  return p;
}


/** 
 * Add hover/drag UI feedback and placeholder management for drop zones 
 */
function getHoverEffect() {
  document.querySelectorAll('.drop-div').forEach((zone) => {
    let placeholder;
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!placeholder) placeholder = createPlaceholder(zone);
    });
    zone.addEventListener('dragleave', (e) => {
      if (!zone.contains(e.relatedTarget) && placeholder) placeholder.remove(), placeholder = null;
    });
    zone.addEventListener('drop', async (e) => {
      e.preventDefault();
      const el = document.getElementById(e.dataTransfer.getData("text"));
      if (placeholder) placeholder.remove();
      zone.appendChild(el);
      await switchStatus(zone, el.id);
    });
  });
}


/** 
 * Map drop zone id to task status and push update 
 */
async function switchStatus(dropZone, taskId) {
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
  await pushStatusToApi(newStatus, taskId)
}


/** 
 * Send status patch to backend and reload tasks 
 */
async function pushStatusToApi(newStatus, taskId) {
  try {
    await patchData(`tasks/${taskId}`, { status: newStatus });
  } catch (error) {
    console.error("Fehler beim Aktualisieren:", error);
  }
  await loadTasks();
}


/** 
 * Load tasks from backend and render them 
 */
async function loadTasks(taskId = null) {
  getStatusPosition();
  let tasksData = await getData('tasks/') || {};
  let tasksArray;
  if (taskId) {
    tasksArray = tasksData[taskId] ? [{ id: taskId, ...tasksData[taskId] }] : [];
  } else {
    tasksArray = Object.entries(tasksData).map(([id, task]) => ({ id, ...task }));
  }
  createElementForTaskArray(tasksArray);
}


/** 
 * Clear and return column container references 
 */
function getStatusPosition() {
  const { newTaskDiv, newTaskProgressDiv, newTaskFeedbackDiv, newTaskDoneDiv } = getBoardContainers();
  clearBoardContainers(newTaskDiv, newTaskProgressDiv, newTaskFeedbackDiv, newTaskDoneDiv);
  return { newTaskDiv, newTaskProgressDiv, newTaskFeedbackDiv, newTaskDoneDiv };
}


/** 
 * Create DOM elements for each task and place them in columns 
 */
function createElementForTaskArray(tasksArray) {
  const { newTaskDiv, newTaskProgressDiv, newTaskFeedbackDiv, newTaskDoneDiv } = getStatusPosition();
  tasksArray.forEach(task => {
    const taskElement = document.createElement('div');
    checkContactsLength(taskElement, task, task.id);
    taskElement.setAttribute("data-task-index", task.id);
    taskElement.setAttribute("onclick", `openTaskOverlay('${task.id}')`);
    getTargetColumn(newTaskDiv, newTaskProgressDiv, newTaskFeedbackDiv, newTaskDoneDiv, taskElement, task);
    updateProgressBar(task);
  });
  updateCategoryColor();
  checkIfEmpty(tasksArray);
}


/** 
 * Collect inputs, contacts and priority then push new task to API 
 */
async function createTask() {
  const taskInputs = await getTaskInputs();
  const priority = await getPriorityFromTask();
  const { initialsArray, namesArray, colorArray, idArray } = await getContactsFromArray();
  const newTask = {
    ...taskInputs,
    ...priority,
    subtasks,
    createdAt: new Date().toISOString(),
    contactsInitials: initialsArray,
    contactsNames: namesArray,
    contactsColor: colorArray,
    contactsId: idArray
  };
  await pushNewTaskToApi(newTask);
}


/** 
 * Read task input fields from overlay 
 */
async function getTaskInputs() {
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-description').value;
  const dueDate = document.getElementById('task-due-date').value;
  const category = document.getElementById('input-category').innerText;
  const status = "toDo";
  return { title, description, dueDate, category, status };
}


/** 
 * Build contact arrays from checkedContacts and reset selection 
 */
async function getContactsFromArray() {
  const initialsArray = checkedContacts.map(c => getInitials(c.name));
  const namesArray = checkedContacts.map(c => c.name);
  const colorArray = checkedContacts.map(c => c.color);
  const idArray = checkedContacts.map(c => c.id);
  checkedContacts = [];
  return { initialsArray, namesArray, colorArray, idArray };
}


/** 
 * Determine priority level and SVG for task 
 */
async function getPriorityFromTask() {
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
  return { priorityLevel, priorityValue };
}


/** 
 * POST new task to backend and redirect to board 
 */
async function pushNewTaskToApi(newTask) {
  try {
    const data = await postData('tasks', newTask);
    if (data && data.name) newTask.id = data.name;
    window.location.href = "../html/board.html";
  } catch (error) {
    alert('Fehler beim Speichern der Task. Bitte versuche es erneut.');
  }
}


/** 
 * Clear columns and fetch filtered tasks by text 
 */
function filterTasksByText(text) {
  const { newTaskDiv, newTaskProgressDiv, newTaskFeedbackDiv, newTaskDoneDiv } = getBoardContainers();
  clearBoardContainers(newTaskDiv, newTaskProgressDiv, newTaskFeedbackDiv, newTaskDoneDiv);
  getTaskfromApiForArrayByText(text, newTaskDiv, newTaskProgressDiv, newTaskFeedbackDiv, newTaskDoneDiv);
}


/** 
 * Return references to the four task column containers 
 */
function getBoardContainers() {
  return {
    newTaskDiv: document.getElementById('new-task-div'),
    newTaskProgressDiv: document.getElementById('new-task-progress-div'),
    newTaskFeedbackDiv: document.getElementById('new-task-feedback-div'),
    newTaskDoneDiv: document.getElementById('new-task-done-div')
  };
}


/** 
 * Empty given container elements safely 
 */
function clearBoardContainers(...containers) {
  containers.forEach(c => {
    if (c) c.innerHTML = '';
  });
}


/** 
 * Fetch tasks, filter by text and render filtered array 
 */
async function getTaskfromApiForArrayByText(text, newTaskDiv, newTaskProgressDiv, newTaskFeedbackDiv, newTaskDoneDiv) {
  try {
    const data = await getData('tasks');
    const tasksArray = data ? Object.entries(data).map(([taskId, task]) => {
      task.id = taskId;
      return task;
    }) : [];
    const query = (text || '').toString().trim().toLowerCase();
    const filtered = query === ''
      ? tasksArray
      : tasksArray.filter(t => {
        const title = (t.title || '').toLowerCase();
        const description = (t.description || '').toLowerCase();
        return title.includes(query) || description.includes(query);
      });
    createElementForTaskArray(filtered, newTaskDiv, newTaskProgressDiv, newTaskFeedbackDiv, newTaskDoneDiv);
  } catch (error) {
    console.error('Fehler beim Laden der Tasks:', error);
  }
}


/** 
 * Decide which column a task belongs to and append DOM element 
 */
function getTargetColumn(newTaskDiv, newTaskProgressDiv, newTaskFeedbackDiv, newTaskDoneDiv, taskElement, task) {
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
}


/** 
 * Return a debounced wrapper of a function to limit call rate 
 */
function debounce(fn, wait = 500) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}
