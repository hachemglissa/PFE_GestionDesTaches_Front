const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  lists: {}, // Store the lists returned from the API
  cards: {}, // Store the cards returned from the API
  columns: [], // Store the column identifiers
  loading: false, // Track loading state
}

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STATUS_LOAD_REQUEST':
      return { ...state, loading: true, error: null }

    case 'STATUS_LOAD_SUCCESS':
      const { lists, cards, columns } = action.payload // Destructure payload
      return {
        ...state,
        lists, // Set the lists in the state
        cards, // Set the cards in the state
        columns, // Set the column identifiers
        loading: false,
      }

    case 'STATUS_LOAD_FAILURE':
      return { ...state, error: action.payload, loading: false }

    default:
      return state
  }
}

export default statusReducer
