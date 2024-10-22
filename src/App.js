import React from 'react'

import Todo from 'features/Todo'
import Layout from 'components/Layout'
import Accueil from './Accueil.js'
import Login from './Login.js'
import Registration from './Registration.js'
import Projet from './Projet.js'
import ProjetAll from './ProjetAll.js'
import ProjetEdit from './ProjetEdit.js'
import UsersList from './UsersList.js'

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
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/projet/add" element={<Projet />} />
        <Route path="/projet/edit/:projectId" element={<ProjetEdit />} />
        <Route path="/projets" element={<ProjetAll />} />
        <Route path="/projet/:projectId" element={<Accueil />} />
        <Route path="/users/all" element={<UsersList />} />
      </Routes>
    </Router>
  )
}

export default App
