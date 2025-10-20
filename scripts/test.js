 async function editApiSubtask(taskId) {
  const inputValue = document.getElementById('edit-input');
  try {
    const response = await fetch(`${BASE_URL}/tasks.json`);
    const data = await response.json();
    const task = data[taskId];
    console.log(task);
    if (!task) throw new Error(`Task mit ID ${taskId} nicht gefunden`);
    checkIfSubtaskWasEdited(task, inputValue);
  } catch (error) {
    console.error('❌ Fehler beim Öffnen des Edit-Overlays:', error);
    alert('Task konnte nicht geladen werden.');
  }
  
}

function checkIfSubtaskWasEdited(task, input) {
  if (task.subtasks === input) {
    return;
  } else {
    
  }
}