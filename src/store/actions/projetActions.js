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
