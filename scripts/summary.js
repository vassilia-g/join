function updateSummaryCounters() {
    let toDoCounter = document.getElementById('to-do-counter');
    let doneCounter = document.getElementById('done-counter');
    let urgentCounter = document.getElementById('urgent-counter');
    let tasksInBoardCounter = document.getElementById('tasks-in-board-counter');
    let tasksInProgressCounter = document.getElementById('tasks-in-progress-counter');
    let awaitingFeedbackCounter = document.getElementById('awaiting-feedback-counter');
}

async function getUser() {
    const id = localStorage.getItem("currentUserId");
    if (!id) return null;
    try {
        return await User.loadById(id);
    } catch (error) {
        console.error("getUser failed", error);
        return null;
    }
}

// logout helper
function logOut() {
    localStorage.removeItem("currentUserId");
    window.location.replace("../index.html");
}

async function updateUserName() {
    try {
        const el = document.getElementById('user-name');

        const user = await getUser();
        if (!user) {
            console.warn("[updateUserName] getUser() lieferte null.");
            el.textContent = "User";
            return;
        }

        el.textContent = user.username || "User";
    } catch (err) {
        console.error("[updateUserName] Fehler:", err);
        const el = document.getElementById('user-name');
        if (el) el.textContent = "User";
    }
}

function guestGreeting() {
    let welcomeMessage = document.getElementById("welcome-message");
    let userName = document.getElementById("user-name");

    welcomeMessage.innerHTML = "Good Morning!";
    userName.classList.add("d-none");
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("currentUserId") === "guest") {
        guestGreeting();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    updateUserName();
});