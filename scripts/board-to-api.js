/** 
 * Check if a subtask was edited in the edit-input, compare with stored value and refresh subtasks UI.
 * @param {string} taskId - ID of the task containing the subtask
 * @param {number} subtaskIndex - index of the subtask to check
 */
async function checkEditedApiSubtask(taskId, subtaskIndex) {
  const editInput = document.getElementById('edit-input');
  if (!editInput) return console.error('❌ Kein Edit-Input gefunden.');
  const inputValue = editInput.value.trim();
  if (inputValue === "") {
    editInput.focus();
    return;
  }
  try {
    const response = await fetch(`${BASE_URL}/tasks.json`);
    const data = await response.json();
    const task = data[taskId];
    if (!task) throw new Error(`Task mit ID ${taskId} nicht gefunden`);
    checkIfSubtaskWasEdited(task, inputValue, subtaskIndex, taskId);
    getSubtasks(task, taskId);
  } catch (error) {
    console.error('Fehler beim Öffnen des Edit-Overlays:', error);
    alert('Task konnte nicht geladen werden.');
  }
}


/** 
 * Delete a subtask from a task in the backend and refresh subtasks UI.
 * @param {string} taskId - ID of the task
 * @param {number} subtaskIndex - index of the subtask to delete
 */
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
    await putData(`tasks/${taskId}`, task)
    getSubtasks(task, taskId);
  } catch (error) {
    alert('Subtask konnte nicht gelöscht werden.');
  }
}


/** 
 * Read subtasks from the DOM (text + checked state) and push both lists to the backend.
 * @param {string} taskId - ID of the task to update
 */
async function pushSubtasksWithStatus(taskId) {
  const subtasksList = document.getElementById('selected-subtasks');
  if (!subtasksList) return;
  const subtasksData = Array.from(subtasksList.querySelectorAll('li')).map(li => ({
    text: li.querySelector('p').innerText.trim(),
    checked: li.querySelector('.checkbox-subtasks')?.classList.contains('checked') || false
  }));

  try {
    await putData(`tasks/${taskId}/subtasks`, subtasksData.map(s => s.text));
    await putData(`tasks/${taskId}/checkedSubtasks`, { subtasks: subtasksData.filter(s => s.checked).map(s => s.text) });
  } catch (error) {
    console.error('Fehler beim Pushen der Subtasks:', error);
  }
}


/** 
 * Update a task progress bar width according to subtasks done / total.
 * @param {Object} task - task object containing id, subtasks and checkedSubtasks
 */
function updateProgressBar(task) {
  const progressBar = document.getElementById(`progress-bar-${task.id}`);
  const total = task.subtasks?.length || 0;
  const done = task.checkedSubtasks?.subtasks?.length || 0;
  const getProgress = total > 0 ? (100 * done) / total : 0;
  progressBar.style.width = `${getProgress}%`;
}


/** 
 * Apply all pending changes after editing a task (contacts, subtasks, priority) and close overlay.
 * @param {string} taskId - ID of the edited task
 */
async function updateTaskAfterEdit(taskId) {
  isEditingTask = false;
  currentTaskId = null;
  let priorityValue, priorityLevel;
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
  await pushCheckedContacts(taskId);
  await pushSubtasksWithStatus(taskId);
  await updateTaskWithPriority(priorityLevel, priorityValue, taskId);
  closeTaskOverlay();
  subtasks = [];
}


/** 
 * Push selected contacts arrays to the backend for a task.
 * Converts arrays to object-indexed payload expected by the backend.
 * @param {string} taskId - ID of the task
 */
async function pushCheckedContacts(taskId) {
  const { initialsArray, namesArray, colorArray, idArray } = await getContactsFromArray();
  const data = {
    contactsInitials: initialsArray,
    contactsNames: namesArray,
    contactsColor: colorArray,
    contactsId: idArray
  };
  for (const [key, value] of Object.entries(data)) {
    const objValue = {};
    value.forEach((v, i) => objValue[i] = v);
    const path = `tasks/${taskId}/${key}`;
    await putData(path, objValue);
  }
}


/** 
 * Build an updated task object with priority and other editable fields and send patch to backend.
 * @param {string} priorityLevel - 'urgent'|'medium'|'low'
 * @param {string} priorityValue - svg/html representing priority
 * @param {string} taskId - ID of the task
 */
async function updateTaskWithPriority(priorityLevel, priorityValue, taskId) {
  const updatedTask = {
    title: document.getElementById('task-title').value,
    description: document.getElementById('task-description').value,
    dueDate: document.getElementById('task-due-date').value,
    category: document.getElementById('input-category').innerText,
    priorityValue,
    priorityLevel
  };
  await pushUpdatedTaskToApi(updatedTask, taskId);
}


/** 
 * Send a PATCH request to update task fields on the backend and reload tasks list.
 * @param {Object} updatedTask - partial task object to PATCH
 * @param {string} taskId - ID of the task
 */
async function pushUpdatedTaskToApi(updatedTask, taskId) {
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
    console.error('Fehler beim Aktualisieren:', error);
  }
  loadTasks();
}


/** 
 * Extract initials or text content from an SVG string (used to parse contact initials).
 * @param {string} svgString - svg markup containing a <text> element
 * @returns {string} extracted text or empty string
 */
function extractInitialsFromSvg(svgString) {
  if (!svgString || typeof svgString !== "string") return "";
  const match = svgString.match(/<text[^>]*>([\s\S]*?)<\/text>/i);
  return match ? match[1].trim() : "";
}


/** 
 * Cancel current editing state and re-open the task overlay for the given task.
 * Resets editing flags and local subtasks buffer.
 * @param {string} taskId - ID of the task to reset edits for
 */
async function resetTaskChangings(taskId) {
  openTaskOverlay(taskId);
  isEditingTask = false;
  currentTaskId = null;
  subtasks = [];
}


/** 
 * Debounced filter helper to avoid excessive API calls while typing.
 * Uses debounce(fn, wait) defined in board.js.
 */
const debouncedFilter = debounce((value) => {
  filterTasksByText(value);
}, 200);


/** 
 * Attach debounced input listener to the global inputElement for search/filtering.
 * Expects inputElement to be defined in scope.
 */
inputElement.addEventListener('input', (event) => {
  debouncedFilter(event.target.value);
});

