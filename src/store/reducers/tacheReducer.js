const initialState = {
  tasks: [],
  statuses: [],
  loading: false,
  error: null,
}

const tacheReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TACHES_LOAD_SUCCESS':
      return { ...state, tasks: action.payload }
    case 'STATUS_LOAD_SUCCESS':
      return { ...state, statuses: action.payload }
    case 'TACHE_CREATED_SUCCESS':
      return { ...state, tasks: [...state.tasks, action.payload] }
    case 'STATUS_CREATED_SUCCESS':
      return { ...state, statuses: [...state.statuses, action.payload] }
    case 'TACHE_DELETE_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      }
    // Handle other cases...
    default:
      return state
  }
}

export default tacheReducer
