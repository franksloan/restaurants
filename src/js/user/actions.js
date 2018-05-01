export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token,
    username: user.username
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}


export function loginUser(creds, history) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `usernameOrEmail=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch('http://localhost:5050/api/user/login', config)
      .then(response => response.json()
        .then(user => ({ user, response }))
      )
      .then(({ user, response }) =>  {
        console.log(user, response)
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.id_token)

          // Dispatch the success action
          dispatch(receiveLogin(user))
        }
      })
      .then( () => {
        history.push('/')
      })
      .catch( err => console.log("Error: ", err.message))
  }
}


// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
    username: ''
  }
}

// Logs the user out
export function logoutUser() {

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')

    dispatch(receiveLogout())
  }
}


export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

function requestSignup(creds) {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveSignup(user) {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

function signupError(message) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}


export function signupUser(creds, history) {
  console.log(creds)
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&email=${creds.email}&password=${creds.password}&passwordConf=${creds.passwordConf}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestSignup(creds))

    return fetch('http://localhost:5050/api/user/create', config)
      .then(response => response.json()
          .then(user => ({ user, response }))
          )
      .then(({user, response}) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(signupError(user.message))
          return Promise.reject(user)
        } else {
          // Dispatch the success action
          dispatch(receiveSignup(user))
        }
      })
      .then( () => {
        history.push('/email')
      })
      .catch( err => console.log("Error: ", err.message))
  }
}


export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE'
export const SUBMIT_NEW_PASSWORD_FAILURE = 'SUBMIT_NEW_PASSWORD_FAILURE'

function requestResetPassword(creds) {
  return {
    type: RESET_PASSWORD_REQUEST
  }
}

function resetPasswordSuccess( ) {
  return {
    type: RESET_PASSWORD_SUCCESS
  }
}

function resetPasswordError(message) {
  return {
    type: RESET_PASSWORD_FAILURE,
    message
  }
}

function submitNewPasswordError(message) {
  return {
    type: SUBMIT_NEW_PASSWORD_FAILURE,
    message
  }
}


export function resetPassword(creds, history) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${creds.email}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestResetPassword(creds))

    return fetch('http://localhost:5050/api/user/reset_password', config)
      .then(response => response.json()
          .then(user => ({ user, response }))
          )
      .then(({user, response}) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(resetPasswordError(user.message))
          return Promise.reject(user)
        } else {
          // Dispatch the success action
          dispatch(resetPasswordSuccess())
        }
      })
      .then( () => {
        history.push('/email')
      })
      .catch( err => console.log("Error: ", err.message))
  }
}


export function submitNewPassword(creds, history) {

  let token = stripRoute('/reset_password/', history.location.pathname)

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}&token=${token}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestResetPassword(creds))

    return fetch('http://localhost:5050/api/user/new_password', config)
      .then(response => response.json()
          .then(user => {
            console.log('USER: ', user);
            return { user, response }
          })
      )
      .then(({user, response}) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(submitNewPasswordError(user.message))
          return Promise.reject(user)
        } else {
          // Dispatch the success action
          dispatch(resetPasswordSuccess())
        }
      })
      .then( () => {
        history.push('/thanks')
      })
      .catch( err => console.log("Error: ", err.message))
  }
}


function stripRoute(removeString, token){
  if(token.indexOf(removeString) != 0){
    throw new Error('Weird route ' + token.indexOf(removeString))
  }
  return token.substring(removeString.length)
}
