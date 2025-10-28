const dateInput = document.getElementById("task-due-date");
const dateWarning = document.getElementById("date-warning");
const fieldWarnings = document.querySelectorAll(".field-warning");
const urgentButton = document.getElementById('urgent-priority-btn');
const urgentSvg = document.getElementById('urgent-svg');
const urgentSvgPath = urgentSvg.querySelectorAll("path");
const mediumButton = document.getElementById('medium-priority-btn');
const mediumSvg = document.getElementById('medium-svg');
const mediumSvgPath = mediumSvg.querySelectorAll("path");
const lowButton = document.getElementById('low-priority-btn');
const lowSvg = document.getElementById('low-svg');
const lowSvgPath = lowSvg.querySelectorAll("path");
urgentButton.isActive = false;
mediumButton.isActive = false;
lowButton.isActive = false;
let globalContactsArray = [];
let checkedContacts = [];
const addToBoardDiv = document.querySelector('.add-task-to-board-div');
let selectedPriority = "";
let selectedCategory = "";
const createTaskButton = document.getElementById("create-task-btn");
if (createTaskButton) {
  createTaskButton.disabled = true;
}
const priorityButtons = [
  document.getElementById('urgent-priority-btn'),
  document.getElementById('medium-priority-btn'),
  document.getElementById('low-priority-btn')
];


document.getElementById("task-title").addEventListener("input", enableCreateTaskButton);
document.getElementById("task-due-date").addEventListener("input", enableCreateTaskButton);


const picker = flatpickr("#task-due-date", {
  dateFormat: "d/m/Y",
  allowInput: true,
  minDate: "today",
  locale: "en",
  clickOpens: false,

  onReady: checkArrows,
  onChange: checkArrows,
  onMonthChange: checkArrows,
  onYearChange: checkArrows
});


function initAddTask() {
  loadContactsWithoutRendering();
};


async function loadContactsWithoutRendering() {
  try {
    const res = await fetch(CONTACTS_URL + ".json");
    contacts = Object.entries(await res.json() || {}).map(([id, c]) => ({
      id,
      name: c.name?.trim() || "Unbekannt",
      email: c.email || "",
      phone: c.phone || "",
      color: c.color || getRandomColor()
    }));
    return contacts;
  } catch (err) {
    console.error("Fehler beim Laden:", err);
    return []; 
  }
};


function showSidebarAndHeader() {
  let sidebar = document.getElementById('sidebar');
  let header = document.getElementById('header');
  let userInitials = localStorage.getItem('userInitials') || 'GU';
  sidebar.innerHTML = showSidebar();
  header.innerHTML = showHeader(userInitials);
};


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
  validateDate(formatted);
});


fieldWarnings.forEach(function (warning) {
  warning.addEventListener("input", function () {
    warning.classList.add("d-none");
  });
});


function validateDate(dateStr) {
  if (!dateStr || dateStr.length !== 10) {
    resetDateValidation();
    return;
  }
  const [day, month, year] = dateStr.split("/").map(n => parseInt(n, 10));
  const inputDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (inputDate < today) {
    dateInput.classList.add("error");
    dateWarning.classList.remove("d-none");
  } else {
    resetDateValidation();
  }
}


function resetDateValidation() {
  dateInput.classList.remove("error");
  dateWarning.classList.add("d-none");
}


function showCalender() {
  picker.open();
};


priorityButtons.forEach(btn => {
  btn.addEventListener('click', () => togglePriorityBtn(btn));
});


function togglePriorityBtn(clickedButton) {
let priorities = ["urgent", "medium", "low"];
  priorities.forEach(pr => {
    const btn = document.getElementById(`${pr}-priority-btn`);
    btn.classList.remove(`priority-${pr}-active`);
    btn.classList.add(`priority-${pr}-default`);
    btn.isActive = false;
  });
  const currentPriority = priorities.find(pr =>
    clickedButton.id.includes(pr)
  );
  if (clickedButton.classList.contains(`priority-${currentPriority}-default`)) {
    clickedButton.classList.remove(`priority-${currentPriority}-default`);
    clickedButton.classList.add(`priority-${currentPriority}-active`);
    clickedButton.isActive = true;
  } else {
    clickedButton.classList.add(`priority-${currentPriority}-default`);
    clickedButton.classList.remove(`priority-${currentPriority}-active`);
    clickedButton.isActive = false;
  }
}


