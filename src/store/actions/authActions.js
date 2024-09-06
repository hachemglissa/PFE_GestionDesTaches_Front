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
      if (response.ok) {
        localStorage.setItem('token', data.token.replace(/['"]+/g, ''))
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
export const projetAll = () => {
  return async (dispatch) => {
    var token = localStorage.getItem('token')
    dispatch({ type: 'PROJETS_LOAD_REQUEST' })
    try {
      const response = await fetch('https://localhost:7039/api/projets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      console.log('hello', response)
      if (response.ok) {
        // Si la réponse est réussie, extrayez les données JSON
        const data = await response.json()
        console.log('data', data)
        // Dispatch une action avec les données récupérées
        dispatch({ type: 'PROJETS_LOAD_SUCCESS', payload: data })
        localStorage.setItem('list', JSON.stringify(data))
      } else {
        // Si la réponse n'est pas réussie, lancez une erreur
        throw new Error('Erreur lors de la récupération des projets')
      }
    } catch (error) {
      // Error
    }
  }
}
