function showSidebar() {
    return `
    <div class="logo">
        <img src="../assets/imgs/join-logo/Logo-white.svg" />
    </div>
    <div class="sidebar-nav">
        <a class="nav" href="./summary.html"><img src="../assets/imgs/symbols/Summary.svg" />Summary</a>
        <a class="nav" href="./add-task.html"><img src="../assets/imgs/symbols/Add-task.svg" />Add Task</a>
        <a class="nav" href="./board.html"><img src="../assets/imgs/symbols/Board.svg" />Board</a>
        <a class="nav" href="./contacts.html"><img src="../assets/imgs/symbols/Contacts.svg" />Contacts</a>
    </div>
    <div class="legal">
        <a class="legal-link" href="./privacy-policy.html">Privacy Policy</a>
        <a class="legal-link" href="./legal-notice.html">Legal Notice</a>
    </div>
    `;
}

function showHeader() {
    return `
        <div class="header-content">
          <p class="header-text">Kanban Project Management Tool</p>
          <div class="header-assets">
            <a href="./help.html"><img class="help" src="../assets/icons/help.svg" alt="help-icon"
                style="width: 20px; height: 20px; margin-right: 22px" /></a>
            <div class="profile-initials">
              <button onclick="dropdownMenu()">
                <p class="initials">SM</p>
              </button>
            </div>
            <div class="dropdown-content d-none">
              <a class="dropdown-item" href="./legal-notice.html">Legal Notice</a>
              <a href="./privacy-policy.html">Privacy Policy</a>
              <a href="../index.html" onclick="logOut()">Log out</a>
            </div>
          </div>
        </div>
    `;
}

function showSidebarBeforeLogin() {
    return `
        <div class="logo">
            <img src="../assets/imgs/join-logo/Logo-white.svg" />
        </div>
        <div class="sidebar-nav">
            <a class="nav" href="../index.html">
                <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_268662_8754" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="31">
                        <rect y="0.96582" width="30" height="30" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_268662_8754)">
                        <mask id="mask1_268662_8754" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="3" width="26" height="26">
                            <rect x="2" y="3" width="26" height="26" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask1_268662_8754)">
                            <path d="M16.0833 25.75C15.7764 25.75 15.5191 25.6462 15.3115 25.4385C15.1038 25.2309 15 24.9736 15 24.6667C15 24.3597 15.1038 24.1024 15.3115 23.8948C15.5191 23.6872 15.7764 23.5833 16.0833 23.5833H22.5833V8.41667H16.0833C15.7764 8.41667 15.5191 8.31285 15.3115 8.10521C15.1038 7.89757 15 7.64028 15 7.33333C15 7.02639 15.1038 6.7691 15.3115 6.56146C15.5191 6.35382 15.7764 6.25 16.0833 6.25H22.5833C23.1792 6.25 23.6892 6.46215 24.1135 6.88646C24.5378 7.31076 24.75 7.82083 24.75 8.41667V23.5833C24.75 24.1792 24.5378 24.6892 24.1135 25.1135C23.6892 25.5378 23.1792 25.75 22.5833 25.75H16.0833ZM14.1063 17.0833H6.33333C6.02639 17.0833 5.7691 16.9795 5.56146 16.7719C5.35382 16.5642 5.25 16.3069 5.25 16C5.25 15.6931 5.35382 15.4358 5.56146 15.2281C5.7691 15.0205 6.02639 14.9167 6.33333 14.9167H14.1063L12.075 12.8854C11.8764 12.6868 11.7771 12.4431 11.7771 12.1542C11.7771 11.8653 11.8764 11.6125 12.075 11.3958C12.2736 11.1792 12.5264 11.0663 12.8333 11.0573C13.1403 11.0483 13.4021 11.1521 13.6188 11.3688L17.4917 15.2417C17.7083 15.4583 17.8167 15.7111 17.8167 16C17.8167 16.2889 17.7083 16.5417 17.4917 16.7583L13.6188 20.6313C13.4021 20.8479 13.1448 20.9517 12.8469 20.9427C12.549 20.9337 12.2917 20.8208 12.075 20.6042C11.8764 20.3875 11.7816 20.1302 11.7906 19.8323C11.7997 19.5344 11.9035 19.2861 12.1021 19.0875L14.1063 17.0833Z" fill="#CDCDCD"/>
                        </g>
                    </g>
                </svg>
            Login</a>
        </div>
        <div class="legal">
            <a class="legal-link" href="./privacy-policy.html">Privacy Policy</a>
            <a class="legal-link" href="./legal-notice.html">Legal Notice</a>
        </div>
    `;
}

function createNewTaskTemplate(allFields) {
    return `
        <div class="task" id="task" draggable="true" ondragstart="drag(event)">
                <span class="category" id="category">${allFields.taskCategory}</span>
                <div class="task-description">
                  <h3 class="task-title" id="task-title">${allFields.taskTitle}</h3>
                  <div class="task-content" id="task-content">${allFields.taskDescription}</div>
                </div>
                <div class="task-status">
                  <div class="progress-bar" id="progress-bar"></div>
                  <div class="subtask-count">
                    <span id="actual-count-of-progress">0</span>
                    /
                    <span id="final-count-of-progress">2</span>
                    <span>Subtasks</span>
                  </div>
                </div>
                <div class="task-info" id="task-info">
                  <div class="assignee" id="assignee">
                    <div class="user-avatar">MM</div>
                    <div class="user-avatar">RR</div>
                    <div class="user-avatar">VV</div>
                    <div class="user-avatar">UU</div>
                  </div>
                  <div class="priority" id="priority">
                    <img class="${allFields.taskPriority === 'low' ? '' : 'd-none'}" src="../assets/imgs/symbols/low.svg" alt="">
                    <img class="${allFields.taskPriority === 'medium' ? '' : 'd-none'}" src="../assets/imgs/symbols/medium.svg" alt="">
                    <img class="${allFields.taskPriority === 'urgent' ? '' : 'd-none'}" src="../assets/imgs/symbols/urgent.svg" alt="">
                  </div>
                </div>
              </div>`
}