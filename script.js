const taskInput = document.querySelector(".taskInput");
const addTaskButton = document.querySelector(".addTask");

addTaskButton.addEventListener("click", addTask);

let tasks = [];
const loadedTasks = JSON.parse(localStorage.getItem("tasks"));

if(loadedTasks.length > 0){
    tasks = loadedTasks;
}

function renderTasks(){
    const taskList = document.querySelector(".taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index)=>{
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
            <div class="taskInfo ${task.completed == true ? `completed` : ''}">
                    <input type="checkbox" class="taskCheckbox" onclick =  "toggleTask(${index})" ${task.completed == true ? `checked` : ''}>
                    <p class="taskContent">${task.text}</p>
            </div>
            <button class="deleteTask" onclick="deleteTask(${index})">Удалить</button>
        `
        taskList.append(taskElement);
    });

    saveTasks();
}

function toggleTask(index){
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index){
    tasks.splice(index, 1);
    renderTasks();
}

function saveTasks(){
    const data = JSON.stringify(tasks);
    localStorage.setItem("tasks", data);
}

function addTask(){
    const text = taskInput.value.trim();
    if(text != ""&& text.length > 3){
        tasks.push({
            text: text,
            completed: false
        })
        taskInput.value = "";
        renderTasks();
    }
}


renderTasks();