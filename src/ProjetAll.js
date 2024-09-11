import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/projet.css'
import { useDispatch } from 'react-redux'
import { projetAll } from './store/actions/authActions'
import Header from '../src/components/Header'

const ProjetAll = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedProjectName, setSelectedProjectName] = useState(
    'Gestion des ressources'
  ) // Initial value

  useEffect(() => {
    dispatch(projetAll())
  }, [dispatch])

  const list = localStorage.getItem('list')
  const projects = JSON.parse(list) || []

  const onProjectClick = (projectId, projectName) => {
    setSelectedProjectName(projectName) // Update the selected project name
    navigate(`/${projectId}`)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleCreateProject = () => {
    navigate('/projet/add')
  }

  return (
    <div className="mainContainer">
      <div className="buttonsContainer">
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
        <button className="createProjectButton" onClick={handleCreateProject}>
          Créer un projet
        </button>
      </div>
      <div className="titleContainer">
        <h1>Tous les projets</h1>
      </div>
      <div className="projectsContainer">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              className="projectCard"
              onClick={() => onProjectClick(project.id, project.name)} // Pass project ID and name
            >
              <div className="projectName">{project.name}</div>
            </div>
          ))
        ) : (
          <p>No projects available</p>
        )}
      </div>
    </div>
  )
}

export default ProjetAll
