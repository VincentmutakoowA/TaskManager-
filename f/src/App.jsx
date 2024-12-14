import { useState } from 'react'
import axios from 'axios'
import './App.css'
import App1 from './logI/app1'
import App2 from './logO/app2'
//adb reverse tcp:5173 tcp:5173

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [colorMode, setColorMode] = useState('light')

  const [user, setUser] = useState({
    userId: '',
    username: '',
    email: '',
    passwordHash: '',
    createdAt: '',
    mode: 'light'
  })

  console.log(user.mode)

  if (!loggedIn) {
    axios.get('http://localhost:8000/user', { withCredentials: true })
      .then((response) => {
        console.log(response.data)
        setUser(response.data)
        setColorMode(user.mode)
        response.status === 200 ? setLoggedIn(true) : setLoggedIn(false)
      })
      .catch((err) => { console.log(err) })
  }

  return (
    <>
      <div className={colorMode}>
        {loggedIn ? <App1 userName={user.username} /> : <App2 />}
      </div>
    </>
  )
}

export default App

