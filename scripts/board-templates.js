function boardTaskTemplate(task, i, totalSubtasks) {
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
            <!-- Delete SVG -->
          </div>
          <p>Delete</p>
        </div>
        <div class="overlay-edit" onclick="editTask('${task.id}')">
          <div class="overlay-svg-div">
            <!-- Edit SVG -->
          </div>
          <p>Edit</p>
        </div>
      </div>
    </div>
  `;
}