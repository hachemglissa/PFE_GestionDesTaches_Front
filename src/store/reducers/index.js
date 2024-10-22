import { combineReducers } from 'redux'
import authReducer from './authReducer'
import projetReducer from './projetReducer'
import tacheReducer from './tacheReducer'
import statusReducer from './statusReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  projet: projetReducer,
  status: statusReducer,
  tache: tacheReducer,
})

export default rootReducer
