const initialState = {
  users: [],
  // other states
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload,
      }
    case 'GET_ALL_USERS_FAILURE':
      return {
        ...state,
        users: [],
      }
    default:
      return state
  }
}

export default authReducer
