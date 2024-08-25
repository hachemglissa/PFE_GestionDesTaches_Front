import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/login.css'
import { useDispatch, useSelector } from 'react-redux'
import { projetAll } from './store/actions/authActions'

const ProjetAll = () => {
  const dispatch = useDispatch()
  dispatch(projetAll())
  const list = localStorage.getItem('list')
  const lists = JSON.parse(list)

  const navigate = useNavigate()

  const onButtonClick = () => {}

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Tous les projets</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        {lists.map((projet) => (
          <button
            key={projet.id}
            className="inputButtonProjet"
            type="button"
            onClick={onButtonClick}
          >
            <div className="textp">{projet.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProjetAll
