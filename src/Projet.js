import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/projet.css'
import { createProjet } from './store/actions/projetActions'
import { useDispatch } from 'react-redux'

const Projet = (props) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [status, setStatus] = useState('open') // Définir la valeur par défaut à "open"
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const onButtonClick = async () => {
    if (!name || !description || !startDate || !endDate || !status) {
      setError('All fields are required')
      return
    }

    try {
      await dispatch(
        createProjet(name, description, startDate, endDate, status)
      )
      navigate('/projet')
    } catch (error) {
      console.error('Project creation failed:', error)
      setError('Project creation failed. Please try again.')
    }
  }

  const handleAllProjects = () => {
    navigate('/projet')
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
        <div>Créer un nouveau projet</div>
      </div>
      <br />
      {error && <div className="errorMessage">{error}</div>}
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
        {startDate && (
          <p>Selected Date: {new Date(startDate).toLocaleDateString()}</p>
        )}
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
        {endDate && (
          <p>Selected Date: {new Date(endDate).toLocaleDateString()}</p>
        )}
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

export default Projet
