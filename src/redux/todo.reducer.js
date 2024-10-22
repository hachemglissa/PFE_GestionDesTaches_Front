/* ACTION TYPES */
const FETCH_LISTS_REQUEST = 'TRELLO/FETCH_LISTS_REQUEST'
const FETCH_LISTS_SUCCESS = 'TRELLO/FETCH_LISTS_SUCCESS'
const FETCH_LISTS_FAILURE = 'TRELLO/FETCH_LISTS_FAILURE'

const FETCH_USERS_BY_ROLE_SUCCESS = 'TRELLO/FETCH_USERS_BY_ROLE_SUCCESS'
const FETCH_USERS_BY_ROLE_FAILURE = 'TRELLO/FETCH_USERS_BY_ROLE_FAILURE'

const ADD_LIST_REQUEST = 'TRELLO/ADD_LIST_REQUEST'
const ADD_LIST_SUCCESS = 'TRELLO/ADD_LIST_SUCCESS'
const ADD_LIST_FAILURE = 'TRELLO/ADD_LIST_FAILURE'

const CHANGE_TITLE_LIST_REQUEST = 'TRELLO/CHANGE_TITLE_LIST_REQUEST'
const CHANGE_TITLE_LIST_SUCCESS = 'TRELLO/CHANGE_TITLE_LIST_SUCCESS'
const CHANGE_TITLE_LIST_FAILURE = 'TRELLO/CHANGE_TITLE_LIST_FAILURE'

const REMOVE_LIST_REQUEST = 'TRELLO/REMOVE_LIST_REQUEST'
const REMOVE_LIST_SUCCESS = 'TRELLO/REMOVE_LIST_SUCCESS'
const REMOVE_LIST_FAILURE = 'TRELLO/REMOVE_LIST_FAILURE'

const ADD_CARD_REQUEST = 'TRELLO/ADD_CARD_REQUEST'
const ADD_CARD_SUCCESS = 'TRELLO/ADD_CARD_SUCCESS'
const ADD_CARD_FAILURE = 'TRELLO/ADD_CARD_FAILURE'

const ADD_CARD = 'TRELLO/ADD_CARD'
const REMOVE_CARD = 'TRELLO/REMOVE_CARD'
const EDIT_CARD = 'TRELLO/EDIT_CARD'

const DRAG_END_LIST = 'TRELLO/DRAG_END_LIST'
const DRAG_END_CARD = 'TRELLO/DRAG_END_CARD'

const GET_CARD_BY_ID_REQUEST = 'TRELLO/GET_CARD_BY_ID_REQUEST'
const GET_CARD_BY_ID_SUCCESS = 'TRELLO/GET_CARD_BY_ID_SUCCESS'
const GET_CARD_BY_ID_FAILURE = 'TRELLO/GET_CARD_BY_ID_FAILURE'

export const fetchLists = (projectId) => async (dispatch) => {
  dispatch({ type: FETCH_LISTS_REQUEST })
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(
      `https://localhost:7039/api/status/all/${projectId}`,
      {
        // Updated URL to include projectId
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch lists') // Handle response errors
    }

    const data = await response.json()
    dispatch({ type: FETCH_LISTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: FETCH_LISTS_FAILURE, payload: error.message })
  }
}

export const addList = (title) => async (dispatch) => {
  dispatch({ type: ADD_LIST_REQUEST })
  const token = localStorage.getItem('token')
  const projectId = localStorage.getItem('idProjet')
  const payload = {
    title: title.title,
    projectId: Number(projectId),
  }
  try {
    const response = await fetch('https://localhost:7039/api/status/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(payload),
    })
    const data = await response.json()
    dispatch({ type: ADD_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ADD_LIST_FAILURE, payload: error.message })
  }
}

export const changeTitleList = (listId, title) => async (dispatch) => {
  dispatch({ type: CHANGE_TITLE_LIST_REQUEST })
  const token = localStorage.getItem('token')

  const nombres = listId.match(/\d+/g)
  const projectId = localStorage.getItem('idProjet')

  try {
    await fetch(`https://localhost:7039/api/status/${nombres}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ title, projectId }),
    })
    dispatch({ type: CHANGE_TITLE_LIST_SUCCESS, payload: { listId, title } })
  } catch (error) {
    dispatch({ type: CHANGE_TITLE_LIST_FAILURE, payload: error.message })
  }
}

export const removeList = (listId) => async (dispatch) => {
  dispatch({ type: REMOVE_LIST_REQUEST })
  const token = localStorage.getItem('token')
  const projectId = localStorage.getItem('idProjet')

  const Id = Number(listId.match(/\d+/g))
  console.log('nbrrrr', Id)
  try {
    await fetch(`https://localhost:7039/api/status/${Id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
    dispatch({ type: REMOVE_LIST_SUCCESS, payload: Id })
    dispatch(fetchLists(projectId)) // Récupérer la liste à jour
  } catch (error) {
    dispatch({ type: REMOVE_LIST_FAILURE, payload: error.message })
  }
}

export const addCard = (listId, card) => async (dispatch) => {
  dispatch({ type: ADD_CARD_REQUEST }) // You might want to define this action type

  const token = localStorage.getItem('token')
  const projectId = localStorage.getItem('idProjet')
  const cardId = localStorage.getItem('idProjet')

  try {
    const response = await fetch('https://localhost:7039/api/taches/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(card),
    })

    if (!response.ok) {
      throw new Error('Failed to add card')
    }

    const data = await response.json()
    dispatch({ type: ADD_CARD_SUCCESS, payload: { listId, card: data } })
    dispatch(fetchLists(projectId)) // Récupérer la liste à jour
  } catch (error) {
    dispatch({ type: ADD_CARD_FAILURE, payload: error.message })
  }
}

