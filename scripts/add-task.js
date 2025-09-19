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
const contactsToSelect = document.getElementById('contacts-to-select');
const selectedContacts = document.getElementById('selected-contacts');
const dropdownIcon = document.getElementById('dropdown-icon');
const categories = document.getElementById('categories');
const dropdownIconCategories = document.getElementById('dropdown-icon-categories');
const categoryInput = document.getElementById('input-category');
let contacts = ['Jule Zieten', 'Marco Rößler', 'Vassilia Gerodimos', 'Anika Schmidt', 'Dustin Condello'];


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

function openDropdownContacts() {
  if (contactsToSelect.innerHTML == '') {
    for (let i = 0; i < contacts.length; i++) {
      contactsToSelect.innerHTML += showContacts(i);
    }
    setTimeout(() => {
      contactsToSelect.classList.add('show');
    }, 10);
  } else {
    contactsToSelect.classList.remove('show');
    setTimeout(() => {
      contactsToSelect.innerHTML = '';
    }, 300);
    showSelectedContacts();
  }
  dropdownIcon.classList.toggle("open");
}

function showContacts(i) {
  let initials = getInitials(contacts[i]);
  return `
        <div class="single-contact">
          <div class="contact-name">
            <svg id="initials-${i}" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="21" cy="21" r="20" fill="#00BEE8" stroke="white" stroke-width="2"/>
              <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="14" fill="white">
              ${initials}</text>
            </svg>
            <span>${contacts[i]}</span>
          </div>
          <div class="contact-checkbox" id="checkbox-${i}">
            <svg onclick="checkContact(${i})" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4.38818" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
            </svg>
          </div>
        </div>
      `;
}

function getInitials(name) {
  const parts = name.split(" ");
  const first = parts[0].charAt(0);
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
}


function checkContact(i) {
  let checkbox = document.getElementById(`checkbox-${i}`);
  let initials = document.getElementById(`initials-${i}`)

  if (checkbox.classList.contains("checked")) {
    initials.classList.remove("checked");
    checkbox.classList.remove("checked");
    checkbox.innerHTML = showEmptyCheckbox(i);
  } else {
    checkbox.classList.add("checked");
    initials.classList.add("checked");
    checkbox.innerHTML = showCheckedCheckbox(i);
  }
}

function showEmptyCheckbox(i) {
  return `
      <svg onclick="checkContact(${i})" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4.38818" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
      </svg>
    `;
}

function showCheckedCheckbox(i) {
  return `
      <svg onclick="checkContact(${i})" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.3882 11V17C20.3882 18.6569 19.045 20 17.3882 20H7.38818C5.73133 20 4.38818 18.6569 4.38818 17V7C4.38818 5.34315 5.73133 4 7.38818 4H15.3882" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
        <path d="M8.38818 12L12.3882 16L20.3882 4.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
}

function showSelectedContacts() {
  selectedContacts.innerHTML = '';
  let checkedInititals = document.querySelectorAll("svg.checked");
  if (checkedInititals.length < 3) {
    for (let i = 0; i < checkedInititals.length; i++) {
      selectedContacts.innerHTML += `${checkedInititals[i].outerHTML}`;
    }
  } else {
    for (let i = 0; i < 3; i++) {
      selectedContacts.innerHTML += `${checkedInititals[i].outerHTML}`;
    }
    selectedContacts.innerHTML += `
      <svg width="40" height="40" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
        <circle cx="21" cy="21" r="20" fill="none" stroke="#2a3647" stroke-width="2"/>
        <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="16" fill="#2a3647">+${checkedInititals.length - 3}</text>
      </svg>
    `;
  }
}

function openCategories() {
  if (categories.innerHTML == '') {
    categories.innerHTML += showCategories();
    setTimeout(() => {
      categories.classList.add('show');
    }, 10);
  } else {
    categories.classList.remove('show');
    setTimeout(() => {
      categories.innerHTML = '';
    }, 300);
  }
  dropdownIconCategories.classList.toggle("open");
}

function showCategories() {
  return `
    <div class="categories-dropdown">
      <span onclick="showTechnicalTaskInInput()">Technical Task</span>
      <span onclick="showUserStoryInInput()">User Story</span>
    </div>
  `;
}

function showTechnicalTaskInInput() {
  categoryInput.innerHTML = 'Technical Task';
  dropdownIconCategories.classList.toggle("open");
  categories.classList.remove('show');
  categories.innerHTML = '';
}

function showUserStoryInInput() {
  categoryInput.innerHTML = 'User Story';
  dropdownIconCategories.classList.toggle("open");
  categories.classList.remove('show');
  categories.innerHTML = '';
}