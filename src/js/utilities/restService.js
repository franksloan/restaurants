export function fetchFromEndpoint(url, config, errorMethod, successMethod, history, redirect, dispatch){
  return fetch(url, config)
          .then(response => response.json()
            .then(jsonData => ({ jsonData, response }))
          )
          .then(({ jsonData, response }) =>  {
            if (!response.ok) {
              // If there was a problem, we want to
              // dispatch the error condition
              dispatch(errorMethod(jsonData.message))
              return Promise.reject(jsonData)
            } else {
              // Dispatch the success action
              dispatch(successMethod(jsonData))
            }
          })
          .then( () => {
            if(history && redirect){
              history.push(redirect)
            }
          })
          .catch( err => console.log("Error: ", err))
}
