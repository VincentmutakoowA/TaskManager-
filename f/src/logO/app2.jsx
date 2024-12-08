
//import { useState } from "react"
import Hero from "./hero"
import AuthForm from "./authForm"
import { BrowserRouter, Route, Routes } from 'react-router'

export default function App2() {

    return (

        <>
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element={<Hero />} />
                    <Route path =  "/login" element={<AuthForm/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}
