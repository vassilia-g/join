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
let overlayResizeHandler = null;


/** 
 * Return to add-task page on small screens or show overlay on large screens 
 */
function openAddTaskInstedOverlay() {
  const overlayBackground = document.getElementById('overlay-background');
  const content = document.getElementById('add-task-overlay');
  if (!overlayBackground || !content) return;
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
 * Lazily create the resize handler used while the add-task overlay is open.
 */
function ensureOverlayResizeHandler() {
  if (!overlayResizeHandler) {
    overlayResizeHandler = () => openAddTaskInstedOverlay();
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
  ensureOverlayResizeHandler();
  if (overlayResizeHandler) window.addEventListener('resize', overlayResizeHandler);
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
    changeClassesAfterInsert(overlayContentRef);
    await loadScriptOnce('add-task-script', '../scripts/add-task.js');
    await loadScriptOnce('add-task-sub-menu-script', '../scripts/add-task-sub-menus.js');
    await loadScriptOnce('add-task-template-script', '../scripts/templates/add-task-template.js');
  }
}


/**
 * Adjust class names of the injected add-task markup so it matches the board overlay styling.
 * @param {HTMLElement} overlayContentRef - Container that now holds the cloned add-task content.
 */
function changeClassesAfterInsert(overlayContentRef) {
  changeClassesOfaddTaskContentAndCreateTaskDiv(overlayContentRef);
  changeClassesOfAddTAskTitleAndTaskFooter(overlayContentRef);
  changeClassesOfMainInfoAndAdiitionalInfo(overlayContentRef);
}


/**
 * Replace the generic add-task layout classes with board-specific variants.
 * @param {HTMLElement} overlayContentRef - Container used to query the relevant elements.
 */
function changeClassesOfaddTaskContentAndCreateTaskDiv(overlayContentRef) {
  const addTaskContent = overlayContentRef.querySelector('.add-task-content');
  if (addTaskContent) {
    addTaskContent.classList.remove('add-task-content');
    addTaskContent.classList.add('add-task-content-board');
  }
  const createTaskDiv = overlayContentRef.querySelector('.create-task');
  if (createTaskDiv) {
    createTaskDiv.classList.remove('create-task');
    createTaskDiv.classList.add('board-create-task');
  }
}


/**
 * Update the add-task title and footer blocks so they inherit board-specific styles.
 * @param {HTMLElement} overlayContentRef - Container used to query the cloned DOM nodes.
 */
function changeClassesOfAddTAskTitleAndTaskFooter(overlayContentRef) {
  const addTaskTitle = overlayContentRef.querySelector('.add-task-title');
  if (addTaskTitle) {
    addTaskTitle.classList.remove('add-task-title');
    addTaskTitle.classList.add('board-task-title');
  }
  const taskFooter = overlayContentRef.querySelector('.task-footer');
  if (taskFooter) {
    taskFooter.classList.remove('task-footer');
    taskFooter.classList.add('board-footer');
  }
}


/**
 * Apply board specific classes to the main and additional info containers within the overlay.
 * @param {HTMLElement} overlayContentRef - Container used to look up the info sections.
 */
function changeClassesOfMainInfoAndAdiitionalInfo(overlayContentRef) {
  const mainInfo = overlayContentRef.querySelector('.task-main-info');
  if (mainInfo) {
    mainInfo.classList.add('task-main-info-board');
  }
  const additionalInfo = overlayContentRef.querySelector('.task-additional-info');
  if (additionalInfo) {
    additionalInfo.classList.add('task-additional-info-board');
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
  const o = document.getElementById('add-task-overlay');
  o.classList.remove('show'); o.classList.add('hide');
  document.getElementById('overlay-background').classList.add('d-none');
  setTimeout(() => { o.classList.add('d-none'); clearTask(); }, 600);
  document.querySelectorAll(".field-warning").forEach(w => w.classList.add('d-none'));
  document.querySelectorAll(".input-border-size").forEach(e => e.classList.remove('error'));
  if (overlayResizeHandler) {
    window.removeEventListener('resize', overlayResizeHandler);
    overlayResizeHandler = null;
  }
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
  const taskId = event.currentTarget?.id || event.target.id;
  if (!taskId) return;
  event.dataTransfer.setData("text", taskId);
  event.dataTransfer.effectAllowed = "move";
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
function getHoverEffect(){
  document.querySelectorAll('.drop-div').forEach(z=>{
    let p;
    z.addEventListener('dragover',e=>{e.preventDefault();if(!p)p=createPlaceholder(z);});
    z.addEventListener('dragleave',e=>{if(!z.contains(e.relatedTarget)&&p)p.remove(),p=null;});
    z.addEventListener('drop',async e=>{
      e.preventDefault();
      const el=document.getElementById(e.dataTransfer.getData("text"));
      if(p)p.remove();
      z.appendChild(el);
      await switchStatus(z,el.id);
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
      newStatus = "toDo"; break;
    case "new-task-progress-div":
      newStatus = "inProgress"; break;
    case "new-task-feedback-div":
      newStatus = "awaitingFeedback"; break;
    case "new-task-done-div":
      newStatus = "done"; break;
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
