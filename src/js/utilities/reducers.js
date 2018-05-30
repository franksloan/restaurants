import { combineReducers } from 'redux'
import user from '../user/reducers'
import maps from '../restaurants/reducers'
import add_restaurant from '../add_restaurant/reducers'

// We combine the reducers here so that they
// can be left split apart above
const mapsApp = combineReducers({
  user,
  maps,
  add_restaurant
})

export default mapsApp
