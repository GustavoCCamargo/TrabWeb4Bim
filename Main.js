const addTaskButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskStatus = document.getElementById('task-status');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const taskList = document.getElementById('task-list');

// Adicionar uma tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    const status = taskStatus.value;

    if (taskText !== "") {
        // Nova tarefa
        const tr = document.createElement('tr');    
        tr.innerHTML = `
            <td>${taskText}</td>
            <td><strong>${status}</strong></td>
            <td>
                <button class="editarTarefa">Editar</button>
                <button class="completarTarefa">Completar</button>
                <button class="cancelarTarefa">Cancelar</button>
            </td>
        `;

        // botões das tarefas
        const editarBtn = tr.querySelector('.editarTarefa');
        const cancelarBtn = tr.querySelector('.cancelarTarefa');
        const completarBtn = tr.querySelector('.completarTarefa');

        // Editar tarefa
        editarBtn.onclick = function() {
            const newTaskText = prompt("Editar tarefa:", taskText);
            if (newTaskText) {
                tr.querySelector('td').textContent = newTaskText;
            }
        };

        // Excluir tarefa
        cancelarBtn.onclick = function() {
            alert("Tarefa excluída com sucesso!");
            taskList.removeChild(tr);
        };

        // Concluir tarefa
        completarBtn.onclick = function() {
            tr.style.textDecoration = "line-through";
        };

        // Adiciona a nova tarefa
        taskList.appendChild(tr);

        taskInput.value = ""; // Limpa a entrada
        taskStatus.value = "alta"; // Reseta o status
    }
}

// Adiciona a tarefa ao clicar no botão
addTaskButton.onclick = addTask;

// Adiciona a tarefa pressionando "Enter"
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Pesquisar tarefas
searchButton.onclick = function() {
    const searchTerm = searchInput.value.toLowerCase();
    const tasks = taskList.getElementsByTagName('tr');
    
    for (let i = 0; i < tasks.length; i++) {
        const taskText = tasks[i].textContent.toLowerCase();
        if (taskText.includes(searchTerm)) {
            tasks[i].style.display = "table-row";
        } else {
            tasks[i].style.display = "none";
        }
    }
};
