let $ = document;


    let todoInputElem = $.getElementById('todoInput');
    let addTodoBtnElem = $.getElementById('addtodobtn');
    let todosContainerElem = $.getElementById('todosContainer') ;
    let value, newTodo, todoId, localStorageTodos;

    let todosArray = [];

    function getNewTodoInfo(){

        value = todoInputElem.value;

        if (value.trim() === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'input fild can`t be empty!!',
            })

            return;
        }

        todoId = Date.now().toString(32);
        newTodo = {id: todoId, title: value , completed: false}
        todosArray.push(newTodo);
        syncToStorage(todosArray);
        showTodos(todosArray)
        todoInputElem.value = '';
    }
    function syncToStorage(myTodos){
        localStorage.setItem('m-todosData', JSON.stringify(myTodos))
    }
    function getTodos(){

        localStorageTodos = JSON.parse(localStorage.getItem('m-todosData'))

        if (localStorageTodos) {
            todosArray = localStorageTodos
        } else {
            todosArray = []
        }
        showTodos(todosArray)
    }
    function showTodos(todos){
        if (todos.length === 0){
            todosContainerElem.innerHTML = '<h3 class="text-center fw-bold text-primary py-4">you have nothing to show yet</h3>'
            return;
        }

        todosContainerElem.innerHTML =''
        todos.forEach( todo => {
            todosContainerElem.insertAdjacentHTML( "beforeend" ,`
                <div class="row px-3 align-items-center todo-item rounded">
                    <div class="col-auto m-1 p-0 d-flex align-items-center">
                        <h3 class="m-0 p-0">
                            ${ todo.completed ? `<input data-id="${todo.id}" onclick="changeStatus(event)" class="form-check-input" type="checkbox" checked />` : `<input data-id="${todo.id}" onclick="changeStatus(event)" class="form-check-input" type="checkbox" />`}
                        </h3>
                    </div>
                    <div class="col px-1 m-1 d-flex align-items-center position-relative">
                        <input onclick="editTodo(event)" type="text" class="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3" readonly value="${todo.title}" />
                        <i onclick="confirmEditTodo(event)" data-id='${todo.id}' class="bi bi-check-circle text-warning btn me-3 p-0 fs-4 position-absolute end-0 d-none"></i>
                    </div>
                    <div class="col-auto m-1 p-0 px-3 d-none">
                    </div>
                    <div class="col-auto m-1 p-0 todo-actions">
                        <div class="row d-flex align-items-center justify-content-end">
                            <h5 class="m-0 p-0 px-2">
                                <i data-id='${todo.id}' onclick="removeTodo(event)" class="bi bi-trash3-fill text-danger btn m-0 p-0 fs-4" data-toggle="tooltip" data-placement="bottom" title="Delete todo"></i>
                            </h5>
                        </div>
                    </div>
                </div>
            `);
        });
    }
    function removeTodo(event){
        localStorageTodos = JSON.parse(localStorage.getItem('m-todosData'));
        todoId = event.target.dataset.id
        todosArray = localStorageTodos;

        let mainTodoIndex = todosArray.findIndex(function (todo) {
            return todo.id === todoId
        })
    
        todosArray.splice(mainTodoIndex, 1)
        syncToStorage(todosArray);
        showTodos(todosArray)
        // event.target.dataset.id
        // event.target.parentElement.parentElement.parentElement.parentElement
    }
    function changeStatus(event){
        localStorageTodos = JSON.parse(localStorage.getItem('m-todosData'));
        todoId = event.target.dataset.id
        todosArray = localStorageTodos;
        todosArray.forEach(function (todo) {
            if (todo.id === todoId) {
               return todo.completed = !todo.completed

            }

    })
    syncToStorage(todosArray)
    showTodos(todosArray)
    }
    function editTodo(event) {
        event.target.removeAttribute("readonly")
        event.target.className = 'form-control form-control-lg border-0 edit-todo-input rounded px-3'
        event.target.nextElementSibling.className = "bi bi-check-circle text-warning btn me-3 p-0 fs-4 position-absolute end-0"
    }
    function confirmEditTodo(event){
        localStorageTodos = JSON.parse(localStorage.getItem('m-todosData'));
        todoId = event.target.dataset.id
        todosArray = localStorageTodos;
        let newValue = event.target.previousElementSibling.value
        if(newValue.trim()){
            todosArray.forEach(function (todo) {
                if (todo.id === todoId) {
                    todo.title = newValue 
                }
            })
        }

        syncToStorage(todosArray)
        showTodos(todosArray)

        console.log(event.target.className);
        event.target.previousElementSibling.className = 'form-control form-control-lg border-0 edit-todo-input rounded px-3 bg-transparent'
        event.targrt.className = "bi bi-check-circle text-warning btn me-3 p-0 fs-4 position-absolute end-0 d-none"
        console.log(event.target.className);

    }

    window.addEventListener('load', getTodos)
    addTodoBtnElem.addEventListener('click', getNewTodoInfo)
    todoInputElem.addEventListener('keypress', (event)=> {if (event.keyCode === 13) getNewTodoInfo()})


// 
// if (data.length === 0){
//     todosContainerElem.innerHTML = '<h3 class="text-center fw-bold text-primary py-4">you have nothing to show yet</h3>'
//     return;
// }

{/* <h3 class="text-center fw-bold text-primary py-4">you have nothing to show yet</h3> */}

// ===============================

//      todosContainerElem.innerHTML =`
            //     <div class="row px-3 align-items-center todo-item rounded">
            //     <div class="col-auto m-1 p-0 d-flex align-items-center">
            //         <h3 class="m-0 p-0">
            //             <input class="form-check-input" type="checkbox">
            //         </h3>
            //     </div>
            //     <div class="col px-1 m-1 d-flex align-items-center">
            //         <input type="text" class="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3" readonly value="Buy groceries for next week" title="Buy groceries for next week" />
            //     </div>
            //     <div class="col-auto m-1 p-0 px-3 d-none">
            //     </div>
            //         <div class="col-auto m-1 p-0 todo-actions">
            //             <div class="row d-flex align-items-center justify-content-end">
            //                 <h5 class="m-0 p-0 px-2">
            //                     <i class="bi bi-check-circle text-danger btn m-0 p-0 fs-4" data-toggle="tooltip" data-placement="bottom" title="Delete todo"></i>
            //                 </h5>
            //             </div>
            //         </div>
            //     </div>
            // `