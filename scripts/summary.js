function dropdownMenu() {
    document.querySelector('.dropdown-content').classList.toggle('d-none');
}

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

async function updateDayTime() {
    const welcomeMsg = document.getElementById('welcome-message');
    const userName = document.getElementById('user-name');
    const currentUserId = localStorage.getItem("currentUserId");
    const isGuest = currentUserId === "guest";
    const punctuation = isGuest ? "!" : ",";
    const now = new Date();
    const hour = now.getHours();

    guestGreeting(userName, isGuest);
    updateUserGreeting(welcomeMsg, hour, punctuation);
}

function updateUserGreeting(welcomeMsg, hour, punctuation) {
    if (hour >= 3 && hour < 12) {
        welcomeMsg.innerHTML = `Good Morning${punctuation}`;
    } else if (hour >= 12 && hour < 17) {
        welcomeMsg.innerHTML = `Good Afternoon${punctuation}`;
    } else if (hour >= 17 && hour < 22) {
        welcomeMsg.innerHTML = `Good Evening${punctuation}`;
    } else {
        welcomeMsg.innerHTML = `Good Night${punctuation}`;
    }
}

function guestGreeting(userName, isGuest) {
    if (isGuest) {
        userName.classList.add("d-none");
    } else {
        userName.classList.remove("d-none");
    }
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

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("currentUserId") === "guest") {
        guestGreeting();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    updateDayTime();
    updateUserName();
});