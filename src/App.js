import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Register from './pages/Register';
import Welcome from './pages/Home';
import Login from './pages/Login';

export const CredentialsContext = React.createContext()

function App() {
  const credentialsState = useState({
    username: '',
    password: '',
  })


  return (
    <CredentialsContext.Provider value={credentialsState}>
      <Routes>
        <Route exact path="/" element={<Welcome />}></Route>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </CredentialsContext.Provider>
  );
}

export default App;
