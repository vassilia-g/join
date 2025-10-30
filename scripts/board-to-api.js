async function checkEditedApiSubtask(taskId, subtaskIndex) {
  const inputValue = document.getElementById('edit-input').value;
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
    await putData(`tasks/${taskId}`, task)
    getSubtasks(task, taskId);
  } catch (error) {
    alert('Subtask konnte nicht gelöscht werden.');
  }
}


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
    console.error('❌ Fehler beim Aktualisieren:', error);
  }
  loadTasks();
}


function extractInitialsFromSvg(svgString) {
  if (!svgString || typeof svgString !== "string") return "";
  const match = svgString.match(/<text[^>]*>([\s\S]*?)<\/text>/i);
  return match ? match[1].trim() : "";
}


async function resetTaskChangings(taskId) {
  openTaskOverlay(taskId);
  isEditingTask = false;
  currentTaskId = null;
  subtasks = [];
}


const debouncedFilter = debounce((value) => {
  filterTasksByText(value);
}, 200);

inputElement.addEventListener('input', (event) => {
  debouncedFilter(event.target.value);
});

