/** 
 * Populate add-task inputs (title, description, due date, category) and initialize subtasks UI.
 */
function getTaskContent(task, taskId) {
  subtasks.length = 0;
  document.getElementById('task-title').value = task.title || '';
  document.getElementById('task-description').value = task.description || '';
  document.getElementById('task-due-date').value = task.dueDate || '';
  document.getElementById('input-category').innerText = task.category || '';
  const subtaskInput = document.getElementById('task-subtasks');
  subtaskInput.onclick = () => showSubtaskPicks(taskId);
  subtaskInput.onkeyup = (ev) => {
    if (ev.key === 'Enter') addSubtask();
  };
  const addSubtaskSvg = document.getElementById('add-subtask-svg');
  if (addSubtaskSvg) {
    addSubtaskSvg.replaceWith(addSubtaskSvg.cloneNode(true));
    const freshSvg = document.getElementById('add-subtask-svg');
    freshSvg.onclick = () => addSubtask();
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
  subtasks.length = 0;
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
