
const dateInput = document.getElementById("task-due-date");

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