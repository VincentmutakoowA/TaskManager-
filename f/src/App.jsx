import { useState } from 'react'
import axios from 'axios'
import './App.css'
import App1 from './logI/app1'
import App2 from './logO/app2'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

      axios.get( 'http://localhost:8000/user', { withCredentials : true } )
      .then((response)=>{console.log(response.message)
        response.status === 200 ? setLoggedIn(true) : setLoggedIn(false)
      })
      .catch((err)=> {console.log(err)})
      
  return (
    <>
      {loggedIn ? <App1/> : <App2/>}
    </>
  )
}

export default App

