/** 
 * Return a random color string from the palette.
 */
function getRandomColor() {
    const colors = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B",];
    return colors[Math.floor(Math.random() * colors.length)];
}


/**
 * Enable the edit-contact save button once the form has been modified.
 * Removes disabled styling and re-enables the button for submission.
 */
const enableEditContactSaveButton = () => {
    const saveContactButton = document.getElementById('save-contact-button');
    if (!saveContactButton) return;
    saveContactButton.disabled = false;
    saveContactButton.classList.remove('disabled-button');
    saveContactButton.classList.add('save-button');
};


/**
 * Listen for input or change events inside the edit contact form.
 * When any field changes we enable the save button so the user can persist edits.
 * @param {Event} event - DOM input/change event bubbling from the form.
 */
const onEditContactFormMutation = (event) => {
    const target = event.target;
    if (!target?.closest) return;
    if (!target.closest('#edit-contact-form')) return;
    enableEditContactSaveButton();
};


/** 
 * add event listeners to monitor changes in the edit contact form
 */
document.addEventListener('input', onEditContactFormMutation);
document.addEventListener('change', onEditContactFormMutation);