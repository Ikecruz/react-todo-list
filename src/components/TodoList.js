const TodoList = ({ todos, handleCheck, handleDelete, remainingTodos, handleClearCompleted, handleClearAll}) => {
    return(
        <div className="main-list-container">
            {
                todos.map((todo, index) => (
                    <div className="list" key={index}>
                        <div className="checker">
                            <input type="checkbox" id={ `inputForm${ index + 1 }` } checked={todo.done} value={todo.done} onChange={() => handleCheck(index)}/>
                        </div>
                        <div className={ todo.done ? 'text done' : 'text' }>
                            <label htmlFor={ `inputForm${ index + 1 }` }>
                                {todo.name}
                            </label>
                        </div>
                        <div className="delete-btn">
                            <button onClick={() => handleDelete(index)}><i className="fal fa-trash-alt"></i></button>
                        </div>
                    </div>
                ))
            }
            <div className="list-footer">
                <div className="count">{ remainingTodos() } todos left</div>
                <div>
                    <button onClick={handleClearCompleted}>Clear Completeed</button>
                </div>
                <div>
                    <button onClick={handleClearAll}>Clear All</button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;