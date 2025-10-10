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
        <div class="priority" id="priority">${task.priority}</div>
      </div>
    </div>
  `;
}


function boardTaskOverlayTemplate(task, i, totalSubtasks) {
  return `
    <div class="task-overlay" id="task-overlay-${i}">
      <div class="overlay-header">
        <span class="category">${task.category}</span>
        <button onclick="closeTaskOverlay()">✖</button>
      </div>
      <div class="overlay-body">
        <h3 class="task-title">${task.title}</h3>
        <p class="task-content">${task.description}</p>
        <div class="subtask-count">
          ${totalSubtasks} Subtasks
        </div>
        <div class="task-info">
          <div class="assignee">${task.contactsHTML || ''}</div>
          <div class="priority">${task.priority}</div>
        </div>
      </div>
    </div>
  `;
}