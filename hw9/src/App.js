
import React, { useState, useEffect } from "react"
import './index.css'
import Form from "./Form"
import TodoList from "./TodoList"

function App() {
  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState("all")
  const [filteredTodos, setFilteredTodos] = useState([])

  useEffect(() => {
    getLocalTodos()
  }, [])

  useEffect(() => {
    filterHandlerChange()
    saveLocalTodos()
  }, [todos, status])


  function filterHandlerChange() {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true))
        break
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false))
        break
      default:
        setFilteredTodos(todos)
        break
    }
  }

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const getLocalTodos = () => {
    let todoLocal = JSON.parse(localStorage.getItem('todos')) || []
    setTodos(todoLocal)
  }


  return (
    <div className="App">
      <header>
        <h1 id="head">CGU Todo List</h1>
      </header>

      <Form 
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
      />

      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  )
}

export default App;