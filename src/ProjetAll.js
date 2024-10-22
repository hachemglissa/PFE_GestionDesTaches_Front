import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/projet.css'
import { useDispatch } from 'react-redux'
import { getAllUsers } from './store/actions/authActions'
import { projetAll } from './store/actions/projetActions'

const ProjetAll = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [refreshKey, setRefreshKey] = useState(0)

  // Fetch projects on mount or when refreshKey changes
  useEffect(() => {
    dispatch(projetAll())
  }, [dispatch, refreshKey]) // Depend on refreshKey to trigger refresh

  const list = localStorage.getItem('list')
  const projects = JSON.parse(list) || []

  const onProjectClick = (projectId) => {
    console.log('Selected Project ID:', projectId)
    localStorage.setItem('idProjet', projectId) // Set the project ID in localStorage
    const selectedProject = projects.find((project) => project.id === projectId)
    localStorage.setItem('nameProj', selectedProject.name)
    navigate(`/projet/${projectId}`)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleCreateProject = () => {
    navigate('/projet/add')
    setRefreshKey((prevKey) => prevKey + 1) // Increment key to trigger data refresh
  }
  const handleAllUsers = () => {
    dispatch(getAllUsers()) // Fetch all users
    navigate('/users/all') // Navigate to the UsersList page
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
        <button className="createProjectButton" onClick={handleAllUsers}>
          Liste des utilisateurs
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
              onClick={() => onProjectClick(project.id)}
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
