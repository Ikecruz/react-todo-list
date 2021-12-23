import { useEffect, useState } from 'react';
import Header from './Header';
import NoTodo from './NoTodo';
import TodoList from './TodoList';
import {getTodos, addTodos} from '../store/data';
import Footer from './Footer';

const Home = () => {
    let [lightMode, setLightMode] = useState(true);
    let [todos, setTodos] = useState([])
    let [todo, setTodo] = useState('');

    useEffect(() => {
        let todos = getTodos();
        setTodos(todos);
    }, [])

    useEffect(() => {
        if(addTodos(todos)) console.log("added");
        else throw new Error("Something happened");
    }, [todos])

    const handleToggle = () => {
        setLightMode(!lightMode);
    }

    const handleDelete = (id) => {
        let newTodos = todos.filter((todo, index) => index !== id);
        setTodos(newTodos);
    }

    const handleCheck = (id) => {
        let newTodos = todos.map((todo, index) => {
            if(index === id) {
                todo.done = !todo.done;
            }

            return todo;
        })

        setTodos(newTodos);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setTodos([...todos,{name: todo, done: false}]);
        setTodo('');
    }

    const remainingTodos = () => {
        let newarr = todos.filter((todo) => todo.done !== true);

        return newarr.length;
    }

    const handleClearCompleted = () => {
        let newarr = todos.filter((todo) => todo.done !== true);
        setTodos(newarr);
    }

    const handleClearAll = () => {
        setTodos([]);
    }

    return(
        <div className={`${lightMode ? "home light" : "home dark"}`}>
            <Header />
            <div className="body">
                <div className="todo-contain">
                    <div className="toggle-contain">
                        <div>
                            <h2>TODO(S)</h2>
                        </div>
                        <div>
                            <button className='toggle-btn' onClick={handleToggle}><i className={ `fas fa-${lightMode ? 'moon' : 'sun'}` }></i></button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-contain">
                            <div className="icon"><i className="fas fa-pen-nib"></i></div>
                            <input type="text" placeholder='Enter new todo...' value={todo} onChange={(e) => setTodo(e.target.value)}/>
                        </div>
                    </form>

                    <div className="list-contain">
                        {
                            todos.length > 0
                            ? <TodoList todos={ todos } handleCheck={ handleCheck } handleDelete={ handleDelete } remainingTodos={ remainingTodos } handleClearCompleted={ handleClearCompleted } handleClearAll={ handleClearAll } />
                            : <NoTodo />
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;