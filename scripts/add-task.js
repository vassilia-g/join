const dateInput = document.getElementById("task-due-date");
const dateWarning = document.getElementById("date-warning");
const fieldWarnings = document.querySelectorAll(".field-warning");
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
const contactInputAndDropdown = document.getElementById('contact-input-and-dropdown');
const categoryInputAndDropdown = document.getElementById('category-input-and-dropdown');
let contacts = ['Jule Zieten', 'Marco Rößler', 'Vassilia Gerodimos', 'Anika Schmidt', 'Dustin Condello'];
let subtasks = [];
const createTaskButton = document.getElementById("create-task-btn");
createTaskButton.disabled = true;

document.getElementById("task-title").addEventListener("input", enableCreateTaskButton);
document.getElementById("task-due-date").addEventListener("input", enableCreateTaskButton);
categoryInput.addEventListener("DOMSubtreeModified", enableCreateTaskButton);


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

fieldWarnings.forEach(function(warning) {
  warning.addEventListener("input", function() {
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
  subtasks.push(subtaskInput.value);
  console.log(subtasks);
  selectedSubtasks.innerHTML = "";
  for (let index = 0; index < subtasks.length; index++) {
    selectedSubtasks.innerHTML += showSubtask(index);
  }
  subtaskInput.value = "";
  subtaskPick.classList.add('d-none');
}

function showSubtask(index) {
  return `
      <div class="subtask-list-element">
        <li>${subtasks[index]}</li>
        <div class="delete-or-edit-icons">
          <svg id="edit-svg-${index}" onclick="editSubtask()" class="edit-svg" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_75592_9969" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
              <rect x="0.144531" width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_75592_9969)">
              <path d="M5.14453 19H6.54453L15.1695 10.375L13.7695 8.975L5.14453 17.6V19ZM19.4445 8.925L15.1945 4.725L16.5945 3.325C16.9779 2.94167 17.4487 2.75 18.007 2.75C18.5654 2.75 19.0362 2.94167 19.4195 3.325L20.8195 4.725C21.2029 5.10833 21.4029 5.57083 21.4195 6.1125C21.4362 6.65417 21.2529 7.11667 20.8695 7.5L19.4445 8.925ZM17.9945 10.4L7.39453 21H3.14453V16.75L13.7445 6.15L17.9945 10.4Z" fill="#2A3647"/>
            </g>
          </svg>
          <svg id="delete-svg-${index}" onclick="deleteSubtaskFromList()" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_75592_9951" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
              <rect x="0.144531" width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_75592_9951)">
              <path d="M7.14453 21C6.59453 21 6.1237 20.8042 5.73203 20.4125C5.34036 20.0208 5.14453 19.55 5.14453 19V6C4.8612 6 4.6237 5.90417 4.43203 5.7125C4.24036 5.52083 4.14453 5.28333 4.14453 5C4.14453 4.71667 4.24036 4.47917 4.43203 4.2875C4.6237 4.09583 4.8612 4 5.14453 4H9.14453C9.14453 3.71667 9.24036 3.47917 9.43203 3.2875C9.6237 3.09583 9.8612 3 10.1445 3H14.1445C14.4279 3 14.6654 3.09583 14.857 3.2875C15.0487 3.47917 15.1445 3.71667 15.1445 4H19.1445C19.4279 4 19.6654 4.09583 19.857 4.2875C20.0487 4.47917 20.1445 4.71667 20.1445 5C20.1445 5.28333 20.0487 5.52083 19.857 5.7125C19.6654 5.90417 19.4279 6 19.1445 6V19C19.1445 19.55 18.9487 20.0208 18.557 20.4125C18.1654 20.8042 17.6945 21 17.1445 21H7.14453ZM7.14453 6V19H17.1445V6H7.14453ZM9.14453 16C9.14453 16.2833 9.24036 16.5208 9.43203 16.7125C9.6237 16.9042 9.8612 17 10.1445 17C10.4279 17 10.6654 16.9042 10.857 16.7125C11.0487 16.5208 11.1445 16.2833 11.1445 16V9C11.1445 8.71667 11.0487 8.47917 10.857 8.2875C10.6654 8.09583 10.4279 8 10.1445 8C9.8612 8 9.6237 8.09583 9.43203 8.2875C9.24036 8.47917 9.14453 8.71667 9.14453 9V16ZM13.1445 16C13.1445 16.2833 13.2404 16.5208 13.432 16.7125C13.6237 16.9042 13.8612 17 14.1445 17C14.4279 17 14.6654 16.9042 14.857 16.7125C15.0487 16.5208 15.1445 16.2833 15.1445 16V9C15.1445 8.71667 15.0487 8.47917 14.857 8.2875C14.6654 8.09583 14.4279 8 14.1445 8C13.8612 8 13.6237 8.09583 13.432 8.2875C13.2404 8.47917 13.1445 8.71667 13.1445 9V16Z" fill="#2A3647"/>
            </g>
          </svg>
        </div>
      </div>
    `;
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
  selectedContacts.innerHTML = '';
  if (contactsToSelect.innerHTML == '') {
    for (let i = 0; i < contacts.length; i++) {
      contactsToSelect.innerHTML += showContacts(i);
    }
    setTimeout(() => {
      contactsToSelect.classList.add('show');
    }, 10);
  } else {
    hideDropdownContacts();
    showSelectedContacts();
  }
  dropdownIcon.classList.toggle("open");
}

document.onclick = function (event) {
  const isClickOnSvg = event.target.closest('svg');
  if (isClickOnSvg) {
    return;
  }
  if (!contactInputAndDropdown.contains(event.target) && contactsToSelect.classList.contains('show')) {
    hideDropdownContacts();
    dropdownIcon.classList.toggle("open");
    showSelectedContacts();
  }
  if (!categoryInputAndDropdown.contains(event.target) && categories.classList.contains('show')) {
    hideDropdownCategories();
    dropdownIconCategories.classList.toggle("open");
  }
}

function hideDropdownContacts() {
  contactsToSelect.classList.remove('show');
  setTimeout(() => {
    contactsToSelect.innerHTML = '';
  }, 300);
}

function hideDropdownCategories() {
  categories.classList.remove('show');
  setTimeout(() => {
    categories.innerHTML = '';
  }, 300);
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
  let checkedInitials = document.querySelectorAll("svg.checked");
  if (checkedInitials.length < 3) {
    for (let i = 0; i < checkedInitials.length; i++) {
      selectedContacts.innerHTML += `<div class="selected-contacts-svg">${checkedInitials[i].outerHTML}</div>`;
    }
  } else {
    for (let i = 0; i < 3; i++) {
      selectedContacts.innerHTML += `<div class="selected-contacts-svg">${checkedInitials[i].outerHTML}</div>`;
    }
    selectedContacts.innerHTML += showMoreContacts(checkedInitials);
  }
}

function showMoreContacts(checkedInitials) {
  return `
      <div class="selected-contacts-svg">
        <svg width="40" height="40" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21" cy="21" r="20" fill="none" stroke="#2a3647" stroke-width="2"/>
          <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="16" fill="#2a3647">+${checkedInitials.length - 3}</text>
        </svg>
      </div>
    `;
}

function openCategories() {
  if (categories.innerHTML == '') {
    categories.innerHTML += showCategories();
    setTimeout(() => {
      categories.classList.add('show');
    }, 10);
  } else {
    hideDropdownCategories();
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
  enableCreateTaskButton();
}

function showUserStoryInInput() {
  categoryInput.innerHTML = 'User Story';
  dropdownIconCategories.classList.toggle("open");
  categories.classList.remove('show');
  categories.innerHTML = '';
  enableCreateTaskButton();
}

function clearTask() {
  clearAllInputFields();
  changeUrgentBtnToDefault();
  changeMediumBtnToDefault();
  changeLowBtnToDefault();
  setDefaultToContactCheckboxes();
  showSelectedContacts();
  clearSubtaskInput()
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

function eventListenerForSelectCategory(inputElement, warning, categorySpan) {
  if (!inputElement.dataset.listenerAdded) {
      const observer = new MutationObserver(() => {
        if (categorySpan.textContent.trim() !== "Select task category") {
          warning.classList.add("d-none");
          inputElement.classList.remove("error");
        } else {
          warning.classList.remove("d-none");
          inputElement.classList.add("error");
        }
      });
      observer.observe(categorySpan, { childList: true, characterData: true, subtree: true });
      inputElement.dataset.listenerAdded = "true";
    }
}


