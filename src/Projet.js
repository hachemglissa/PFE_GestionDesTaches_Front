import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/login.css'
import { projet } from './store/actions/authActions'
import { useDispatch } from 'react-redux'

const Projet = (props) => {
  const [name, setName] = useState('')
  const [prescription, setPrescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const onButtonClick = () => {
    dispatch(projet(name, prescription, startDate, endDate))
    navigate('/projet')
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
          value={prescription}
          placeholder="Enter your prescription"
          onChange={(ev) => setPrescription(ev.target.value)}
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
