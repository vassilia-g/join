const currentUserId = localStorage.getItem("currentUserId");

function contactList(contact) {
    if (!contact.color) {
        contact.color = "black";
    }
    return `
            <div class="contact-content">
            <div class="contact-avatar no-caret" style="background-color:${contact.color}">
                ${getInitials(contact.name)}
            </div>
            <div class="contact-info">
                <strong class="contact-full-name">${contact.name}</strong>
                <span class="contact-email">${contact.email}</span>
            </div>
        </div>
    `;
}


function showContactContent(contact) {

    const detailsDiv = document.getElementById("contact-details");
    detailsDiv.innerHTML = `
         <div class="show-contact-template">
                 <button class="back-button mobile-only" onclick="hideContactContent()">
                  <svg width="24" height="24" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.43725 8.66673H19.3333C20.0696 8.66673 20.6666 9.26368 20.6666 10.0001C20.6666 10.7364 20.0696 11.3334 19.3333 11.3334H4.43725L10.6466 17.5427C11.1672 18.0634 11.1672 18.9074 10.6466 19.4281C10.126 19.9487 9.28187 19.9487 8.76125 19.4281L0.747464 11.4143C-0.0335847 10.6332 -0.0335831 9.3669 0.747465 8.58585L8.76125 0.57206C9.28187 0.0514398 10.126 0.0514406 10.6466 0.572061C11.1672 1.09268 11.1672 1.93677 10.6466 2.45739L4.43725 8.66673Z" fill="#29ABE2"/>
                  </svg>
                 </button>
        <div class="contact-avatar-show no-caret" style="background-color:${contact.color}">
         ${getInitials(contact.name || contact.username)}
        </div>
        <div class="contact-info">
            <h2 >${contact.name || contact.username}</h2>
            <div class="edit-delete-buttons">
                <button class="edit-delete-button desktop-only" onclick="onEditContact('${contact.id}')">
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000ff"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                      Edit
                </button>
                ${contact.id !== currentUserId
            ? `<button class="edit-delete-button desktop-only" onclick="deleteContactById('${contact.id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000ff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                           Delete
                        </button>`
            : ""}
         </div>
          <div class="mobile-menu mobile-only">
                    <button class="menu-toggle" onclick="toggleMobileMenu(this)">
                        ⋮
                    </button>
                    <div class="menu-options">
                        <button onclick="onEditContact('${contact.id}')">Edit</button>
                        ${contact.id !== currentUserId
            ? `<button onclick="deleteContactById('${contact.id}')">Delete</button>`
            : ""}
                    </div>
                </div>
            </div>
         </div>
         <div class="contact-additional-info">
              <h3>Contact Information</h3>
              <h4>Email</h4>
              <a href="mailto:${contact.email}" class="contact-email">${contact.email}</a>
              <h4>Phone</h4>
             <p>${contact.phone || ''}</p>
         </div>

            
        `;
}


function showOwnContactDetails(user) {
    return `
        <span class="contact-letter">Own Contact Details</span>
        <div id="contact-item" class="contact-content contact-item">
            <div class="contact-avatar no-caret" style="background-color:${user.color}">
                ${getInitials(user.username)}
            </div>
            <div class="contact-info">
                <strong>${user.username}</strong>
                <span class="contact-email">${user.email}</span>
            </div>
        </div>
    `;
}


function showInputButtons(contact) {
    return `
        ${contact !== currentUserId
            ? `<button type="button" onclick="deleteContactById('${contact}')" class="delete-button">
                Delete
            </button>`
            : ""
        }
        <button id="save-contact-button" type="submit" class="disabled-button" disabled>
            Save
            <svg width="24" height="24" viewBox="0 0 25 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_75592_9963" style="mask-type:alpha"
                    maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                    <rect x="0.144531" width="24" height="24" fill="#ffffff" />
                </mask>
                <g mask="url(#mask0_75592_9963)">
                    <path d="M9.69474 15.15L18.1697 6.675C18.3697 6.475 18.6072 6.375 18.8822 6.375C19.1572 6.375 19.3947 6.475 19.5947 6.675C19.7947 6.875 19.8947 7.1125 19.8947 7.3875C19.8947 7.6625 19.7947 7.9 19.5947 8.1L10.3947 17.3C10.1947 17.5 9.96141 17.6 9.69474 17.6C9.42807 17.6 9.19474 17.5 8.99474 17.3L4.69474 13C4.49474 12.8 4.3989 12.5625 4.40724 12.2875C4.41557 12.0125 4.51974 11.775 4.71974 11.575C4.91974 11.375 5.15724 11.275 5.43224 11.275C5.70724 11.275 5.94474 11.375 6.14474 11.575L9.69474 15.15Z"
                    fill="#ffffff" />
                </g>
            </svg>
        </button>
    `;
}
