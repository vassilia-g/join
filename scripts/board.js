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

  overlayRef.classList.remove('d-none');
}


function closeOverlay() {
  const overlayRef = document.getElementById('add-task-overlay');
  overlayRef.classList.add('d-none');
  const overlayBackgroundRef = document.getElementById('overlay-background');
  overlayBackgroundRef.classList.add('d-none');
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

function createTask() {
  const title = document.getElementById('task-title').value;
  const description = document.getElementById('task-description').value;
  const category = document.getElementById('input-category').innerText;
  const subtasks = window.subtasks || [];

  const newTask = {
    title,
    description,
    category,
    subtasks
  };

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  window.location.href = "../html/board.html";
}

function loadTasks() {
  const newTaskDiv = document.getElementById('new-task-div');
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  newTaskDiv.innerHTML = '';

  tasks.forEach((task, i) => {
    const totalSubtasks = task.subtasks ? task.subtasks.length : 0;

    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML += boardTaskTemplate(task, i, totalSubtasks);
    newTaskDiv.appendChild(taskElement);
  });

  updateCategoryColor();
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

