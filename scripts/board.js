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