import { combineReducers } from 'redux'

// reducers
import todo from 'redux/todo.reducer'
import authReducer from './store/reducers/authReducer'
import projetReducer from 'store/reducers/projetReducer'

const rootReducers = combineReducers({
  todo,
  authReducer,
  projetReducer,
})

export default rootReducers
