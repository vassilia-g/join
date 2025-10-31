/**
 * Gets from api.js function getData()
 * loads task by given it's parameter
 */
const tasks = getData("tasks");


/** 
 * Toggle dropdown visibility 
 */
function dropdownMenu() {
    document.querySelector('.dropdown-content').classList.toggle('d-none');
}


/** 
 * Update all summary counters and due date display 
 */
async function updateSummaryCounters() {
    let toDoCounter = document.getElementById('to-do-counter');
    let doneCounter = document.getElementById('done-counter');
    let tasksInBoardCounter = document.getElementById('tasks-in-board-counter');
    let tasksInProgressCounter = document.getElementById('tasks-in-progress-counter');
    let awaitingFeedbackCounter = document.getElementById('awaiting-feedback-counter');
    let urgentCounter = document.getElementById('urgent-counter');
    let dueDate = document.getElementById('due-date');

    /**
     * Get tasks 
     */
    const allTasks = await tasks;
    const taskArray = Object.keys(allTasks).map(key => allTasks[key]);

    /** Update counters */
    tasksInBoardCounter.innerHTML = await getTasksCounter(taskArray);
    toDoCounter.innerHTML = await getTasksCounterByStatus(taskArray, "toDo");
    doneCounter.innerHTML = await getTasksCounterByStatus(taskArray, "done");
    tasksInProgressCounter.innerHTML = await getTasksCounterByStatus(taskArray, "inProgress");
    awaitingFeedbackCounter.innerHTML = await getTasksCounterByStatus(taskArray, "awaitingFeedback");
    urgentCounter.innerHTML = await getTasksCounterByPriorityLevel(taskArray, "urgent");

    const firstDueDateTask = await getFirstDueDateTask(taskArray);
    dueDate.innerHTML = await getTaskDueDate(firstDueDateTask);
}


/** 
 * Return total number of tasks 
 */
async function getTasksCounter(allTasks) {
    return allTasks.length;
}


/** 
 * Count tasks matching given status 
 */
async function getTasksCounterByStatus(allTasks, status) {
    return allTasks.filter(task => task.status === status).length;
}


/** 
 * Count tasks matching given priority level 
 */
async function getTasksCounterByPriorityLevel(allTasks, priorityLevel) {
    return allTasks.filter(task => task.priorityLevel === priorityLevel).length;
}


/** 
 * Return first urgent task from array (or null) 
 */
async function getFirstDueDateTask(allTasks) {
    if (!Array.isArray(allTasks) || allTasks.length === 0) return null;
    return allTasks.find(task => task.priorityLevel === 'urgent') || null;
}


/** 
 * Format a task due date for display 
 */
async function getTaskDueDate(task) {
    if (!task || !task.dueDate) return '-';

    const parsed = new Date(task.dueDate);

    if (isNaN(parsed.getTime())) {
        return String(task.dueDate);
    }

    return parsed.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
}


/** 
 * Update greeting and user-related time info 
 */
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


/** 
 * Set welcome text based on hour of day 
 */
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


/** 
 * Show or hide username for guest users 
 */
function guestGreeting(userName, isGuest) {
    if (isGuest) {
        userName.classList.add("d-none");
    } else {
        userName.classList.remove("d-none");
    }
}


/** 
 * Load and display current user's name 
 */
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

/**
 * Initializes the Board summary once the DOM is fully loaded.
 * Updates counters, daytime greeting, and username display.
 * If a guest user is detected, triggers the guest greeting function.
 */
document.addEventListener("DOMContentLoaded", () => {
    updateSummaryCounters();
    updateDayTime();
    updateUserName();

    if (localStorage.getItem("currentUserId") === "guest") {
        guestGreeting();
    }
});