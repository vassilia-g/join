
let deletedContacts = [];

function initBoards() {
  return [
    { container: document.getElementById('new-task-div'), filler: document.getElementById('to-do-filler') },
    { container: document.getElementById('new-task-progress-div'), filler: document.getElementById('progress-filler') },
    { container: document.getElementById('new-task-feedback-div'), filler: document.getElementById('feedback-filler') },
    { container: document.getElementById('new-task-done-div'), filler: document.getElementById('done-filler') }
  ];
}


let boards;


document.addEventListener('DOMContentLoaded', () => {
  boards = initBoards();
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
});


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
    await getAddTaskInput(taskId, overlayContent, task)
    await allAddTaskScripts();
    const contacts = await loadContactsWithoutRendering();
    disableCategoryEdit();
    getTaskPriority(task);
    getTaskContent(task, taskId);
    getTaskContacts(task, taskId, contacts);
    overlay.classList.remove('d-none');
    overlay.classList.add('active');
  } catch (error) {
    alert('Task konnte nicht geladen werden.');
  }
}


function disableCategoryEdit() {
  const categoryEdit = document.getElementById('task-category');
  categoryEdit.onclick = null;
  categoryEdit.style.cursor = "default";
}


async function getAddTaskInput(taskId, overlayContent, task) {
  const htmlResponse = await fetch('../html/add-task.html');
    const html = await htmlResponse.text();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const taskContent = tempDiv.querySelector('.create-task');
    getOverlayContent(overlayContent, taskContent, taskId, task);
}


function getTaskContacts(task, taskId, contacts) {
  const contactsToSelect = document.getElementById('contacts-to-select');
  const selectedContacts = document.getElementById('selected-contacts');
  renderSelectedContactsFromApi(task, selectedContacts);
}


async function renderSelectedContactsFromApi(task, selectedContacts) {
  try {
    const [tempContactsRes, deleteContactsRes] = await Promise.all([
      fetch(`${BASE_URL}/tempContact.json`),
      fetch(`${BASE_URL}/deleteContacts.json`)
    ]);
    if (!tempContactsRes.ok || !deleteContactsRes.ok) throw new Error('Fehler beim Laden der Contacts');
    const tempContacts = await tempContactsRes.json();
    const deletedInitials = Object.values(await deleteContactsRes.json() || {}).map(dc => dc.initials);
    const filteredTask = { 
      ...task, 
      contactsInitials: (task.contactsInitials || []).filter(c => {
        const m = c.svg.match(/<text[^>]*>([\s\S]*?)<\/text>/i);
        return !deletedInitials.includes(m ? m[1].trim() : "");
      })
    };
    selectedContacts.innerHTML = renderSelectedContactsFromApiTemplate(filteredTask, tempContacts);
    return tempContacts;
  } catch (e) {
    console.error('❌ Fehler beim Rendern der Contacts:', e);
    selectedContacts.innerHTML = '';
    return null;
  }
}


function renderSelectedContactsFromApiTemplate(task, tempContacts) {
  const combined = [
    ...(task.contactsInitials || []).map(c => ({ svg: c.svg, initials: extractInitialsFromSvg(c.svg) })),
    ...Object.values(tempContacts || {}).map(t => {
      const initials = t.initials || getInitials(t.name);
      if (!task.contactsInitials?.some(c => extractInitialsFromSvg(c.svg) === initials)) {
        const color = t.color || getRandomColor();
        return { initials, svg: `<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="21" cy="21" r="20" fill="${color}" stroke="white" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="14" fill="white">${initials}</text></svg>` };
      }
    }).filter(Boolean)
  ];
  const html = combined.slice(0,3).map(c => selectedContactsApiTemplate(c)).join('');
  return combined.length > 3 ? html + showMoreApiContacts(combined.slice(3)) : html;
}


function extractInitialsFromSvg(svgString) {
  const match = svgString.match(/<text[^>]*>([\s\S]*?)<\/text>/i);
  return match ? match[1].trim() : '';
}



async function openDropdownContactsWithApi(task, taskId, contactsToSelect, selectedContacts, contacts) {
  const dropdownIcon = document.getElementById('dropdown-icon');
  const tempContacts = await renderSelectedContactsFromApi(task, selectedContacts);
  if (contactsToSelect.innerHTML === '') {
    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      const initialsFromTask = getInitials(contact.name);
      await showContactsWithSelectionStateApi(i, task, taskId, initialsFromTask, contacts, contactsToSelect);
    }
    setTimeout(() => {
      contactsToSelect.classList.add('show');
    }, 10);
  } else {
    hideDropdownContactsApi(contactsToSelect, selectedContacts, task, tempContacts);
  }
  dropdownIcon.classList.toggle("open");
  selectedContacts.classList.add('d-none');
}


