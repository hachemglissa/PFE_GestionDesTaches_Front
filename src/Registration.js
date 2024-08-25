import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/login.css'
import { register } from './store/actions/authActions'
import { useDispatch } from 'react-redux'

const Registration = (props) => {
  const [email, setEmail] = useState('')
  const [username, setUserName] = useState('')
  const [role, setRole] = useState('')

  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const onButtonClick = () => {
    dispatch(register(email, username, password, role))
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Register</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder="Enter your username"
          onChange={(ev) => setUserName(ev.target.value)}
          className={'inputBox'}
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <select
          value={role}
          onChange={(ev) => setRole(ev.target.value)}
          className={'inputBox'}
        >
          <option>Selectionner un role</option>
          <option value="Admin">Admin</option>
          <option value="user">User</option>
          <option value="dev">Dev</option>
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

export default Registration
