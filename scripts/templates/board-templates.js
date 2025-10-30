


function boardTaskTemplate(taskElement, task, taskId, selectedContactsComplete) {
  taskElement.innerHTML = `
    <div class="task" id="${taskId}" draggable="true" ondragstart="drag(event)" onclick="openTaskOverlay('${taskId}')">
      <span class="category">${task.category}</span>
      <div class="task-description">
        <h3 class="task-title">${task.title}</h3>
        <div class="task-content">${task.description}</div>
      </div>
      <div class="task-status" title="${task.checkedSubtasks?.subtasks?.length || 0} of ${task.subtasks?.length || 0} done">
        <div id="progress-bar-div">
          <div id="progress-bar-${taskId}" class="progress-bar"></div>
        </div>
        <div class="subtask-count">
          <span class="actual-count-of-progress">
            ${task.checkedSubtasks?.subtasks?.length || 0}
          </span> /
          <span class="final-count-of-progress">${task.subtasks?.length || ""}</span>
          <span>Subtasks</span>
        </div>
      </div>
      <div class="task-info">
        <div class="assignee">
          ${selectedContactsComplete}
        </div>
        <div class="priority">${task.priorityValue || ''}</div>
      </div>
    </div>
  `;
}


function showMoreContacts(extraInitials) {
  return `
      <div class="selected-contacts-svg">
        <svg width="40" height="40" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21" cy="21" r="20" fill="none" stroke="#2a3647" stroke-width="2"/>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="16" fill="#2a3647">+${extraInitials.length}</text>
        </svg>
      </div>
    `;
}


function boardTaskOverlayTemplate(task, taskId) {
  const subtasks = Array.isArray(task.subtasks) ? task.subtasks : [];
  let contactsHTML = '';
  if (task.contactsInitials && task.contactsInitials.length > 0) {
    contactsHTML = task.contactsInitials
      .map((contact, i) => {
        const color = task.contactsColor?.[i] || '#ccc';
        return svgTemplate(color, contact);
      })
      .join('');
  }

  let contactsName = '';
  if (task.contactsNames && task.contactsNames.length > 0) {
    contactsName = task.contactsNames
      .map(name => `<p>${name}</p>`)
      .join('');
  }
  return `
    <div class="task-overlay" id="task-overlay-${taskId}">
      <div class="overlay-header">
        <span class="overlay-category category">${task.category || ''}</span>
        <button onclick="closeTaskOverlay()">
          <!-- Close SVG hier -->
        </button>
      </div>
      <div class="overlay-titel">
        <h3 class="overlay-task-title">${task.title || ''}</h3>
      </div>
      <div class="overlay-description">
        <p class="overlay-task-content">${task.description || ''}</p>
      </div>
      <div class="overlay-due-date">
        <h4>Due date:</h4>
        <span class="overly-due-date">${task.dueDate || ''}</span>
      </div>
      <div class="overlay-priority">
        <h4>Priority:</h4>
        <div class="overlay-priority-value">${task.priorityValue || ''}</div>
      </div>
      <div class="overlay-assignee">
        <h4>Assigned To:</h4>
        <div class="overlay-selected-contacts">
          <div class="contact-html">${contactsHTML || ''}</div>
          <div class="contact-html-name">${contactsName || ''}</div>
        </div>
      </div>
      <div class="overlay-subtask-count">
        <h4>Subtasks</h4>
        <div id="overlay-subtasks-details">
          ${subtasks.length > 0 ? subtasks.map(subtask => `
            <div class="subtask-item">
              <div class="subtask-checkboxes">
                <div class="subtask-svg-checked d-none">
                  <!-- Checked SVG hier -->
                </div>
                <div class="subtask-svg-unchecked">
                  <!-- Unchecked SVG hier -->
                </div>
              </div>
              <label>${subtask}</label>
            </div>
          `).join('') : `<p>No subtasks</p>`}
        </div>
      </div>
      <div class="overlay-footer">
        <div class="overlay-delete" onclick="deleteTask('${taskId}')">
          <div class="overlay-svg-div">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="16px" viewBox="0 -960 960 960" width="24px" fill="var(--color-primary)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </div>
          <p>Delete</p>
        </div>
        <div class="overlay-edit" onclick="editTask('${taskId}')">
          <div class="overlay-svg-div">
            <svg xmlns="http://www.w3.org/2000/svg" height="18.25px" width="18.28px" viewBox="0 -960 960 960" width="24px" fill="var(--color-primary)"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
          </div>
          <p>Edit</p>
        </div>
      </div>
      <button id="close-overlay-btn" onclick="closeTaskOverlay()">
        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_71720_5491" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="25">
            <rect x="4" y="4.96582" width="24" height="24" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_71720_5491)">
            <path d="M15.9998 18.3659L11.0998 23.2659C10.9165 23.4492 10.6831 23.5409 10.3998 23.5409C10.1165 23.5409 9.88314 23.4492 9.6998 23.2659C9.51647 23.0825 9.4248 22.8492 9.4248 22.5659C9.4248 22.2825 9.51647 22.0492 9.6998 21.8659L14.5998 16.9659L9.6998 12.0659C9.51647 11.8825 9.4248 11.6492 9.4248 11.3659C9.4248 11.0825 9.51647 10.8492 9.6998 10.6659C9.88314 10.4825 10.1165 10.3909 10.3998 10.3909C10.6831 10.3909 10.9165 10.4825 11.0998 10.6659L15.9998 15.5659L20.8998 10.6659C21.0831 10.4825 21.3165 10.3909 21.5998 10.3909C21.8831 10.3909 22.1165 10.4825 22.2998 10.6659C22.4831 10.8492 22.5748 11.0825 22.5748 11.3659C22.5748 11.6492 22.4831 11.8825 22.2998 12.0659L17.3998 16.9659L22.2998 21.8659C22.4831 22.0492 22.5748 22.2825 22.5748 22.5659C22.5748 22.8492 22.4831 23.0825 22.2998 23.2659C22.1165 23.4492 21.8831 23.5409 21.5998 23.5409C21.3165 23.5409 21.0831 23.4492 20.8998 23.2659L15.9998 18.3659Z" fill="#2A3647"/>
          </g>
        </svg>
      </button>
    </div>
  `;
}