export const removeCard = (listId, cardId) => async (dispatch) => {
  dispatch({ type: REMOVE_CARD, payload: { listId, cardId } })

  const token = localStorage.getItem('token') // Récupérer le token d'authentification
  const id = cardId // ID de la tâche (card) à supprimer
  const Id = Number(id.match(/\d+/g))

  try {
    // Requête dynamique avec l'ID de la tâche dans l'URL
    const response = await fetch(`https://localhost:7039/api/taches/${Id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token, // Authentification avec Bearer token
      },
    })

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de la tâche')
    }

    // Dispatch d'une action supplémentaire si nécessaire
    console.log(`Tâche ${Id} supprimée avec succès`)
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error)
  }
}

export const editCard = (cardId, updatedCardDetails) => async (dispatch) => {
  const token = localStorage.getItem('token')
  const Id = Number(cardId.match(/\d+/g))

  try {
    // Make the PUT request to update the card details
    const response = await fetch(`https://localhost:7039/api/taches/${Id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(updatedCardDetails), // Send the updated card details
    })

    if (!response.ok) {
      throw new Error('Failed to update card') // Handle response errors
    }
    const data = await response.json()
    dispatch({
      type: EDIT_CARD,
      payload: { Id, ...data }, // Assuming the response contains the updated card details
    })
  } catch (error) {
    console.error('Error updating card:', error)
  }
}

