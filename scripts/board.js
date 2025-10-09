const urgentBoardSvg = `<svg id="urgent-svg" width="20" height="17" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <g>
                          <path d="M19.6528 9.25471C19.4182 9.25511 19.1896 9.18026 19.0007 9.04117L10.7487 2.958L2.49663 9.04117C2.38078 9.12673 2.24919 9.18866 2.10939 9.22341C1.96959 9.25816 1.82431 9.26506 1.68184 9.2437C1.53937 9.22235 1.40251 9.17316 1.27906 9.09895C1.15562 9.02474 1.04801 8.92697 0.96238 8.8112C0.876751 8.69544 0.814779 8.56395 0.780002 8.42425C0.745226 8.28455 0.738325 8.13938 0.759696 7.99702C0.802855 7.7095 0.958545 7.4509 1.19252 7.27809L10.0966 0.707612C10.2853 0.56802 10.5139 0.492676 10.7487 0.492676C10.9835 0.492676 11.212 0.56802 11.4007 0.707612L20.3048 7.27809C20.4908 7.41501 20.6286 7.60712 20.6988 7.827C20.7689 8.04688 20.7678 8.28328 20.6955 8.50246C20.6232 8.72165 20.4834 8.9124 20.2962 9.04749C20.1089 9.18258 19.8837 9.25511 19.6528 9.25471Z" fill="#FF3D00" />
                          <path d="M19.6528 9.25471C19.4182 9.25511 19.1896 9.18026 19.0007 9.04117L10.7487 2.958L2.49663 9.04117C2.38078 9.12673 2.24919 9.18866 2.10939 9.22341C1.96959 9.25816 1.82431 9.26506 1.68184 9.2437C1.53937 9.22235 1.40251 9.17316 1.27906 9.09895C1.15562 9.02474 1.04801 8.92697 0.96238 8.8112C0.876751 8.69544 0.814779 8.56395 0.780002 8.42425C0.745226 8.28455 0.738325 8.13938 0.759696 7.99702C0.802855 7.7095 0.958545 7.4509 1.19252 7.27809L10.0966 0.707612C10.2853 0.56802 10.5139 0.492676 10.7487 0.492676C10.9835 0.492676 11.212 0.56802 11.4007 0.707612L20.3048 7.27809C20.4908 7.41501 20.6286 7.60712 20.6988 7.827C20.7689 8.04688 20.7678 8.28328 20.6955 8.50246C20.6232 8.72165 20.4834 8.9124 20.2962 9.04749C20.1089 9.18258 19.8837 9.25511 19.6528 9.25471Z" transform="translate(0,07)" fill="#FF3D00" />
                        </g>
                      </svg>`
const mediumBoardSvg = `<svg id="medium-svg" width="20" height="14.51" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <g>
                          <path d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z" fill="#FFA800" />
                          <path d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z" transform="translate(0,07)" fill="#FFA800"/>
                        </g>
                      </svg>`
const lowBoardSvg = ` <svg id="low-svg" width="20" height="14.51" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <path d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z" fill="#7AE229"/>
                          <path d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z" transform="translate(0,07)" fill="#7AE229"/>
                        </g>
                      </svg>`


async function openAddTaskOverlay() {
  const overlayRef = document.getElementById('add-task-overlay');
  const overlayContentRef = document.getElementById('add-task-overlay-content');
  const overlayBackgroundRef = document.getElementById('overlay-background');
  overlayBackgroundRef.classList.remove('d-none');

  if (overlayContentRef.innerHTML.trim() === "") {
    const response = await fetch('add-task.html');
    const html = await response.text();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const content = tempDiv.querySelector('.add-task-content');
    overlayContentRef.appendChild(content.cloneNode(true));

    if (!document.getElementById('add-task-script')) {
      const script = document.createElement('script');
      script.id = 'add-task-script';
      script.src = '../scripts/add-task.js';
      document.body.appendChild(script);
    }
  }

  overlayRef.classList.add('show');
  overlayRef.classList.remove('hide');
  overlayRef.classList.remove('d-none');
}


function closeOverlay() {
  const overlayRef = document.getElementById('add-task-overlay');
  overlayRef.classList.remove('show');
  overlayRef.classList.add('hide');
  const overlayBackgroundRef = document.getElementById('overlay-background');
  overlayBackgroundRef.classList.add('d-none');
  setTimeout(() => {
    overlayRef.classList.add('d-none');
  }, 600);

}

// Drag and Drop Funktionen
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const draggedElement = document.getElementById(data);
  event.target.appendChild(draggedElement);
}

//create new Task

async function createTask() {
  await loadContactsWithoutRendering();

  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-description').value;
  const category = document.getElementById('input-category').innerText;
  const priority = urgentButton.isActive
    ? urgentBoardSvg
    : mediumButton.isActive
      ? mediumBoardSvg
      : lowButton.isActive
        ? lowBoardSvg
        : "";
  let contactsHTML = localStorage.getItem('selectedContactsHTML') || '';

  const newTask = {
    title,
    description,
    category,
    contactsHTML,
    subtasks,
    priority
  };

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.removeItem('selectedContactsHTML');

  window.location.href = "../html/board.html";
}

function loadTasks() {
  const newTaskDiv = document.getElementById('new-task-div');
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  newTaskDiv.innerHTML = '';

  tasks.forEach((task, i) => {
    const totalSubtasks = task.subtasks ? task.subtasks.length : 0;

    const taskElement = document.createElement('div');
    taskElement.innerHTML += boardTaskTemplate(task, i, totalSubtasks);
    newTaskDiv.appendChild(taskElement);
    taskElement.setAttribute("onclick", `openTaskOverlay(${i})`);
  });

  updateCategoryColor();
}

function openTaskOverlay(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const task = tasks[index];

  const overlay = document.getElementById('task-overlay');
  const overlayContent = document.getElementById('task-overlay-content');

  overlayContent.innerHTML = boardTaskOverlayTemplate(task, index, task.subtasks?.length || 0);

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

function clearStorage() {
  localStorage.clear();
}