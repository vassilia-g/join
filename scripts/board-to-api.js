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
    await putData(`tasks/${taskId}`, task)
    getSubtasks(task, taskId);
  } catch (error) {
    alert('Subtask konnte nicht gelöscht werden.');
  }   
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
  await pushCheckedSubtasks(taskId);
  await updateTaskWithPriority(priorityLevel, priorityValue, taskId);
  closeTaskOverlay();
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
    await patchData(path, objValue);
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
}


const debouncedFilter = debounce((value) => {
  filterTasksByText(value);
}, 200);
inputElement.addEventListener('input', (event) => {
  debouncedFilter(event.target.value);
});