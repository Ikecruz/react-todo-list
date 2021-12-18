const getTodos = () => {
    let todos  = [];

    if(localStorage.getItem('todos')) {
        try {
            todos = JSON.parse(localStorage.getItem('todos'));
        } catch(e) {
            localStorage.removeItem('todos');
        }
    }

    return todos;
}

const addTodos = (todos) => {
    try{
        let parsed = JSON.stringify(todos);
        localStorage.setItem('todos', parsed);
        return true;
    } catch(e){
        return false;
    }
}

export {getTodos, addTodos}