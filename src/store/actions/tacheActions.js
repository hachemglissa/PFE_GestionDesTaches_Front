export const createTache = (
  title,
  description,
  priority,
  startDate,
  dueDate,
  projectId,
  statusId
) => {
  const payload = {
    title: title,
    description: description,
    priority: priority,
    startDate: startDate,
    dueDate: dueDate,
    projectId: projectId,
    statusId: statusId,
  }
  const token = localStorage.getItem('token')
  return async (dispatch) => {
    try {
      const response = await fetch('https://localhost:7039/api/taches/new', {
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
        dispatch({ type: 'TACHE_CREATED_SUCCESS', payload: data })
      } else {
        // Handle error response
        throw new Error(data.message || 'Tache creation failed')
      }
    } catch (error) {
      // Handle network or other errors
      dispatch({ type: 'TACHE_CREATED_FAILURE', payload: error.message })
      throw error
    }
  }
}
export const TachesByProjectId = (id) => {
  return async (dispatch) => {
    var token = localStorage.getItem('token')
    dispatch({ type: 'TACHES_LOAD_REQUEST' })
    localStorage.getItem('idProjet')
    try {
      const response = await fetch(
        `https://localhost:7039/api/taches/byproject/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
      if (response.ok) {
        // Si la réponse est réussie, extrayez les données JSON
        const data = await response.json()
        // Dispatch une action avec les données récupérées
        dispatch({ type: 'TACHES_LOAD_SUCCESS', payload: data })
        localStorage.setItem('list', JSON.stringify(data))
      } else {
        // Si la réponse n'est pas réussie, lancez une erreur
        throw new Error('Erreur lors de la récupération des taches')
      }
    } catch (error) {
      // Error
    }
  }
}
export const getTacheById = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')

    localStorage.setItem('id tacheeeeeeeee', id)

    dispatch({ type: 'TACHE_LOAD_REQUEST' })

    try {
      const response = await fetch(`https://localhost:7039/api/taches/${id}`, {
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
        console.log('tache data:', data)

        // Dispatch an action with the fetched data
        dispatch({ type: 'TACHES_LOAD_SUCCESS', payload: data })

        // Store data in localStorage
        localStorage.setItem('list', JSON.stringify(data))
        localStorage.setItem('title', data.title || '')
      } else {
        // Handle unsuccessful responses
        throw new Error('Failed to fetch tache data')
      }
    } catch (error) {
      console.error('Error fetching tache data:', error)
      dispatch({ type: 'TACHES_LOAD_FAILURE', error: error.message })
    }
  }
}
export const editCard = (id, data) => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')
    dispatch({ type: 'TACHES_LOAD_REQUEST' })

    try {
      const response = await fetch(`https://localhost:7039/api/taches/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const responseData = await response.json()
        dispatch({ type: 'TACHES_LOAD_SUCCESS', payload: responseData })

        // Store necessary data in localStorage
        localStorage.setItem('list', JSON.stringify(responseData))
        if (responseData.title) {
          localStorage.setItem('title', responseData.title)
        }
      } else {
        const errorText = await response.text()
        throw new Error(`Failed to fetch tache data: ${errorText}`)
      }
    } catch (error) {
      console.error('Error fetching tache data:', error)
      dispatch({ type: 'TACHES_LOAD_FAILURE', error: error.message })
    }
  }
}

export const removeCard = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')

    dispatch({ type: 'TACHE_DELETE_REQUEST' })

    try {
      const response = await fetch(`https://localhost:7039/api/taches/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        // If deletion is successful, dispatch the success action
        dispatch({ type: 'TACHE_DELETE_SUCCESS', payload: id })
        // Optionally, you can remove the task from localStorage or update it
      } else {
        // Handle error response
        const data = await response.json()
        throw new Error(data.message || 'Failed to delete tache')
      }
    } catch (error) {
      console.error('Error deleting tache:', error)
      dispatch({ type: 'TACHE_DELETE_FAILURE', payload: error.message })
    }
  }
}
export const createStatus = (title, projectId) => {
  const payload = {
    title: title,
    projectId: projectId,
  }
  const token = localStorage.getItem('token')
  return async (dispatch) => {
    try {
      const response = await fetch('https://localhost:7039/api/status/new', {
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
        dispatch({ type: 'STATUS_CREATED_SUCCESS', payload: data })
      } else {
        // Handle error response
        throw new Error(data.message || 'Status creation failed')
      }
    } catch (error) {
      // Handle network or other errors
      dispatch({ type: 'STATUS_CREATED_FAILURE', payload: error.message })
      throw error
    }
  }
}
export const fetchStatuses = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token')
    dispatch({ type: 'STATUS_LOAD_REQUEST' })

    try {
      const response = await fetch('https://localhost:7039/api/status/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        dispatch({ type: 'STATUS_LOAD_SUCCESS', payload: data })
      } else {
        throw new Error('Error fetching statuses')
      }
    } catch (error) {
      dispatch({ type: 'STATUS_LOAD_FAILURE', payload: error.message })
    }
  }
}
