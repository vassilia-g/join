/** 
 * References to DOM elements and initial state for add-task UI.
 */
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
const contactsToSelect = document.getElementById('contacts-to-select');
const selectedContacts = document.getElementById('selected-contacts');
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


/** 
 * Attach input listeners for create task button enabling.
 */
document.getElementById("task-title").addEventListener("input", enableCreateTaskButton);
document.getElementById("task-due-date").addEventListener("input", enableCreateTaskButton);


/** 
 * Initialize flatpickr date picker with configuration and arrow handling.
 */
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


/** 
 * Initialize add-task module by loading contacts (without rendering).
 */
function initAddTask() {
  loadContactsWithoutRendering();
};


/** 
 * Load contacts from backend but do not render; return normalized list.
 */
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


/** 
 * Inject sidebar and header markup and username initials into UI.
 */
function showSidebarAndHeader() {
  let sidebar = document.getElementById('sidebar');
  let header = document.getElementById('header');
  let userInitials = localStorage.getItem('userInitials') || 'GU';
  sidebar.innerHTML = showSidebar();
  header.innerHTML = showHeader(userInitials);
};


/** 
 * Manage flatpickr year navigation arrow visibility.
 */
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


/** 
 * Format manual date input while typing and validate.
 */
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




/** 
 * Validate a dd/mm/yyyy date string and show error if in the past.
 */
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


/** 
 * Reset date input validation UI.
 */
function resetDateValidation() {
  dateInput.classList.remove("error");
  dateWarning.classList.add("d-none");
}


/** 
 * Open the flatpickr calendar.
 */
function showCalender() {
  picker.open();
};


/** 
 * Attach toggle handlers to priority buttons.
 */
priorityButtons.forEach(btn => {
  btn.addEventListener('click', () => togglePriorityBtn(btn));
});


/** 
 * Toggle priority button visual state (ensuring single selection).
 */
function togglePriorityBtn(clickedButton) {
  const priorities = ["urgent", "medium", "low"];
  priorities.forEach(pr => {
    const btn = document.getElementById(`${pr}-priority-btn`);
    btn.classList.toggle(`priority-${pr}-active`, false);
    btn.classList.toggle(`priority-${pr}-default`, true);
    btn.isActive = false;
  });
  const current = priorities.find(pr => clickedButton.id.includes(pr));
  const isDefault = clickedButton.classList.contains(`priority-${current}-default`);
  clickedButton.classList.toggle(`priority-${current}-default`, !isDefault);
  clickedButton.classList.toggle(`priority-${current}-active`, isDefault);
  clickedButton.isActive = isDefault;
}


/** 
 * Clear all task inputs and reset UI to defaults.
 */
function clearTask() {
  clearAllInputFields();
  changeButtonsToDefault();
  clearContacts();
  setDefaultToContactCheckboxes();
  showSelectedContacts();
  clearSubtaskInput();
  setDefaultToCategoryDropdown();
  setDefaultToContactDropdown();
}


/** 
 * Reset priority button visuals to default.
 */
function changeButtonsToDefault() {
  mediumButton.classList.remove('priority-medium-active');
  mediumButton.classList.add('priority-medium-default');
  lowButton.classList.remove('priority-low-active');
  lowButton.classList.add('priority-low-default');
  urgentButton.classList.remove('priority-urgent-active');
  urgentButton.classList.add('priority-urgent-default');
}


/** 
 * Clear textual input fields and disable create button.
 */
function clearAllInputFields() {
  document.getElementById("task-title").value = '';
  document.getElementById("task-description").value = '';
  dateInput.value = '';
  urgentButton.classList.remove("selected");
  mediumButton.classList.remove("selected");
  lowButton.classList.remove("selected");
  createTaskButton.disabled = true;
}


/** 
 * Remove selected contacts from local state.
 */
function clearContacts() {
  checkedContacts = [];
}


/** 
 * Reset contact checkboxes UI to unchecked state.
 */
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


/** 
 * Reset the contacts dropdown UI.
 */
function setDefaultToContactDropdown() {
  contactsToSelect.innerHTML = '';
  dropdownIcon.classList.remove('open');
  setTimeout(() => { contactsToSelect.innerHTML = ''; }, 300);
}


/** 
 * Reset category dropdown UI to default.
 */
function setDefaultToCategoryDropdown() {
  categoryInput.innerHTML = 'Select task category';
  categories.classList.remove('show');
  dropdownIconCategories.classList.remove('open');
  setTimeout(() => { categories.innerHTML = ''; }, 300);
}


/** 
 * Clear subtask input area and hide controls.
 */
function clearSubtaskInput() {
  selectedSubtasks.innerHTML = '';
  subtaskInput.value = '';
  subtaskPick.classList.add('d-none');
}


/** 
 * Enable or disable the create-task button based on required fields.
 */
function enableCreateTaskButton() {
  const createTaskButton = document.getElementById("create-task-btn");
  if (!createTaskButton) return;
  const title = document.getElementById("task-title")?.value.trim() || "";
  const category = document.getElementById("input-category")?.textContent.trim() || "";
  const dueDate = document.getElementById("task-due-date")?.value.trim() || "";
  createTaskButton.disabled = !(title && dueDate && category !== "Select task category");
}


/** 
 * Show a field warning for an input or category selection.
 */
function showFieldWarning(el) {
  const wrap = el.closest(".task-label-divs");
  const warn = wrap?.querySelector(".field-warning");
  if (!warn) return;
  if (["INPUT", "TEXTAREA"].includes(el.tagName))
    return handleTextInputWarning(el, warn);
  if (el.classList.contains("task-category")) {
    const span = el.querySelector("#input-category");
    setTimeout(() => handleCategoryWarning(el, span, warn), 150);
  }
}


/** 
 * Show a field warning for an input and attach listeners to hide it.
 */
function handleTextInputWarning(el, warn) {
  if (!el.value.trim()) {
    warn.classList.remove("d-none");
    el.classList.add("error");
    eventListenerForInput(el, warn);
  }
}


/** 
 * Show a field warning for an input and attach listeners to hide it.
 */
function handleCategoryWarning(el, span, warn) {
  const open = document.getElementById("categories")?.classList.contains("show");
  const empty = span?.textContent.trim() === "Select task category";
  warn.classList.toggle("d-none", !empty || open);
  el.classList.toggle("error", empty && !open);
  eventListenerForSelectCategory(el, warn, span);
}


/** 
 * Add input listener to hide/show warning based on content.
 */
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


/** 
 * Animate the small "task added" div into view briefly.
 */
function showTaskDiv() {
  addToBoardDiv.classList.remove('hide');
  addToBoardDiv.classList.add('show');

  setTimeout(() => {
    hideTaskDiv();
  }, 1000)
}


/** 
 * Hide the small "task added" div and proceed to create task.
 */
function hideTaskDiv() {
  addToBoardDiv.classList.remove('show');
  addToBoardDiv.classList.add('hide');
  createTask();
}
