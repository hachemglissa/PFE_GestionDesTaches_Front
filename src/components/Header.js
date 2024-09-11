import React from 'react'

function Header({ projectName }) {
  console.log('Header Project Name:', projectName) // Check what is being received
  return (
    <div className="header_container">
      <h2>{projectName}</h2> {/* Display the project name */}
      <img
        src="/assets/images/avatar.png"
        alt="avatar"
        className="header_avatar"
      />
    </div>
  )
}

export default Header