async function showContactsWithSelectionStateApi(i, task, taskId, initialsFromTask = "", contacts, contactsToSelect) {
  const fetchInitials = async url => { try { const res = await fetch(url); if (!res.ok) throw 0; return Object.values(await res.json() || {}).flatMap(e => e.initials ? [e.initials.trim()] : Object.values(e || {}).map(inner => inner.initials?.trim()).filter(Boolean)); } catch { return []; } };
  const deleted = await fetchInitials(`${BASE_URL}/deleteContacts.json`);
  const temp = await fetchInitials(`${BASE_URL}/tempContact.json`);
  const contactObj = task?.contactsInitials?.[i], svgInitials = contactObj?.svg?.match(/<text[^>]*>([\s\S]*?)<\/text>/i)?.[1]?.trim() || "";
  const alreadyInTask = svgInitials === initialsFromTask && !deleted.includes(svgInitials);
  const contactInitials = extractInitialsFromSvg(contactObj?.svg || "");
  if (deleted.includes(initialsFromTask)) return contactsToSelect.innerHTML += showContactsWithoutSelectionStateApiTemplate(contacts[i], i, contactInitials, task);
  if (temp.includes(initialsFromTask)) return showContactsWithSelectionStateApiTemplate(i, task, contacts, initialsFromTask, contactsToSelect, true, temp);
  showContactsWithSelectionStateApiTemplate(i, task, contacts, initialsFromTask, contactsToSelect, alreadyInTask, temp);
}


function hideDropdownContactsApi(contactsToSelect, selectedContacts, task, tempContacts) {
    contactsToSelect.classList.remove('show');
    setTimeout(() => {
        contactsToSelect.innerHTML = '';
    }, 300);
    setTimeout(() => {
        selectedContacts.classList.remove('d-none');
    }, 300);
    selectedContacts.innerHTML += renderSelectedContactsFromApi(task, selectedContacts);
}


async function allAddTaskScripts() {
    await loadScriptOnce('add-task-script', '../scripts/add-task.js');
    await loadScriptOnce('add-task-sub-menu-script', '../scripts/add-task-sub-menus.js');
    await loadScriptOnce('add-task-template-script', '../scripts/add-task-template.js');
}


function getOverlayContent(overlayContent, taskContent, taskId, task) {
  overlayContent.innerHTML = '';
  overlayContent.appendChild(taskContent.cloneNode(true));
  const innerContainer = document.createElement('div');
  innerContainer.id = 'edit-task-btn-div';
  innerContainer.classList.add('edit-extra');
  overlayContent.appendChild(innerContainer);
  innerContainer.innerHTML += editandResetTaskBtnTemplate(taskId, task);
}


function getTaskPriority(task) {
  const urgentButton = document.getElementById('urgent-priority-btn');
  const mediumButton = document.getElementById('medium-priority-btn');
  const lowButton = document.getElementById('low-priority-btn');
  getPriorityFromTaskApi(urgentButton, mediumButton, lowButton, task)
  urgentButton.addEventListener('click', () => togglePriorityBtn(urgentButton));
  mediumButton.addEventListener('click', () => togglePriorityBtn(mediumButton));
  lowButton.addEventListener('click', () => togglePriorityBtn(lowButton));
}


function getPriorityFromTaskApi(urgentButton, mediumButton, lowButton, task) {
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
  const res = await fetch(`${BASE_URL}/tasks/${taskId}.json`);
  const task = await res.json();
  await pushCheckedContacts(task, taskId);
  await pushCheckedSubtasks(taskId);
  await updateTaskWithPriority(priorityLevel, priorityValue, taskId);
  closeTaskOverlay();
}