function editandResetTaskBtnTemplate(taskId) {
  return `
  <div class="edit-or-reset-btn-div">
    <button id="reset-task-btn" onclick="resetTaskChangings('${taskId}')">
      <p>Reset</p>
    </button>
    <button id="edit-task-btn" onclick="updateTaskAfterEdit('${taskId}')">
      <p>Ok</p>
      <div id="edit-task-check">
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_75592_9963" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
            <rect x="0.144531" width="24" height="24" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_75592_9963)">
            <path d="M9.69474 15.15L18.1697 6.675C18.3697 6.475 18.6072 6.375 18.8822 6.375C19.1572 6.375 19.3947 6.475 19.5947 6.675C19.7947 6.875 19.8947 7.1125 19.8947 7.3875C19.8947 7.6625 19.7947 7.9 19.5947 8.1L10.3947 17.3C10.1947 17.5 9.96141 17.6 9.69474 17.6C9.42807 17.6 9.19474 17.5 8.99474 17.3L4.69474 13C4.49474 12.8 4.3989 12.5625 4.40724 12.2875C4.41557 12.0125 4.51974 11.775 4.71974 11.575C4.91974 11.375 5.15724 11.275 5.43224 11.275C5.70724 11.275 5.94474 11.375 6.14474 11.575L9.69474 15.15Z" fill="#FFFFFF"/>
          </g>
        </svg>
      </div>
    </button>
  </div>
  `;
}


