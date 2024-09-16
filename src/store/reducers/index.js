import { combineReducers } from 'redux'
import authReducer from './authReducer'
import projetReducer from './projetReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  projet: projetReducer,
})

export default rootReducer