async function pushCheckedContacts(task, taskId) {
  try {
    // 1️⃣ deleteContacts abrufen
    const deletedRes = await fetch(`${BASE_URL}/deleteContacts.json`);
    const deletedContacts = deletedRes.ok ? await deletedRes.json() : {};

    const deletedInitials = Object.values(deletedContacts || {})
      .map(dc => dc.initials?.trim())
      .filter(Boolean);

    // 2️⃣ Task-Daten aus dem übergebenen Task-Objekt als Arrays sichern
    let contactsInitials = task.contactsInitials ? Object.values(task.contactsInitials) : [];
    let contactsNames = task.contactsNames ? Object.values(task.contactsNames) : [];
    let contactsColors = task.contactsColors ? Object.values(task.contactsColors) : [];

    // 3️⃣ Kontakte aus Task entfernen, die in deleteContacts sind
    const filteredInitials = [];
    const filteredNames = [];
    const filteredColors = [];

    contactsInitials.forEach((c, i) => {
      const initials = extractInitialsFromSvg(c.svg);
      if (!deletedInitials.includes(initials)) {
        filteredInitials.push(c);
        filteredNames.push(contactsNames[i]);
        filteredColors.push(contactsColors[i]);
      }
    });

    // 4️⃣ TempContacts abrufen
    const tempRes = await fetch(`${BASE_URL}/tempContact.json`);
    const tempContacts = tempRes.ok ? Object.values(await tempRes.json() || {}).map(tc => ({
      initials: tc.initials?.trim(),
      name: tc.name?.trim(),
      color: tc.color
    })) : [];

    // 5️⃣ Nur TempContacts hinzufügen, die noch nicht im Task sind
    tempContacts.forEach(tc => {
      if (!filteredInitials.some(c => extractInitialsFromSvg(c.svg) === tc.initials)) {
        filteredInitials.push({
          initials: tc.initials,
          svg: `<svg width="42" height="42"><circle cx="21" cy="21" r="20" fill="${tc.color}" stroke="white" stroke-width="2"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="14" fill="white">${tc.initials}</text></svg>`
        });
        filteredNames.push(tc.name);
        filteredColors.push(tc.color);
      }
    });

    // 6️⃣ Änderungen direkt in Firebase für die übergebene Task-ID updaten
    await fetch(`${BASE_URL}/tasks/${taskId}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contactsInitials: filteredInitials,
        contactsNames: filteredNames,
        contactsColors: filteredColors
      })
    });

    // 7️⃣ deleteContacts und tempContacts in Firebase löschen
    await Promise.all([
      fetch(`${BASE_URL}/deleteContacts.json`, { method: 'DELETE' }),
      fetch(`${BASE_URL}/tempContact.json`, { method: 'DELETE' })
    ]);

    console.log('✅ Kontakte aktualisiert, gelöschte entfernt, tempContacts hinzugefügt');

    // 8️⃣ Task-Objekt lokal aktualisieren
    task.contactsInitials = filteredInitials;
    task.contactsNames = filteredNames;
    task.contactsColors = filteredColors;

  } catch (err) {
    console.error("❌ Fehler beim pushCheckedContacts:", err);
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
    loadTasks(updatedTask);
}


async function sendContactToDeleteApi(contactInitials, index, taskId, contactName, contactColor) {
  const checkboxSvg = document.getElementById(`checkbox-svg-${index}`);
  if (!checkboxSvg) return;
  const isChecked = checkboxSvg.classList.contains('checked');

  try {
    if (!isChecked) {
      checkboxSvg.classList.add('checked');
      checkboxSvg.innerHTML = `
        <path d="M20.3882 11V17C20.3882 18.6569 19.045 20 17.3882 20H7.38818C5.73133 20 4.38818 18.6569 4.38818 17V7C4.38818 5.34315 5.73133 4 7.38818 4H15.3882" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
        <path d="M8.38818 12L12.3882 16L20.3882 4.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      `;

      // deleteContacts löschen, falls vorhanden
      const delRes = await fetch(`${BASE_URL}/deleteContacts.json`);
      const deleteContactsData = await delRes.json();
      const delKey = Object.keys(deleteContactsData || {}).find(key => deleteContactsData[key]?.initials === contactInitials);
      if (delKey) {
        await fetch(`${BASE_URL}/deleteContacts/${delKey}.json`, { method: 'DELETE' });
        deletedContacts = deletedContacts.filter(init => init !== contactInitials);
      }

      // tempContact hinzufügen
      await fetch(`${BASE_URL}/tempContact.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initials: contactInitials, name: contactName, color: contactColor })
      });

    } else {
      // Uncheck: tempContact löschen, deleteContacts hinzufügen
      checkboxSvg.classList.remove('checked');
      checkboxSvg.innerHTML = `<rect x="4.38818" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>`;

      // tempContact löschen
      const tempRes = await fetch(`${BASE_URL}/tempContact.json`);
      const tempData = await tempRes.json();
      const tempKey = Object.keys(tempData || {}).find(key => tempData[key]?.initials === contactInitials);
      if (tempKey) {
        await fetch(`${BASE_URL}/tempContact/${tempKey}.json`, { method: 'DELETE' });
      }

      // deleteContacts hinzufügen
      await fetch(`${BASE_URL}/deleteContacts.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initials: contactInitials })
      });
      if (!deletedContacts.includes(contactInitials)) deletedContacts.push(contactInitials);
    }

    console.log('deletedContacts:', deletedContacts);
  } catch (err) {
    console.error('❌ Fehler beim Senden an API:', err);
  }
}

function extractInitialsFromSvg(svgString) {
  if (!svgString || typeof svgString !== "string") return "";
  const match = svgString.match(/<text[^>]*>([\s\S]*?)<\/text>/i);
  return match ? match[1].trim() : "";
}


async function resetTaskChangings(taskId) {

  try {
    const response = await fetch(`${BASE_URL}/deleteContacts.json`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Fehler beim Löschen der Task');
  } catch (error) {
    alert('Task konnte nicht gelöscht werden.');
  }
  try {
    const response = await fetch(`${BASE_URL}/tempContact.json`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Fehler beim Löschen der Task');
  } catch (error) {
    alert('Task konnte nicht gelöscht werden.');
  }
  openTaskOverlay(taskId);
}


const debouncedFilter = debounce((value) => {
  filterTasksByText(value);
}, 200);
inputElement.addEventListener('input', (event) => {
  debouncedFilter(event.target.value);
});