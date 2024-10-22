export const login = (email, password) => {
  const payload = {
    email: email,
    password: password,
  }
  return async (dispatch) => {
    try {
      const response = await fetch('https://localhost:7039/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      console.log('data', data)
      if (response.ok) {
        localStorage.setItem('token', data.token.replace(/['"]+/g, ''))
        localStorage.setItem('emailUser', data.email)
      } else {
        throw new Error(data.message || 'Login failed')
      }
    } catch (error) {
      throw error
    }
  }
}
export const register = (email, username, password, role) => {
  const payload = {
    email: email,
    username: username,
    password: password,
    role: role,
  }
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://localhost:7039/api/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      )
      console.log('rssss', payload)
    } catch (error) {
      // Error
    }
  }
}
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        'https://localhost:7039/api/users/getAllUsers',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log('hello', response)
      if (response.ok) {
        // Si la réponse est réussie, extrayez les données JSON
        const data = await response.json()
        console.log('data', data)
        // Dispatch une action avec les données récupérées
        dispatch({ type: 'GET_ALL_USERS_SUCCESS', payload: data })
        localStorage.setItem('AllUsers', JSON.stringify(data))
      } else {
        // Si la réponse n'est pas réussie, lancez une erreur
        throw new Error('Erreur lors de la récupération des utilisateurs')
      }
    } catch (error) {
      // Error
    }
  }
}
export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `https://localhost:7039/api/users/deleteuser/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.ok) {
        // Dispatch an action to indicate successful deletion
        dispatch({ type: 'DELETE_USER_SUCCESS', payload: id })
        console.log(`User with ID ${id} deleted successfully`)
      } else {
        throw new Error('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
}
