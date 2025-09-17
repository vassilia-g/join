function addContact() {
    const overlay = document.getElementById("overlay-contact");
    const popup = overlay.querySelector(".popup-contact");

    if (overlay.classList.contains("d_none")) {
        overlay.classList.remove("d_none");      
        setTimeout(() => {
            overlay.classList.add("active");     
            popup.classList.add("active");       
        }, 10);
    } else {
        overlay.classList.remove("active");      
        popup.classList.remove("active");        

        popup.addEventListener("transitionend", function handler() {
            overlay.classList.add("d_none");   
            popup.removeEventListener("transitionend", handler);
        });
    }
}