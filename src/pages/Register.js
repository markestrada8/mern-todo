import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CredentialsContext } from '../App'
import './Register.css'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [, setCredentials] = useContext(CredentialsContext)
  const [error, setError] = useState('')


  const navigate = useNavigate()

  const register = (event) => {
    event.preventDefault()
    axios.post('http://localhost:4000/register', { username: username, password: password })
      .then((response) => {
        setCredentials({
          username,
          password
        })
        navigate('/')
      })
      .catch((error) => {
        console.error('request error: ', error)
        setError(error.response.data.message)
      })
  }

  return (
    <div className='register'>
      <h1>Register</h1>
      <form onSubmit={register}>
        <h2>{error && error}</h2>
        <input
          placeholder='username'
          value={username}
          onChange={(event) => {
            setUsername(event.target.value)
          }} />
        <input
          placeholder='password'
          type='password'
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
          }} />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}