function showApiSubtask(checkboxClass, checkboxIcon, taskId, subtaskIndex, subtask) {
  return `
    <div class="subtasks-list-api">
      <li>
        <div class="checkbox-subtasks ${checkboxClass}" onclick="toggleBoxChecked(this)">
          ${checkboxIcon}
        </div>
        <p>${subtask}</p>
        <div class="delete-or-edit-icons">
          <svg onclick="editApiSubtask('${taskId}', '${subtaskIndex}')" class="edit-svg" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_75592_9969" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
              <rect x="0.144531" width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_75592_9969)">
              <path d="M5.14453 19H6.54453L15.1695 10.375L13.7695 8.975L5.14453 17.6V19ZM19.4445 8.925L15.1945 4.725L16.5945 3.325C16.9779 2.94167 17.4487 2.75 18.007 2.75C18.5654 2.75 19.0362 2.94167 19.4195 3.325L20.8195 4.725C21.2029 5.10833 21.4029 5.57083 21.4195 6.1125C21.4362 6.65417 21.2529 7.11667 20.8695 7.5L19.4445 8.925ZM17.9945 10.4L7.39453 21H3.14453V16.75L13.7445 6.15L17.9945 10.4Z" fill="#2A3647"/>
            </g>
          </svg>
          <svg onclick="deleteSubtaskFromApi('${taskId}', '${subtaskIndex}')" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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


function showApiSubtaskToEdit(subtask, index, taskId) {
  return `
      <div class="edit-subtask-container">
        <input id="edit-input" class="edit-input" type="text" value="${subtask}">
        <div class="delete-or-done-edit">
          <div class="delete-edit-svg">
            <svg onclick="deleteEditedApiSubtask(${subtask})" width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_75601_14777" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                <rect x="0.144531" width="24" height="24" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask0_75601_14777)">
                <path d="M7.14453 21C6.59453 21 6.1237 20.8042 5.73203 20.4125C5.34036 20.0208 5.14453 19.55 5.14453 19V6C4.8612 6 4.6237 5.90417 4.43203 5.7125C4.24036 5.52083 4.14453 5.28333 4.14453 5C4.14453 4.71667 4.24036 4.47917 4.43203 4.2875C4.6237 4.09583 4.8612 4 5.14453 4H9.14453C9.14453 3.71667 9.24036 3.47917 9.43203 3.2875C9.6237 3.09583 9.8612 3 10.1445 3H14.1445C14.4279 3 14.6654 3.09583 14.857 3.2875C15.0487 3.47917 15.1445 3.71667 15.1445 4H19.1445C19.4279 4 19.6654 4.09583 19.857 4.2875C20.0487 4.47917 20.1445 4.71667 20.1445 5C20.1445 5.28333 20.0487 5.52083 19.857 5.7125C19.6654 5.90417 19.4279 6 19.1445 6V19C19.1445 19.55 18.9487 20.0208 18.557 20.4125C18.1654 20.8042 17.6945 21 17.1445 21H7.14453ZM7.14453 6V19H17.1445V6H7.14453ZM9.14453 16C9.14453 16.2833 9.24036 16.5208 9.43203 16.7125C9.6237 16.9042 9.8612 17 10.1445 17C10.4279 17 10.6654 16.9042 10.857 16.7125C11.0487 16.5208 11.1445 16.2833 11.1445 16V9C11.1445 8.71667 11.0487 8.47917 10.857 8.2875C10.6654 8.09583 10.4279 8 10.1445 8C9.8612 8 9.6237 8.09583 9.43203 8.2875C9.24036 8.47917 9.14453 8.71667 9.14453 9V16ZM13.1445 16C13.1445 16.2833 13.2404 16.5208 13.432 16.7125C13.6237 16.9042 13.8612 17 14.1445 17C14.4279 17 14.6654 16.9042 14.857 16.7125C15.0487 16.5208 15.1445 16.2833 15.1445 16V9C15.1445 8.71667 15.0487 8.47917 14.857 8.2875C14.6654 8.09583 14.4279 8 14.1445 8C13.8612 8 13.6237 8.09583 13.432 8.2875C13.2404 8.47917 13.1445 8.71667 13.1445 9V16Z" fill="#2A3647"/>
              </g>
            </svg>
          </div>
          <div class="done-edit-svg">
            <svg onclick="checkEditedApiSubtask('${taskId}', '${index}')" width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_75601_14779" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                <rect x="0.144531" width="24" height="24" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask0_75601_14779)">
                <path d="M9.69474 15.15L18.1697 6.675C18.3697 6.475 18.6072 6.375 18.8822 6.375C19.1572 6.375 19.3947 6.475 19.5947 6.675C19.7947 6.875 19.8947 7.1125 19.8947 7.3875C19.8947 7.6625 19.7947 7.9 19.5947 8.1L10.3947 17.3C10.1947 17.5 9.96141 17.6 9.69474 17.6C9.42807 17.6 9.19474 17.5 8.99474 17.3L4.69474 13C4.49474 12.8 4.3989 12.5625 4.40724 12.2875C4.41557 12.0125 4.51974 11.775 4.71974 11.575C4.91974 11.375 5.15724 11.275 5.43224 11.275C5.70724 11.275 5.94474 11.375 6.14474 11.575L9.69474 15.15Z" fill="#2A3647"/>
              </g>
            </svg>
          </div>
        </div>
      </div>`;
}


function svgTemplate(color, contact) {
  return `
      <svg class="initials-svg" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="21" cy="21" r="20" fill="${color}" stroke="white" stroke-width="2"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="14" fill="white">
          ${contact}
        </text>
      </svg>
    `;
}


function showContactsWithSelectionStateApiTemplate(i, task, contacts, initialsFromTask, contactsToSelect, alreadyInTask, tempContactsFromApi) {
  const contact = contacts[i];
  let contactInitials = extractInitialsFromSvg(task.contactsInitials[i]?.svg || "");
  if (!contactInitials) {
    contactInitials = getInitials(contact.name);
  }

  console.log(tempContactsFromApi);

  const isTempContact = tempContactsFromApi.includes(contactInitials) || tempContactsFromApi.includes(initialsFromTask);
  const isSelected = alreadyInTask || isTempContact;
  const checkedClass = isSelected ? "checked" : "unchecked";

  if (isSelected) {
    contactsToSelect.innerHTML += `
      <div class="single-contact selected">
        <div class="contact-name">
          <svg width="42" height="42" class="${checkedClass}" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="21" cy="21" r="20" fill="${contact.color}" stroke="white" stroke-width="2"/>
            <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="14" fill="white">
              ${contactInitials}
            </text>
          </svg>
          <span>${task.contactsNames[i] || contact.name}</span>
        </div>
        <div class="contact-checkbox">
          <svg 
            onclick="sendContactToDeleteApi('${contactInitials}', ${i}, '${task.id}', '${contact.name}', '${contact.color}')"
            class="checked" 
            id="checkbox-svg-${i}" 
            width="25" height="24" 
            viewBox="0 0 25 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path d="M20.3882 11V17C20.3882 18.6569 19.045 20 17.3882 20H7.38818C5.73133 20 4.38818 18.6569 4.38818 17V7C4.38818 5.34315 5.73133 4 7.38818 4H15.3882" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
            <path d="M8.38818 12L12.3882 16L20.3882 4.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    `;
  } else {
    contactsToSelect.innerHTML += showContactsWithoutSelectionStateApiTemplate(contact, i, contactInitials, task);
  }
}


