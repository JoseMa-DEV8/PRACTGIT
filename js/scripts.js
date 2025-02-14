/**
 * Representa una tarea con un texto y un estado de completado.
 */
class Task {
    /**
     * Crea una nueva tarea.
     * @param {string} text - El texto de la tarea.
     */
    constructor(text) {
        this.text = text;
        this.completed = false;
    }
}

/**
 * Maneja la lista de tareas, incluyendo agregar, eliminar y modificar su estado.
 */
class TaskManager {
    constructor() {
        /**
         * Lista de tareas almacenadas.
         * @type {Task[]}
         */
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    /**
     * Agrega una nueva tarea a la lista.
     * @param {string} text - El texto de la tarea a agregar.
     */
    addTask(text) {
        const task = new Task(text);
        this.tasks.push(task);
        this.updateLocalStorage();
    }

    /**
     * Elimina una tarea de la lista según su índice.
     * @param {number} index - Índice de la tarea a eliminar.
     */
    removeTask(index) {
        this.tasks.splice(index, 1);
        this.updateLocalStorage();
    }

    /**
     * Alterna el estado de completado de una tarea.
     * @param {number} index - Índice de la tarea a modificar.
     */
    toggleTaskCompleted(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.updateLocalStorage();
    }

    /**
     * Guarda la lista de tareas en el almacenamiento local.
     */
    updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    /**
     * Obtiene la lista de tareas almacenadas.
     * @returns {Task[]} Lista de tareas.
     */
    getTasks() {
        return this.tasks;
    }
}

// Instancia del administrador de tareas
const taskManager = new TaskManager();

/**
 * Agrega una tarea a la lista desde el input del usuario.
 */
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        taskManager.addTask(text);
        taskInput.value = '';
        renderTasks();
    }
}

/**
 * Elimina una tarea de la lista.
 * @param {number} index - Índice de la tarea a eliminar.
 */
function deleteTask(index) {
    taskManager.removeTask(index);
    renderTasks();
}

/**
 * Renderiza la lista de tareas en la interfaz.
 */
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    taskManager.getTasks().forEach((task, index) => {
        const taskEl = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.style.flexGrow = '1';

        if (task.completed) {
            taskText.style.textDecoration = 'line-through';
        }

        /**
         * Botón para borrar la tarea.
         * @type {HTMLButtonElement}
         */
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Borrar';
        deleteBtn.onclick = () => deleteTask(index);
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.classList.add('buttonB'); // Añadir clase buttonB

        taskEl.appendChild(taskText);
        taskEl.appendChild(deleteBtn);
        taskList.appendChild(taskEl);
    });
}

/**
 * Alterna el estado de completado de una tarea y actualiza la vista.
 * @param {number} index - Índice de la tarea a modificar.
 */
function toggleTaskCompleted(index) {
    taskManager.toggleTaskCompleted(index);
    renderTasks();
}

// Evento para agregar tareas al hacer clic en el botón
document.getElementById('addTaskBtn').addEventListener('click', addTask);

// Renderizar las tareas al cargar la página
renderTasks();
