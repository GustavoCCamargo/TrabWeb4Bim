// script.js

// Seleção dos elementos
const addTaskButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskStatus = document.getElementById('task-status');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-btn');
const taskList = document.getElementById('task-list');

// Função para adicionar uma tarefa
function addTask() {
    const taskText = taskInput.value.trim();
    const status = taskStatus.value;

    if (taskText !== "") {
        // Cria uma nova linha da tabela
        const tr = document.createElement('tr');    
        tr.innerHTML = `
            <td>${taskText}</td>
            <td><strong>${status}</strong></td>
            <td>
                <button class="edit-task">Editar</button>

                
                <!-- Button trigger modal -->
                <button id="concluirbtn" type="button"  data-bs-toggle="modal" data-bs-target="#concluirModal ">
                    Concluir
                </button>
        
                <!-- Modal -->
                <div class="modal fade" id="concluirModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Atenção</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Tem certeza que quer concluir a tarefa?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" class="complete-task">Concluir</button>
                            </div>
                        </div>
                    </div>
                </div>



                <button class="cancel-task">Cancelar</button>
                <button class="remove-task">Remover</button>
            </td>
        `;

        // Adiciona os botões de ação
        const editButton = tr.querySelector('.edit-task');
        const cancelButton = tr.querySelector('.cancel-task');
        const completeButton = tr.querySelector('.complete-task');
        
        const removeButton = tr.querySelector('.remove-task');

        // Função para remover a tarefa
        removeButton.onclick = function() {
            taskList.removeChild(tr);
        };

        // Função para editar a tarefa
        editButton.onclick = function() {
            const newTaskText = prompt("Editar tarefa:", taskText);
            if (newTaskText) {
                tr.querySelector('td').textContent = newTaskText;
            }
        };

        // Função para cancelar a tarefa
        cancelButton.onclick = function() {
            alert("Tarefa cancelada");
            taskList.removeChild(tr);
        };

        // Função para concluir a tarefa
        completeButton.onclick = function() {
            tr.style.textDecoration = "line-through";
            console.log("fazido")
        };

        // Adiciona a nova tarefa à tabela
        taskList.appendChild(tr);

        // Limpa o campo de entrada
        taskInput.value = "";
        taskStatus.value = "alta"; // Reseta o status
    }
}

// Adiciona a tarefa ao clicar no botão
addTaskButton.onclick = addTask;

// Permite adicionar a tarefa pressionando "Enter"
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Função para pesquisar tarefas
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
