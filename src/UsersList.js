import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa' // Icons for edit, delete, save
import './styles/usersList.css' // Assuming you have a CSS file for custom styling
import {
  getAllUsers,
  deleteUser,
  updateUser,
} from './store/actions/authActions' // Assume you have an updateUser action

const UsersList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [editingUserId, setEditingUserId] = useState(null) // For tracking which user is being edited
  const [editedUserData, setEditedUserData] = useState({}) // Store edited data
  const [refreshKey, setRefreshKey] = useState(0)

  // Get connected user from localStorage (or wherever you store it)
  const connectedUser = localStorage.getItem('emailUser')

  useEffect(() => {
    const fetchUsers = async () => {
      await dispatch(getAllUsers())
      const list = localStorage.getItem('AllUsers')
      const allUsers = JSON.parse(list) || []
      // Filter out the connected user from the list
      const filteredUsers = allUsers.filter(
        (user) => user.email !== connectedUser
      )
      setUsers(filteredUsers)
    }

    fetchUsers()
  }, [dispatch, refreshKey, connectedUser])

  if (!users.length) {
    return <p>No users found or data is loading...</p>
  }

  // Handle edit click, set the current user to edit
  const handleEditUser = (user) => {
    setEditingUserId(user.id) // Set the current user in edit mode
    setEditedUserData(user) // Set the current user data to edit
  }

  // Handle field change for edited data
  const handleFieldChange = (e) => {
    setEditedUserData({
      ...editedUserData,
      [e.target.name]: e.target.value, // Update the field that is being edited
    })
  }

  // Save the updated user information
  const handleSaveUser = async () => {
    try {
      await dispatch(updateUser(editedUserData)) // Call update user API
      setEditingUserId(null) // Exit edit mode
      setRefreshKey((prevKey) => prevKey + 1) // Optional: trigger refresh
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      'Voulez-vous vraiment supprimer cet utilisateur?'
    )

    if (confirmDelete) {
      try {
        await dispatch(deleteUser(userId))
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
        setRefreshKey((prevKey) => prevKey + 1) // Optional: trigger refresh
      } catch (error) {
        console.error('Failed to delete user:', error)
      }
    }
  }

  return (
    <div className="usersListContainer">
      <button className="backButton" onClick={() => navigate('/projets')}>
        Back
      </button>
      <h1 className="usersListTitle">Liste des utilisateurs</h1>
      <table className="usersTable">
        <thead>
          <tr>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* Conditionally render input fields if in edit mode */}
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="userName"
                    value={editedUserData.userName}
                    onChange={handleFieldChange}
                  />
                ) : (
                  user.userName
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="email"
                    value={editedUserData.email}
                    onChange={handleFieldChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="role"
                    value={editedUserData.role}
                    onChange={handleFieldChange}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="actionsColumn">
                {editingUserId === user.id ? (
                  <FaSave
                    className="saveIcon"
                    onClick={handleSaveUser} // Save the edited data
                  />
                ) : (
                  <FaEdit
                    className="editIcon"
                    onClick={() => handleEditUser(user)} // Start editing
                  />
                )}
                <FaTrash
                  className="deleteIcon"
                  onClick={() => handleDeleteUser(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
