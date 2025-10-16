const tasks = getData("tasks");

function dropdownMenu() {
    document.querySelector('.dropdown-content').classList.toggle('d-none');
}

async function updateSummaryCounters() {
    let toDoCounter = document.getElementById('to-do-counter');
    let doneCounter = document.getElementById('done-counter');
    let tasksInBoardCounter = document.getElementById('tasks-in-board-counter');
    let tasksInProgressCounter = document.getElementById('tasks-in-progress-counter');
    let awaitingFeedbackCounter = document.getElementById('awaiting-feedback-counter');
    let urgentCounter = document.getElementById('urgent-counter');
    let dueDate = document.getElementById('due-date');

    //Get tasks
    const allTasks = await tasks;
    const taskArray = Object.keys(allTasks).map(key => allTasks[key]);
    console.log(taskArray);

    // Update counters
    tasksInBoardCounter.innerHTML = await getTasksCounter(taskArray);
    toDoCounter.innerHTML = await getTasksCounterByStatus(taskArray, "toDo");
    doneCounter.innerHTML = await getTasksCounterByStatus(taskArray, "done");
    tasksInProgressCounter.innerHTML = await getTasksCounterByStatus(taskArray, "inProgress");
    awaitingFeedbackCounter.innerHTML = await getTasksCounterByStatus(taskArray, "awaitingFeedback");
    urgentCounter.innerHTML = await getTasksCounterByPriorityLevel(taskArray, "urgent");

    const firstDueDateTask = await getFirstDueDateTask(taskArray);
    dueDate.innerHTML = await getTaskDueDate(firstDueDateTask);
}

async function getTasksCounter(allTasks) {
    return allTasks.length;
}

async function getTasksCounterByStatus(allTasks, status) {
    return allTasks.filter(task => task.status === status).length;
}

async function getTasksCounterByPriorityLevel(allTasks, priorityLevel) {
    return allTasks.filter(task => task.priorityLevel === priorityLevel).length;
}

async function getFirstDueDateTask(allTasks) {
    if (!Array.isArray(allTasks) || allTasks.length === 0) return null;

    // Return the first task with priorityLevel 'urgent'
    return allTasks.find(task => task.priorityLevel === 'urgent') || null;
}

async function getTaskDueDate(task) {
    if (!task || !task.dueDate) return '-';

    const parsed = new Date(task.dueDate);
    
    if (isNaN(parsed.getTime())) {
        return String(task.dueDate);
    }
    
    return parsed.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
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

// document.addEventListener("DOMContentLoaded", () => {

// });

document.addEventListener("DOMContentLoaded", () => {
    updateDayTime();
    updateUserName();

    if (localStorage.getItem("currentUserId") === "guest") {
        updateSummaryCounters();
        guestGreeting();
    }

    updateSummaryCounters();
});