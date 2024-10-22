import React from 'react'
import { FaEdit, FaUserCheck } from 'react-icons/fa' // Import both icons
import { useNavigate } from 'react-router-dom'

function Header({ projectName }) {
  const navigate = useNavigate()
  const id = localStorage.getItem('idProjet')
  const nameProj = localStorage.getItem('nameProj')
  const email = localStorage.getItem('email') // Assuming the user's email is stored in localStorage

  // Function to handle navigating to the edit project page
  const handleEditClick = () => {
    navigate(`/projet/edit/${id}`)
  }

  // Function to handle navigating back to the project/all page
  const handleBackClick = () => {
    navigate('/projets')
  }
  return (
    <div className="header_container">
      <button className="back_button" onClick={handleBackClick}>
        ← Back
      </button>
      <h2 className="project_name">
        {' '}
        {/* Add class for styling */}
        {nameProj}
        <FaEdit className="edit_icon" onClick={handleEditClick} />
      </h2>
      <div className="user_info">
        <FaUserCheck className="connected_icon" />
        <span className="email">{email}</span>
      </div>
    </div>
  )
}

export default Header
