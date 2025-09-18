const dateInput = document.getElementById("task-due-date");
const subtaskInput = document.getElementById('task-subtasks');
const subtaskPick = document.getElementById('delete-or-keep-subtask');
const selectedSubtasks = document.getElementById('selected-subtasks');
const urgentButton = document.getElementById('urgent-priority-btn');
const urgentSvg = document.getElementById('urgent-svg');
const urgentSvgPath = urgentSvg.querySelectorAll("path");
const mediumButton = document.getElementById('medium-priority-btn');
const mediumSvg = document.getElementById('medium-svg');
const mediumSvgPath = mediumSvg.querySelectorAll("path");
const lowButton = document.getElementById('low-priority-btn');
const lowSvg = document.getElementById('low-svg');
const lowSvgPath = lowSvg.querySelectorAll("path");

const picker = flatpickr("#task-due-date", {
  dateFormat: "d.m.Y",
  allowInput: true,
  minDate: "today",
  locale: "en",

  onReady: checkArrows,
  onChange: checkArrows,
  onMonthChange: checkArrows,
  onYearChange: checkArrows
});

function checkArrows(selectedDates, dateStr, instance) {
  const minDate = instance.config.minDate;
  const currentYear = instance.currentYear;
  const minYear = minDate.getFullYear();

  const arrowDown = instance.calendarContainer.querySelector(".arrowDown");

  if (arrowDown) {
    if (currentYear <= minYear) {
      arrowDown.style.display = "none";
    } else {
      arrowDown.style.display = "block";
    }
  }
};

dateInput.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 8) value = value.slice(0, 8);

  let formatted = "";
  if (value.length > 0) {
    formatted = value.slice(0, 2);
  }
  if (value.length >= 3) {
    formatted += "/" + value.slice(2, 4);
  }
  if (value.length >= 5) {
    formatted += "/" + value.slice(4, 8);
  }

  e.target.value = formatted;
});

function showCalender() {
  picker.open();
};

function selectSubtask() {
  let subtaskInputValue = subtaskInput.value;
  if (subtaskInputValue.length > 0) {
    subtaskPick.classList.remove('d-none');
  } else {
    subtaskPick.classList.add('d-none');
  }
}

function deleteSubtask() {
  subtaskInput.value = "";
  subtaskPick.classList.add('d-none');
}

function addSubtask() {
  selectedSubtasks.innerHTML += `
    <ul>
      <li>${subtaskInput.value}</li>
    </ul>`;
  subtaskInput.value = "";
  subtaskPick.classList.add('d-none');
}

function changePriorityToUrgent() {
  toggleUrgentBtn();
  changeMediumBtnToDefault();
  changeLowBtnToDefault();
}

function toggleUrgentBtn() {
  if (window.getComputedStyle(urgentButton).backgroundColor === "rgb(255, 255, 255)") {
    urgentButton.style.backgroundColor = "#FF3D00";
    urgentButton.style.color = "#FFFFFF";
    urgentSvgPath.forEach(path => {
      path.setAttribute("fill", "#FFFFFF");
    });
  } else {
    urgentButton.style.backgroundColor = "#FFFFFF";
    urgentButton.style.color = "#000000";
    urgentSvgPath.forEach(path => {
      path.setAttribute("fill", "#FF3D00");
    });
  }
}

function changePriorityToMedium() {
  toggleMediumBtn();
  changeUrgentBtnToDefault();
  changeLowBtnToDefault();
}

function toggleMediumBtn() {
  if (window.getComputedStyle(mediumButton).backgroundColor === "rgb(255, 255, 255)") {
    mediumButton.style.backgroundColor = "#FFA800";
    mediumButton.style.color = "#FFFFFF";
    mediumSvgPath.forEach(path => {
      path.setAttribute("fill", "#FFFFFF");
    });
  } else {
    mediumButton.style.backgroundColor = "#FFFFFF";
    mediumButton.style.color = "#000000";
    mediumSvgPath.forEach(path => {
      path.setAttribute("fill", "#FFA800");
    });
  }
}

function changePriorityToLow() {
  toggleLowBtn();
  changeMediumBtnToDefault();
  changeUrgentBtnToDefault();
}

function toggleLowBtn() {
  if (window.getComputedStyle(lowButton).backgroundColor === "rgb(255, 255, 255)") {
    lowButton.style.backgroundColor = "#7AE229";
    lowButton.style.color = "#FFFFFF";
    lowSvgPath.forEach(path => {
      path.setAttribute("fill", "#FFFFFF");
    });
  } else {
    lowButton.style.backgroundColor = "#FFFFFF";
    lowButton.style.color = "#000000";
    lowSvgPath.forEach(path => {
      path.setAttribute("fill", "#7AE229");
    });
  }
}

function changeMediumBtnToDefault() {
  mediumButton.style.backgroundColor = "#FFFFFF";
  mediumButton.style.color = "#000000";
  mediumSvgPath.forEach(path => {
    path.setAttribute("fill", "#FFA800");
  });
}
function changeLowBtnToDefault() {
  lowButton.style.backgroundColor = "#FFFFFF";
  lowButton.style.color = "#000000";
  lowSvgPath.forEach(path => {
    path.setAttribute("fill", "#7AE229");
  });
}

function changeUrgentBtnToDefault() {
  urgentButton.style.backgroundColor = "#FFFFFF";
  urgentButton.style.color = "#000000";
  urgentSvgPath.forEach(path => {
    path.setAttribute("fill", "#FF3D00");
  });
}