function showContactsWithoutSelectionStateApiTemplate(contact, i, contactInitials, task) {
  const initials = getInitials(contact.name);
  return `
    <div class="single-contact">
      <div class="contact-name">
        <svg id="initials-${i}" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21" cy="21" r="20" fill="${contact.color}" stroke="white" stroke-width="2"/>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="14" fill="white">
            ${initials}
          </text>
        </svg>
        <span>${contact.name}</span>
      </div>
      <div class="contact-checkbox" id="checkbox-${i}" data-index="${i}">
        <svg onclick="sendContactToDeleteApi('${contactInitials}', ${i}, '${task.id}', '${contact.name}', '${contact.color}')" id="checkbox-svg-${i}" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4.38818" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
        </svg>
      </div>
    </div>
  `;
}


function selectedContactsApiTemplate(c) {
  return `
        <div class="selected-contacts-svg selected">
          ${c.svg}
        </div>
      `;
}

function selectedContactsPlusApiTemplate() {
  return `
    <div class="selected-contacts-svg">${checkedInitials[i].outerHTML}</div>
  `;
}


function showMoreApiContacts(extraInitials) {
  return `
      <div class="selected-contacts-svg">
        <svg width="40" height="40" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21" cy="21" r="20" fill="none" stroke="#2a3647" stroke-width="2"/>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="16" fill="#2a3647">+${extraInitials.length}</text>
        </svg>
      </div>
    `;
}

function selectedTempContactsApiTemplate(initials, color) {
  return `
          <div class="selected-contacts-svg">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="21" cy="21" r="20" fill="${color}" stroke="white" stroke-width="2"/>
              <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="14" fill="white">
                ${initials}
              </text>
            </svg>
          </div>
        `;
}  