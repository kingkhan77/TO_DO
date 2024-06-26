var StoredTodoString = localStorage.getItem("todos");
//Get the stored todos string from local storage

var todosArray = JSON.parse(StoredTodoString) || [];

renderTodoList();

function renderTodoList() {
    document.getElementById('list').innerHTML = '';
    if (todosArray.length > 0) {
        todosArray.forEach((task, index) => {
            addToList(index, task);
        });
    }
}


document.getElementById("submit").addEventListener('click',
    function (event) {
        event.preventDefault();

        const task = document.getElementById("task").value.trim();

        if (task) {
            todosArray.push(task);
            console.log(todosArray);
            localStorage.setItem('todos', JSON.stringify(todosArray));
            renderTodoList();
            document.getElementById('task').value = '';
        }
    }
);


function addToList(index, new_task) {
    const li = document.createElement('li');
    li.textContent = new_task;
    // li.setAttribute('onclick', 'deleteTask(' + index + ')')

    const done = document.createElement('button');
    done.className = 'mark_as_done';
    done.textContent = '✔';

    done.setAttribute('onclick',
        `event.stopPropagation();
        this.parentNode.style.textDecoration = 'line-through';`
        // localStorage.setItem('todos', JSON.stringify(todosArray));
        // renderTodoList();` 
    );

    const dlt = document.createElement('button');
    dlt.className = 'delete';
    dlt.textContent = '✘';
    dlt.setAttribute('onclick', `deleteTask(${index})`);

    li.appendChild(done);
    li.appendChild(dlt);

    document.getElementById('list').appendChild(li);
    //add new li to ul
}

// document.querySelectorAll('.mark_as_done').forEach(
//     function (button) {
//         button.addEventListener('click', function (e) {
//             e.stopPropagation();
//             this.parentNode.style.textDecoration = 'line-through';
//         })
//     }
// );

function markAsDoneTask(e) {
    // e.stopPropagation();
    this.parentNode.style.textDecoration = 'line-through';
    localStorage.setItem('todos', JSON.stringify(todosArray));
    renderTodoList();
}

function deleteTask(taskIndex) {
    todosArray.splice(taskIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todosArray));
    renderTodoList();
}