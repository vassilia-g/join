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
    const card = taskElement.querySelector('.task') || taskElement;
    enableTaskDragHandlers(card, task.id);
  });
  updateCategoryColor();
  checkIfEmpty(tasksArray);
}


let touchDrag = null;


/**
 * Enable drag handlers for a task card, supporting both desktop and touch.
 * @param {HTMLElement} el - Task card element.
 * @param {string} taskId - ID of the task represented by the card.
 */
function enableTaskDragHandlers(el, taskId) {
  el.draggable = true;
  el.addEventListener('dragstart', drag);
  el.addEventListener('pointerdown', e => startTouchDrag(e, taskId));
  el.addEventListener('touchstart', e => startTouchDrag(e, taskId), { passive: false });
}


/**
 * Normalize pointer/touch events to a single coordinate object.
 * @param {PointerEvent|TouchEvent} event - Incoming pointer or touch event.
 * @returns {{x:number, y:number}} - Client coordinates of the interaction.
 */
function getEventPoint(event) {
  if (event.touches?.length) {
    return { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }
  if (event.changedTouches?.length) {
    return { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
  }
  return { x: event.clientX, y: event.clientY };
}


/**
 * Start tracking a touch drag interaction and attach move/end listeners.
 * @param {PointerEvent|TouchEvent} event - Pointer or touch start event.
 * @param {string} taskId - ID of the task being dragged.
 */
function startTouchDrag(event, taskId) {
  const isTouch = event.type.startsWith('touch') || event.pointerType === 'touch' || event.pointerType === 'pen';
  if (!isTouch) return;
  event.preventDefault();
  touchDrag = { taskId, element: document.getElementById(taskId), currentZone: null };
  document.addEventListener('pointermove', moveTouchDrag, { passive: false });
  document.addEventListener('pointerup', endTouchDrag);
  document.addEventListener('pointercancel', endTouchDrag);
  document.addEventListener('touchmove', moveTouchDrag, { passive: false });
  document.addEventListener('touchend', endTouchDrag);
  document.addEventListener('touchcancel', endTouchDrag);
}


/**
 * Update highlight as the finger/stylus moves across drop zones.
 * @param {PointerEvent|TouchEvent} event - Move event while dragging.
 */
function moveTouchDrag(event) {
  if (!touchDrag) return;
  event.preventDefault();
  const { x, y } = getEventPoint(event);
  const target = document.elementFromPoint(x, y);
  const zone = target && target.closest('.drop-div');
  document.querySelectorAll('.drop-div').forEach(div =>
    div.classList.toggle('drop-target', div === zone)
  );
  touchDrag.currentZone = zone;
}


/**
 * Finish the drag interaction, moving the task into the last hovered column.
 * @param {PointerEvent|TouchEvent} event - End/cancel event for the drag.
 */
async function endTouchDrag(event) {
  const dropZone = touchDrag?.currentZone;
  const draggedElement = touchDrag?.element;
  const draggedTaskId = touchDrag?.taskId;
  if (dropZone && draggedElement && draggedTaskId) {
    dropZone.appendChild(draggedElement);
    await switchStatus(dropZone, draggedTaskId);
    const placeholder = document.getElementById(`placeholder-${dropZone.id}`);
    if (placeholder) placeholder.classList.add('d-none');
  }
  ['pointermove', 'pointerup', 'pointercancel', 'touchmove', 'touchend', 'touchcancel']
    .forEach(type => document.removeEventListener(type, type.includes('move') ? moveTouchDrag : endTouchDrag));
  document.querySelectorAll('.drop-div').forEach(div => div.classList.remove('drop-target'));
  touchDrag = null;
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