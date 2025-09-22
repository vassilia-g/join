function contactList(contact) {
    return `
            <div class="contact-content">
            <div class="contact-avatar" style="background-color:${getRandomColor()}">
                ${getInitials(contact.name)}
            </div>
            <div class="contact-info">
                <strong>${contact.name}</strong>
                <a href="mailto:${contact.email}" class="contact-email">${contact.email
        }</a>
            </div>
        </div>
    `;
}

function showContactContent(contact) {
    return `
         <div class="show-contact-template">
        <div class="contact-avatar-show" style="background-color:${getRandomColor()}">
         ${getInitials(contact.name)}
        </div>
        <div class="contact-info">
            <h2 style="font-size: 47px; font-weight: 500;">${contact.name}</h2>
            <div class="edit-delete-buttons">
                <button onclick="editContact(${contacts.indexOf(
        contact
    )})">Edit</button>
                <button onclick="deleteContact(${contacts.indexOf(
        contact
    )})">Delete</button>
            </div>
        </div>
    </div>
    <div class="contact-additional-info">
        <h3>Contact Information</h3>
        <h4>Email</h4>
        <p>${contact.email}</p>
        <h4>Phone</h4>
        <p>${contact.phone}</p>
    </div>

            
        `;
}
