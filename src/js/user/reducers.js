import { combineReducers } from 'redux'
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, SUBMIT_NEW_PASSWORD_FAILURE
} from './actions'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function user(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        loginErrorMessage: '',
        username: action.username
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        loginErrorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        username: ''
      })
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        signupErrorMessage: '',
        username: action.username
      })
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        signupErrorMessage: action.message
      })
    case RESET_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RESET_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      })
    case RESET_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        loginErrorMessage: action.message
      })
    case SUBMIT_NEW_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        submitNewPasswordErrorMessage: action.message
      })
    default:
      return state
  }
}
