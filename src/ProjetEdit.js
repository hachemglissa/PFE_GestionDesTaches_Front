import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  projetById,
  projetEdit,
  projetAll,
} from './store/actions/projetActions'
import './styles/projet.css'

const ProjetEdit = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [status, setStatus] = useState('open')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { projectId } = useParams()

  useEffect(() => {
    if (projectId) {
      // First, dispatch to load project by ID
      dispatch(projetById(projectId))
        .then(() => {
          // Retrieve the project data from localStorage
          const storedList = localStorage.getItem('list')
          if (storedList) {
            const projectData = JSON.parse(storedList)
            // Populate input fields with project data
            setName(projectData.name || '')
            setDescription(projectData.description || '')
            setStartDate(
              projectData.startDate
                ? new Date(projectData.startDate).toISOString().substring(0, 10)
                : ''
            )
            setEndDate(
              projectData.endDate
                ? new Date(projectData.endDate).toISOString().substring(0, 10)
                : ''
            )
            setStatus(projectData.status || 'open')
          }
          setLoading(false)
        })
        .catch((error) => {
          console.error('Failed to fetch project data:', error)
          setError('Failed to load project data.')
          setLoading(false)
        })
      dispatch(projetAll())
    }
  }, [dispatch, projectId])
  const data = {
    name: name,
    description: description,
    startDate: startDate,
    endDate: endDate,
    status: status,
  }
  const idProjet = localStorage.getItem('idProjet')

  const onButtonClick = async () => {
    if (!name || !description || !startDate || !endDate || !status) {
      setError('All fields are required')
      return
    }

    try {
      await dispatch(projetEdit(idProjet, data))
      navigate(`/projet/${projectId}`)
    } catch (error) {
      console.error('Project update failed:', error)
      setError('Project update failed. Please try again.')
    }
    dispatch(projetAll())
  }

  const handleAllProjects = () => {
    dispatch(projetAll())
    navigate('/projets')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className={'mainContainer'}>
      <div className={'buttonsContainer'}>
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
        <button className={'allProjectsButton'} onClick={handleAllProjects}>
          All Projects
        </button>
      </div>
      <div className={'titleContainer'}>
        <h1>Edit Project</h1>
      </div>
      <br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        error && <div className="errorMessage">{error}</div>
      )}
      <div className={'inputContainer'}>
        <input
          value={name}
          placeholder="Enter your project name"
          onChange={(ev) => setName(ev.target.value)}
          className={'inputBox'}
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <textarea
          value={description}
          placeholder="Enter your description"
          onChange={(ev) => setDescription(ev.target.value)}
          className={'inputBox'}
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          className="inputBox"
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          className="inputBox"
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="inputBox"
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={'Save'}
        />
      </div>
    </div>
  )
}

export default ProjetEdit
