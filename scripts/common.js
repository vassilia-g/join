/** 
 * Return a random color string from the palette.
 */
function getRandomColor() {
    const colors = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E", "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B",];
    return colors[Math.floor(Math.random() * colors.length)];
}

const enableEditContactSaveButton = () => {
    const saveContactButton = document.getElementById('save-contact-button');
    if (!saveContactButton) return;
    saveContactButton.disabled = false;
    saveContactButton.classList.remove('disabled-button');
    saveContactButton.classList.add('save-button');
};

const onEditContactFormMutation = (event) => {
    const target = event.target;
    if (!target?.closest) return;
    if (!target.closest('#edit-contact-form')) return;
    enableEditContactSaveButton();
};

document.addEventListener('input', onEditContactFormMutation);
document.addEventListener('change', onEditContactFormMutation);
