function boardTaskTemplate(task, totalSubtasks) {
  return `
    <div class="task" draggable="true" ondragstart="drag(event)">
      <span class="category">${task.category}</span>
      <div class="task-description">
        <h3 class="task-title">${task.title}</h3>
        <div class="task-content">${task.description}</div>
      </div>
      <div class="task-status">
        <div class="progress-bar"></div>
        <div class="subtask-count">
          <span class="actual-count-of-progress">0</span> /
          <span class="final-count-of-progress">${totalSubtasks}</span>
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


function boardTaskOverlayTemplate(task, i) {
  const subtasks = Array.isArray(task.subtasks) ? task.subtasks : [];

  return `
    <div class="task-overlay" id="task-overlay-${i}">
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
        <div class="overlay-delete" onclick="deleteTask('${task.id}')">
          <div class="overlay-svg-div">
            <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="16px" viewBox="0 -960 960 960" width="24px" fill="var(--color-primary)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </div>
          <p>Delete</p>
        </div>
        <div class="overlay-edit" onclick="editTask('${task.id}')">
          <div class="overlay-svg-div">
            <svg xmlns="http://www.w3.org/2000/svg" height="18.25px" width="18.28px" viewBox="0 -960 960 960" width="24px" fill="var(--color-primary)"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
          </div>
          <p>Edit</p>
        </div>
      </div>
    </div>
  `;
}