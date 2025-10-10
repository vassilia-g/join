function boardTaskTemplate(task) {
  return `
    <div class="task" id="task" draggable="true" ondragstart="drag(event)">
      <span class="category" id="category">${task.category}</span>
      <div class="task-description">
        <h3 class="task-title" id="task-title">${task.title}</h3>
        <div class="task-content" id="task-content">${task.description}</div>
      </div>
      <div class="task-status">
        <div class="progress-bar"></div>
        <div class="subtask-count">
          <span id="actual-count-of-progress">0</span>
          /
          <span id="final-count-of-progress">${task.subtasks?.length || 0}</span>
          <span>Subtasks</span>
        </div>
      </div>
      <div class="task-info" id="task-info">
        <div class="assignee" id="assignee">
          ${task.contactsHTML || ''}
        </div>
        <div class="priority" id="priority">${task.priorityValue}</div>
      </div>
    </div>
  `;
}


function boardTaskOverlayTemplate(task, i) {
  return `
    <div class="task-overlay" id="task-overlay-${i}">
      <div class="overlay-header">
        <span class="overlay-category category">${task.category}</span>
        <button onclick="closeTaskOverlay()">
          <svg width="32" height="32" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_71720_5491" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="4" width="24" height="25">
              <rect x="4" y="4.96582" width="24" height="24" fill="var(--color-primary)"/>
            </mask>
            <g mask="url(#mask0_71720_5491)">
              <path d="M15.9998 18.3659L11.0998 23.2659C10.9165 23.4492 10.6831 23.5409 10.3998 23.5409C10.1165 23.5409 9.88314 23.4492 9.6998 23.2659C9.51647 23.0825 9.4248 22.8492 9.4248 22.5659C9.4248 22.2825 9.51647 22.0492 9.6998 21.8659L14.5998 16.9659L9.6998 12.0659C9.51647 11.8825 9.4248 11.6492 9.4248 11.3659C9.4248 11.0825 9.51647 10.8492 9.6998 10.6659C9.88314 10.4825 10.1165 10.3909 10.3998 10.3909C10.6831 10.3909 10.9165 10.4825 11.0998 10.6659L15.9998 15.5659L20.8998 10.6659C21.0831 10.4825 21.3165 10.3909 21.5998 10.3909C21.8831 10.3909 22.1165 10.4825 22.2998 10.6659C22.4831 10.8492 22.5748 11.0825 22.5748 11.3659C22.5748 11.6492 22.4831 11.8825 22.2998 12.0659L17.3998 16.9659L22.2998 21.8659C22.4831 22.0492 22.5748 22.2825 22.5748 22.5659C22.5748 22.8492 22.4831 23.0825 22.2998 23.2659C22.1165 23.4492 21.8831 23.5409 21.5998 23.5409C21.3165 23.5409 21.0831 23.4492 20.8998 23.2659L15.9998 18.3659Z" fill="#2A3647"/>
            </g>
          </svg>
        </button>
      </div>
      <div class="overlay-titel">
        <h3 class="overlay-task-title">${task.title}</h3>
      </div>
      <div class="overlay-description">
        <p class="overlay-task-content">${task.description}</p>
      </div>
      <div class="overlay-due-date">
        <h4>Due date:</h4>
      </div>
      <div class="overlay-priority">
        <h4>Priority:</h4>
        <div class="overlay-priority-value">${task.priorityValue}</div>
      </div>
      <div class="overlay-assignee">
        <h4>Assigned To:</h4>
        <div class="overlay-selected-contacts">${task.contactsHTML || ''}</div>
      </div>
      <div class="overlay-subtask-count">
          <h4>Subtasks</h4>
          <div id="overlay-subtasks-details">
            ${task.subtasks.map(subtask => `
              <div class="subtask-item">
                <div class="subtask-checkboxes">
                  <div class="subtask-svg-checked d-none">
                    <svg width="18" height="16" width="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 8V14C17 15.6569 15.6569 17 14 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H12" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                      <path d="M5 9L9 13L17 1.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="subtask-svg-unchecked">
                    <svg width="18" height="16" width="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                    </svg>
                  </div>
                </div>
                <label for="subtask-${subtask}">${subtask}</label>
              </div>
            `).join('')}
          </div>
      </div>
      <div class="overlay-footer">
        <div class="overlay-delete">
          <div class="overlay-svg-div">
              <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="16px" viewBox="0 -960 960 960" width="24px" fill="var(--color-primary)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </div>
          <p>Delete</p>
        </div>
        <dvi class="overlay-edit">
          <div class="overlay-svg-div">
              <svg xmlns="http://www.w3.org/2000/svg" height="18.25px" width="18.28px" viewBox="0 -960 960 960" width="24px" fill="var(--color-primary)"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
          </div>
          <p>Edit</p>
        </div>
      </div>
    </div>
  `;
}