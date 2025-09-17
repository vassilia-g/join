const picker = flatpickr("#task-due-date", {
    dateFormat: "d.m.Y",
    allowInput: true,
    minDate: "today",
    locale: "en"
});

function showCalender() {
    picker.open();
}