function contactList(contact) {
    return `
            <div class="contact-content">
            <div class="contact-avatar" style="background-color:${getRandomColor()}">
                ${getInitials(contact.name)}
            </div>
            <div class="contact-info">
                <strong>${contact.name}</strong>
                <a href="mailto:${contact.email}" class="contact-email">${contact.email}</a>
            </div>
        </div>
    `;
}

function showContactContent(contact) {

    const detailsDiv = document.getElementById("contact-details");
    detailsDiv.innerHTML = `
         <div class="show-contact-template">
        <div class="contact-avatar-show" style="background-color:${getRandomColor()}">
         ${getInitials(contact.name)}
        </div>
        <div class="contact-info">
            <h2 style="font-size: 47px; font-weight: 500;">${contact.name}</h2>
            <div class="edit-delete-buttons">
                <button class="edit-delete-button" onclick="editContactOverlay(${contacts.indexOf(contact)})">
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000ff"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                      Edit
                </button>
                <button class="edit-delete-button" onclick="deleteContact(${contacts.indexOf(contact)})">
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000ff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                   Delete </button></div>
             </div>
         </div>
         <div class="contact-additional-info">
              <h3>Contact Information</h3>
              <h4>Email</h4>
              <a href="mailto:${contact.email}" class="contact-email">${contact.email}</a>
              <h4>Phone</h4>
             <p>${contact.phone}</p>
         </div>

            
        `;
}
