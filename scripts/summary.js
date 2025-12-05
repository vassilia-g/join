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
    const refs = getSummaryCounterRefs();
    const taskArray = await loadSummaryTasks();
    await updateSummaryCounterValues(refs, taskArray);
    await updateSummaryDueDate(refs.dueDate, taskArray);
}


/**
 * Collect DOM references for summary counters.
 */
function getSummaryCounterRefs() {
    return {
        toDo: document.getElementById('to-do-counter'),
        done: document.getElementById('done-counter'),
        tasksInBoard: document.getElementById('tasks-in-board-counter'),
        inProgress: document.getElementById('tasks-in-progress-counter'),
        awaitingFeedback: document.getElementById('awaiting-feedback-counter'),
        urgent: document.getElementById('urgent-counter'),
        dueDate: document.getElementById('due-date')
    };
}


/**
 * Fetch tasks and convert them into an array.
 */
async function loadSummaryTasks() {
    const allTasks = await tasks;
    if (!allTasks) return [];
    return Object.keys(allTasks).map(key => allTasks[key]);
}


/**
 * Update the numeric summary counters.
 */
async function updateSummaryCounterValues(refs, taskArray) {
    if (!refs) return;
    refs.tasksInBoard.innerHTML = await getTasksCounter(taskArray);
    const statusRefs = {
        toDo: refs.toDo,
        done: refs.done,
        inProgress: refs.inProgress,
        awaitingFeedback: refs.awaitingFeedback
    };
    for (const [status, el] of Object.entries(statusRefs)) {
        el.innerHTML = await getTasksCounterByStatus(taskArray, status);
    }
    refs.urgent.innerHTML = await getTasksCounterByPriorityLevel(taskArray, "urgent");
}


/**
 * Update due date display based on first urgent task.
 */
async function updateSummaryDueDate(dueDateElement, taskArray) {
    if (!dueDateElement) return;
    const firstDueDateTask = await getFirstDueDateTask(taskArray);
    dueDateElement.innerHTML = await getTaskDueDate(firstDueDateTask);
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
