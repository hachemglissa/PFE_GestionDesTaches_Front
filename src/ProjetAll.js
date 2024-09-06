import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/projet.css'
import { useDispatch } from 'react-redux'
import { projetAll } from './store/actions/authActions'

const ProjetAll = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(projetAll())
  }, [dispatch])

  const list = localStorage.getItem('list')
  const projects = JSON.parse(list)

  const navigate = useNavigate()

  const onProjectClick = (projectId) => {
    navigate(`/project/${projectId}`)
  }

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <h1>Tous les projets</h1>
      </div>
      <div className="projectsContainer">
        {projects.map((project) => (
          <div
            key={project.id}
            className="projectCard"
            onClick={() => onProjectClick(project.id)}
          >
            <div className="projectName">{project.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjetAll
