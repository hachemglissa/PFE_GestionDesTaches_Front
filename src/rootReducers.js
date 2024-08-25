import { combineReducers } from 'redux'

// reducers
import todo from 'redux/todo.reducer'
import authReducer from './store/reducers/authReducer'

const rootReducers = combineReducers({
  todo,
  authReducer,
})

export default rootReducers
