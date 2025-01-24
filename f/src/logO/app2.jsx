
import { useState } from "react"
import Hero from "./hero"
import AuthForm from "./authForm"
import Reset from "./reset"


export default function App2() {
    const setHero = () => setDisplay(1)
    const setAuthForm = () => setDisplay(2)
    const setReset = () => setDisplay(3)

    

    const [display, setDisplay] = useState(1)

    return (

        <>
            {display === 1 ? <Hero setAuthForm={setAuthForm} /> : null}
            {display === 2 ? <AuthForm setReset={setReset} setHero={setHero} /> : null}
            {display === 3 ? <Reset setReset={setReset} setAuthForm={setAuthForm} /> : null}
        </>
    )
}
