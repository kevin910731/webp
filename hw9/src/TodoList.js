import React from "react"
import Todo from "./Todo"
import './index.css'

const TodoList = ({todos, setTodos, filteredTodos}) => {
    return(
        <div className="todo-container">
            <ul className="todo-list">
               {filteredTodos.map((todo) => (
                   <Todo 
                     setTodos={setTodos} 
                     todo={todo} 
                     todos={todos} 
                     text={todo.text}
                     key={todo.id} 
                   />
               ))}
            </ul>
        </div>
    )
}

export default TodoList