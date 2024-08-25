export const login = (email, password) => {
  const payload = {
    email: email,
    password: password,
  }
  return async (dispatch) => {
    try {
      await fetch('https://localhost:7220/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('afeffff', res.token)
          localStorage.setItem('token', res.token.replace(/['"]+/g, ''))
        })
    } catch (error) {
      // Error
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
        'https://localhost:7220/api/users/register',
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
export const projet = (name, prescription, startDate, endDate) => {
  const payload = {
    name: name,
    prescription: prescription,
    startDate: startDate,
    endDate: endDate,
  }
  var token = localStorage.getItem('token')
  console.log('token', token)
  return async (dispatch) => {
    try {
      const response = await fetch('https://localhost:7220/api/projets/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(payload),
      })
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
      const response = await fetch('https://localhost:7220/api/projets', {
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
