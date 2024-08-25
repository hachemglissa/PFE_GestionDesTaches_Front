import React from 'react'

import Todo from 'features/Todo'
import Layout from 'components/Layout'
import Accueil from './Accueil.js'
import Login from './Login.js'
import Registration from './Registration.js'
import Projet from './Projet.js'
import ProjetAll from './ProjetAll.js'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/projet/add" element={<Projet />} />
        <Route path="/projet" element={<ProjetAll />} />
        <Route path="/" element={<Accueil />} />
      </Routes>
    </Router>
  )
}

export default App
