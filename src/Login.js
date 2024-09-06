import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/login.css'
import { useDispatch } from 'react-redux'
import { login } from './store/actions/authActions'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const validate = () => {
    let isValid = true
    if (!email) {
      setEmailError('Email is required')
      isValid = false
    } else {
      setEmailError('')
    }
    if (!password) {
      setPasswordError('Password is required')
      isValid = false
    } else {
      setPasswordError('')
    }
    return isValid
  }

  const onButtonClick = async () => {
    if (validate()) {
      try {
        await dispatch(login(email, password))
        navigate('/projet')
      } catch (error) {
        setEmailError('Invalid email or password')
        setPasswordError('Invalid email or password')
      }
    }
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
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
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={'Log in'}
        />
      </div>
    </div>
  )
}

export default Login
