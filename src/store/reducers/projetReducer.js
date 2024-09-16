const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  projets: [],
}

const projetReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PROJETS_LOAD_REQUEST':
      return { ...state, loading: true, error: null }
    case 'PROJETS_LOAD_SUCCESS':
      return { ...state, projets: action.payload, loading: false }
    case 'PROJETS_LOAD_FAILURE':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

export default projetReducer
