import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CredentialsContext } from '../App'
import Todos from '../components/Todos'
import './Home.css'

export default function Home() {
  const [{ username, password }] = useContext(CredentialsContext)
  return (
    <div className='home'>
      <h1>Welcome{username && `, ${username}`}</h1>
      {!username && <Link to='/register'>Register</Link>}
      {!username && <Link to='/login'>Login</Link>}
      {username && <Todos />}
    </div>
  )
}
