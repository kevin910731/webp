import React from "react"
import './index.css';

const Form = ({inputText, setInputText, todos, setTodos, setStatus }) => { 
    function Inputhandlechange(e) {
       setInputText(e.target.value) 
    }

    function submitHandleChange(e) {
        e.preventDefault()
        setTodos([
            ...todos, 
            { text: inputText, completed: false, id: Math.floor(Math.random() * 100)}
        ])
        setInputText("")
    }

    return(
        <form>
            <div className="input-text">
                <input className="text"
                    type="text"
                    placeholder="mission"
                    value={inputText}
                    onChange={Inputhandlechange}
                />

                <button className="add-button"
                    type="submit"
                    onClick={submitHandleChange}>+</button>
            </div>
        </form>
    )
}

export default Form