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
    let valid = true

    if (!email.includes('@')) {
      setEmailError('Invalid email format')
      valid = false
    } else {
      setEmailError('')
    }

    if (password.length < 6) {
      setPasswordError('Password should be at least 6 characters')
      valid = false
    } else {
      setPasswordError('')
    }

    if (valid) {
      dispatch(register(email, username, password, role))
      navigate('/login') // Redirect to login page
      // Or navigate('/home'); // Redirect to home page
    }
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
        <label className="errorLabel">{emailError}</label>
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
          type="password"
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
          <option>Select a role</option>
          <option value="Admin">Admin</option>
          <option value="Developer">Developer</option>
          <option value="TeamLeader">TeamLeader</option>
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