export const getCardById = (cardId) => async (dispatch) => {
  dispatch({ type: GET_CARD_BY_ID_REQUEST })
  const token = localStorage.getItem('token')

  try {
    const response = await fetch(
      `https://localhost:7039/api/taches/${cardId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch card') // Handle response errors
    }

    const data = await response.json()
    dispatch({ type: GET_CARD_BY_ID_SUCCESS, payload: data })
    return data
  } catch (error) {
    dispatch({ type: GET_CARD_BY_ID_FAILURE, payload: error.message })
  }
}

export const onDragEndList = (payload) => ({ type: DRAG_END_LIST, payload })

export const onDragEndCard = (payload) => async (dispatch) => {
  const { destination, source, draggableId } = payload

  // If there's no valid destination, do nothing
  if (!destination) return

  const token = localStorage.getItem('token')
  const cardId = draggableId // Get the card's ID (draggableId corresponds to cardId)
  const newListId = destination.droppableId // The new list where the card is moved
  const oldListId = source.droppableId // The previous list
  const projectId = localStorage.getItem('idProjet')
  const Id = Number(cardId.match(/\d+/g))
  const newId = Number(newListId.match(/\d+/g))
  console.log('Id', Id)
  console.log('newId', newId)

  // Check if the card is moved to a different list
  if (oldListId !== newListId) {
    try {
      // Fetch the current card details to retain existing values
      const cardDetailsResponse = await fetch(
        `https://localhost:7039/api/taches/${Id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )

      if (!cardDetailsResponse.ok) {
        throw new Error('Failed to fetch card details')
      }

      const cardDetails = await cardDetailsResponse.json()

      // API call to update the card's statusId with existing values
      const response = await fetch(`https://localhost:7039/api/taches/${Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          title: cardDetails.title,
          description: cardDetails.description,
          priority: cardDetails.priority,
          startDate: cardDetails.startDate,
          dueDate: cardDetails.dueDate,
          projectId: Number(projectId),
          statusId: newId, // Update the statusId with the new listId
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update card status')
      }
      await dispatch(fetchLists(projectId))
      const data = await response.json()
      console.log(`Card ${Id} successfully moved to list ${newId}`)
      // Dispatch action to update the local state
      dispatch({
        type: DRAG_END_CARD,
        payload: { destination, source },
      })
    } catch (error) {
      console.error('Error moving card:', error)
    }
  } else {
    // If the card is moved within the same list, just reorder it
    dispatch({
      type: DRAG_END_CARD,
      payload: { destination, source },
    })
  }
}

export const getUsersByRole = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://localhost:7039/api/users/getusersbyrole`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch users by role')
      }

      const data = await response.json()
      return data
      dispatch({
        type: FETCH_USERS_BY_ROLE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      console.error('Error fetching users by role:', error)
      dispatch({
        type: FETCH_USERS_BY_ROLE_FAILURE,
        error: error.message,
      })
    }
  }
}

/* INITIAL STATE */
const initialState = {
  loading: false,
  error: null,
  lists: {},
  cards: {},
  columns: [],
}

/* REDUCER */
const todoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_LISTS_REQUEST:
      return { ...state, loading: true, error: null }

    case FETCH_LISTS_SUCCESS: {
      const { lists, cards, columns } = payload
      return { ...state, loading: false, lists, cards, columns }
    }

    case FETCH_LISTS_FAILURE:
      return { ...state, loading: false, error: payload }

    case FETCH_USERS_BY_ROLE_SUCCESS:
      return {
        ...state,
        users: payload, // Store fetched users
      }

    case FETCH_USERS_BY_ROLE_FAILURE:
      return {
        ...state,
        error: payload,
      }

    case ADD_LIST_REQUEST:
      return { ...state, loading: true }

    case ADD_LIST_SUCCESS: {
      const { id, title, cards } = payload
      const newList = { id, title, cards }
      return {
        ...state,
        loading: false,
        lists: { ...state.lists, [id]: newList },
        columns: [...state.columns, id],
      }
    }

    case ADD_LIST_FAILURE:
      return { ...state, loading: false, error: payload }

    case CHANGE_TITLE_LIST_REQUEST:
      return { ...state, loading: true }

    case CHANGE_TITLE_LIST_SUCCESS: {
      const { listId, title } = payload
      return {
        ...state,
        loading: false,
        lists: { ...state.lists, [listId]: { ...state.lists[listId], title } },
      }
    }

    case CHANGE_TITLE_LIST_FAILURE:
      return { ...state, loading: false, error: payload }

    case REMOVE_LIST_REQUEST:
      return { ...state, loading: true }

    case REMOVE_LIST_SUCCESS: {
      const { [payload]: removedList, ...remainingLists } = state.lists
      const newColumns = state.columns.filter((column) => column !== payload)
      return {
        ...state,
        loading: false,
        lists: remainingLists,
        columns: newColumns,
      }
    }

    case REMOVE_LIST_FAILURE:
      return { ...state, loading: false, error: payload }

    // Static actions for Cards
    case ADD_CARD: {
      const { listId, card } = payload
      const updatedList = {
        ...state.lists[listId],
        cards: [...state.lists[listId].cards, card.id],
      }
      return {
        ...state,
        lists: { ...state.lists, [listId]: updatedList },
        cards: { ...state.cards, [card.id]: card },
      }
    }

    case REMOVE_CARD: {
      const { listId, cardId } = payload
      const { [cardId]: removedCard, ...remainingCards } = state.cards
      const updatedList = {
        ...state.lists[listId],
        cards: state.lists[listId].cards.filter((card) => card !== cardId),
      }
      return {
        ...state,
        lists: { ...state.lists, [listId]: updatedList },
        cards: remainingCards,
      }
    }

    case EDIT_CARD: {
      const { cardId, cardText, cardDescription } = payload
      const updatedCard = {
        ...state.cards[cardId],
        title: cardText,
        description: cardDescription,
      }
      return {
        ...state,
        cards: { ...state.cards, [cardId]: updatedCard },
      }
    }

    case GET_CARD_BY_ID_REQUEST:
      return { ...state, loading: true, error: null }

    case GET_CARD_BY_ID_SUCCESS: {
      const { id, title, description, priority, startDate, dueDate, userName } =
        payload
      return {
        ...state,
        loading: false,
        cards: {
          ...state.cards,
          [id]: {
            title,
            description,
            priority,
            startDate,
            dueDate,
            userName,
          },
        },
      }
    }

    case GET_CARD_BY_ID_FAILURE:
      return { ...state, loading: false, error: payload }

    // Drag actions
    case DRAG_END_LIST: {
      const { destination, source } = payload
      if (!destination) return state

      const updatedColumns = [...state.columns]
      const [movedList] = updatedColumns.splice(source.index, 1)
      updatedColumns.splice(destination.index, 0, movedList)
      return { ...state, columns: updatedColumns }
    }

    case DRAG_END_CARD: {
      const { destination, source } = payload
      if (!destination) return state

      if (source.droppableId === destination.droppableId) {
        const updatedCards = [...state.lists[source.droppableId].cards]
        const [movedCard] = updatedCards.splice(source.index, 1)
        updatedCards.splice(destination.index, 0, movedCard)
        return {
          ...state,
          lists: {
            ...state.lists,
            [source.droppableId]: {
              ...state.lists[source.droppableId],
              cards: updatedCards,
            },
          },
        }
      } else {
        const sourceCards = [...state.lists[source.droppableId].cards]
        const destinationCards = [...state.lists[destination.droppableId].cards]
        const [movedCard] = sourceCards.splice(source.index, 1)
        destinationCards.splice(destination.index, 0, movedCard)

        return {
          ...state,
          lists: {
            ...state.lists,
            [source.droppableId]: {
              ...state.lists[source.droppableId],
              cards: sourceCards,
            },
            [destination.droppableId]: {
              ...state.lists[destination.droppableId],
              cards: destinationCards,
            },
          },
        }
      }
    }

    default:
      return state
  }
}

export default todoReducer
