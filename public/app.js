const apiUrl = 'http://localhost:5000/api/tasks';

async function loadTasks() {
    try {
        const res = await fetch(apiUrl);
        const tasks = await res.json();
        renderTasks(tasks);
    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}

function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');

    const html = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}">
            <input type="checkbox" 
                   ${task.completed ? 'checked' : ''} 
                   onchange="toggleComplete(${task.id})"
                   class="w-5 h-5 accent-sky-500 cursor-pointer">

            <div class="flex-1">
                <p class="text-lg">${task.title}</p>
                <span class="priority ${task.priority}">${task.priority}</span>
            </div>

            <button onclick="deleteTask(${task.id})" class="delete-btn text-2xl">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    taskList.innerHTML = html;
}

async function addTask() {
    const input = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('priority');

    if (!input.value.trim()) return;

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: input.value.trim(),
                priority: prioritySelect.value
            })
        });

        input.value = '';
        loadTasks();
    } catch (error) {
        console.error("Error adding task:", error);
    }
}

async function toggleComplete(id) {
    try {
        await fetch(`${apiUrl}/${id}`, { method: 'PATCH' });
        loadTasks();
    } catch (error) {
        console.error("Error toggling task:", error);
    }
}

async function deleteTask(id) {
    try {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        loadTasks();
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

// Load tasks when page loads
document.addEventListener('DOMContentLoaded', loadTasks);