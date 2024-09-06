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
  const [status, setStatus] = useState('')
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const onButtonClick = async () => {
    try {
      await dispatch(
        createProjet(name, description, startDate, endDate, status)
      )
      navigate('/projet')
    } catch (error) {
      console.error('Project creation failed:', error)
      // Handle error (e.g., show an error message to the user)
    }
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Créer un nouveau projet</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={name}
          placeholder="Enter your name"
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
        <input
          type="text"
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="inputBox"
        />
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
