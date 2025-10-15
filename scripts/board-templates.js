function boardTaskTemplate(task, taskId) {
  return `
    <div class="task" id="${taskId}" draggable="true" ondragstart="drag(event)">
      <span class="category">${task.category}</span>
      <div class="task-description">
        <h3 class="task-title">${task.title}</h3>
        <div class="task-content">${task.description}</div>
      </div>
      <div class="task-status">
        <div class="progress-bar"></div>
        <div class="subtask-count">
          <span class="actual-count-of-progress">
            ${task.checkedSubtasks?.subtasks?.length || ""}
          </span> /
          <span class="final-count-of-progress">${task.subtasks?.length || ""}</span>
          <span>Subtasks</span>
        </div>
      </div>
      <div class="task-info">
        <div class="assignee">
          ${task.contactsHTML || ''}
        </div>
        <div class="priority">${task.priorityValue || ''}</div>
      </div>
    </div>
  `;
}


function boardTaskOverlayTemplate(task, taskId) {
  const subtasks = Array.isArray(task.subtasks) ? task.subtasks : [];

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
        <div class="overlay-selected-contacts">${task.contactsHTML || ''}</div>
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
    </div>
  `;
}

function editTaskBtnTemplate() {
  return `
    <button id="edit-task-btn" onclick="updateTaskAfterEdit('${currentTaskId}')">
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
  `;
}