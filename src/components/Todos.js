import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { CredentialsContext } from '../App'
import './Todos.css'

export default function Todos() {
  const [todos, setTodos] = useState([{
    checked: false,
    text: 'item one'
  }])
  const [todoText, setTodoText] = useState('')
  const [credentials] = useContext(CredentialsContext)

  const addTodo = (event) => {
    event.preventDefault()
    if (!todoText) return
    setTodos([...todos, { text: todoText, checked: false }])
    setTodoText('')
  }

  useEffect(() => {
    saveTodos()
  }, [todos])


  const handleChange = (event) => {
    event.preventDefault()
    setTodoText(event.target.value)
  }

  const toggleTodo = (index) => {
    const newTodoList = [...todos]
    todos[index].checked = !todos[index].checked
    setTodos(newTodoList)
  }

  const saveTodos = () => {
    console.log(todos)
    axios.post('http://localhost:4000/todos', {
      headers: {
        'content-type': 'application/json',
        'authorization': `Basic ${credentials.username}:${credentials.password}`
      },
      todos
    })
      .then((response) => {
        console.log('successfully saved, response: ', response.data)
      })
    // .catch((error) => {
    //   console.error('request error: ', error)
    //   setError(error.response.data.message)
    // })
  }

  return (
    <div className='todo-form'>
      {todos.map((todo, index) => {
        return (
          <div key={index} className='form-item'>
            <input
              id={`checkbox${index}`}
              type='checkbox'
              onChange={() => toggleTodo(index)} />
            <label htmlFor={`checkbox${index}`}>{todo.text}</label>
          </div>
        )
      })}

      <div className='form-item'>
        <form onSubmit={addTodo}>
          <input type='text' value={todoText} onChange={handleChange} />
          <button type='submit'>Add</button>
        </form>
      </div>
    </div>
  )
}
