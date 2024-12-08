import { useState } from 'react'
import axios from 'axios'


import './App.css'
import App1 from './logI/app1'
import App2 from './logO/app2'

function App() {

  console.log('J')

  const [loggedIn, setLoggedIn] = useState(false)
  let userData;
  const [authToken, setAuthToken] = useState(null);

  try {
    axios({
      method: 'get',
      url: '/user',
      credentials: 'include',
    }).then(
      (response) => {
        userData = response
      if(response.ok)setLoggedIn(!loggedIn)
      }
    )
  }
  catch (err) {
    console.log(err)
    setAuthToken(null)
  }



  return (
    <>
      {loggedIn ? <App1/> : <App2/>}
    </>
  )
}

export default App