function clearTask() {
  clearAllInputFields();
  changeUrgentBtnToDefault();
  changeMediumBtnToDefault();
  changeLowBtnToDefault();
  setDefaultToContactCheckboxes();
  showSelectedContacts();
  clearSubtaskInput();
  setDefaultToCategoryDropdown();
  setDefaultToContactDropdown();
}


function clearAllInputFields() {
  document.getElementById("task-title").value = '';
  document.getElementById("task-description").value = '';
  dateInput.value = '';
  urgentButton.classList.remove("selected");
  mediumButton.classList.remove("selected");
  lowButton.classList.remove("selected");
  createTaskButton.disabled = true;
}


function setDefaultToContactCheckboxes() {
  document.querySelectorAll('[id^="checkbox-"]').forEach(el => {
    try {
      el.classList.remove("checked");
      const idx = el.id.split('-')[1];
      if (typeof idx !== 'undefined') {
        el.innerHTML = showEmptyCheckbox(idx);
      } else {
        el.innerHTML = '';
      }
    } catch (err) {
      console.error("Fehler beim Zurücksetzen einer Checkbox:", err);
    }
  });
  document.querySelectorAll('[id^="initials-"]').forEach(el => {
    el.classList.remove("checked");
  });
}


function setDefaultToContactDropdown() {
  contactsToSelect.innerHTML = '';
  dropdownIcon.classList.remove('open');
  setTimeout(() => { contactsToSelect.innerHTML = ''; }, 300);
}


function setDefaultToCategoryDropdown() {
  categoryInput.innerHTML = 'Select task category';
  categories.classList.remove('show');
  dropdownIconCategories.classList.remove('open');
  setTimeout(() => { categories.innerHTML = ''; }, 300);
}


function clearSubtaskInput() {
  selectedSubtasks.innerHTML = '';
  subtaskInput.value = '';
  subtaskPick.classList.add('d-none');
}


function enableCreateTaskButton() {
  const title = document.getElementById("task-title").value.trim();
  const category = document.getElementById("input-category").textContent.trim();
  const dueDate = document.getElementById("task-due-date").value.trim();

  if (title !== "" && dueDate !== "" && category !== "Select task category") {
    createTaskButton.disabled = false;
  } else {
    createTaskButton.disabled = true;
  }
}


function showFieldWarning(inputElement) {
  const wrapper = inputElement.closest(".task-label-divs");
  const warning = wrapper.querySelector(".field-warning");
  if (!warning) return;
  if (inputElement.tagName === "INPUT" || inputElement.tagName === "TEXTAREA") {
    if (inputElement.value.trim() === "") {
      warning.classList.remove("d-none");
      inputElement.classList.add("error");
      eventListenerForInput(inputElement, warning);
    }
  }
  if (inputElement.classList.contains("task-category")) {
    const categorySpan = inputElement.querySelector("#input-category");
    if (categorySpan && categorySpan.textContent.trim() === "Select task category") {
      warning.classList.remove("d-none");
      inputElement.classList.add("error");
    }
    eventListenerForSelectCategory(inputElement, warning, categorySpan);
  }
}


function eventListenerForInput(inputElement, warning) {
  if (!inputElement.dataset.listenerAdded) {
    inputElement.addEventListener("input", function () {
      if (inputElement.value.trim() !== "") {
        warning.classList.add("d-none");
        inputElement.classList.remove("error");
      } else {
        warning.classList.remove("d-none");
        inputElement.classList.add("error");
      }
    });
    inputElement.dataset.listenerAdded = "true";
  }
}


function showTaskDiv() {
  addToBoardDiv.classList.remove('hide');
  addToBoardDiv.classList.add('show');

  setTimeout(() => {
    hideTaskDiv();
  }, 1000)
}


function hideTaskDiv() {
  addToBoardDiv.classList.remove('show');
  addToBoardDiv.classList.add('hide');
  createTask();
}
