export const createProjet = (name, description, startDate, endDate, status) => {
  const payload = {
    name: name,
    description: description,
    startDate: startDate,
    endDate: endDate,
    status: status,
  }

  const token = localStorage.getItem('token')
  console.log('token', token)

  return async (dispatch) => {
    try {
      const response = await fetch('https://localhost:7039/api/projets/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        // Handle successful creation
        dispatch({ type: 'PROJECT_CREATED_SUCCESS', payload: data })
      } else {
        // Handle error response
        throw new Error(data.message || 'Project creation failed')
      }
    } catch (error) {
      // Handle network or other errors
      dispatch({ type: 'PROJECT_CREATED_FAILURE', payload: error.message })
      throw error
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
export const projetById = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')

    console.log('Project ID from argument:', id)
    localStorage.getItem('idProjet')

    dispatch({ type: 'PROJETS_LOAD_REQUEST' })

    try {
      const response = await fetch(`https://localhost:7039/api/projets/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      console.log('Response:', response)

      if (response.ok) {
        // Parse the response JSON if the response is successful
        const data = await response.json()
        console.log('Project data:', data)

        // Dispatch an action with the fetched data
        dispatch({ type: 'PROJETS_LOAD_SUCCESS', payload: data })

        // Store data in localStorage
        localStorage.setItem('list', JSON.stringify(data))
        localStorage.setItem('nameProj', data.name || '')
      } else {
        // Handle unsuccessful responses
        throw new Error('Failed to fetch project data')
      }
    } catch (error) {
      console.error('Error fetching project data:', error)
      dispatch({ type: 'PROJETS_LOAD_FAILURE', error: error.message })
    }
  }
}
export const projetEdit = (id, data) => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')
    dispatch({ type: 'PROJETS_LOAD_REQUEST' })
    try {
      const response = await fetch(`https://localhost:7039/api/projets/${id}`, {
        method: 'PUT', // Ensure this is the correct method for your endpoint
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // Parse the response JSON if the response is successful
        const data = await response.json()
        // Dispatch an action with the fetched data
        dispatch({ type: 'PROJETS_LOAD_SUCCESS', payload: data })

        // Store data in localStorage
        localStorage.setItem('list', JSON.stringify(data))
        localStorage.setItem('nameProj', data.name || '') // Ensure `data.name` is a string
      } else {
        // Handle unsuccessful responses
        throw new Error('Failed to fetch project data')
      }
    } catch (error) {
      console.error('Error fetching project data:', error)
      dispatch({ type: 'PROJETS_LOAD_FAILURE', error: error.message })
    }
  }
}
// Exemple d'action pour supprimer un projet
export const deleteProject = (projectId) => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')
    const response = await fetch(
      `https://localhost:7039/api/projets/${projectId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (response.ok) {
      dispatch({ type: 'DELETE_PROJECT_SUCCESS', payload: projectId })
      console.log(`Project with ID ${projectId} deleted successfully`)
    } else {
      throw new Error('Failed to delete project')
    }
  }
}
