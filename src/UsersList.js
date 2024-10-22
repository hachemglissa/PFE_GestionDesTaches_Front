import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa' // Icons for edit and delete
import './styles/usersList.css' // Assuming you have a CSS file for custom styling
import { getAllUsers, deleteUser } from './store/actions/authActions'

const UsersList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
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

  const handleEditUser = (userId) => {
    console.log('Edit user:', userId)
  }

  const handleDeleteUser = async (userId) => {
    // Show confirmation popup
    const confirmDelete = window.confirm(
      'Voulez-vous vraiment supprimer cet utilisateur?'
    )

    if (confirmDelete) {
      try {
        await dispatch(deleteUser(userId))
        // Remove the deleted user from the local list immediately
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
        setRefreshKey((prevKey) => prevKey + 1) // Optional: trigger refresh if needed
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
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="actionsColumn">
                <FaEdit
                  className="editIcon"
                  onClick={() => handleEditUser(user.id)}
                />
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
