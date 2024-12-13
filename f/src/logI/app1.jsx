
import Navbar from "./navbar"
import Menu from "./menu"
import { useState } from "react"
import Tasks from "./tasks"

export default function App1({userName}){

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    function setMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    return(
        <>
        <Navbar setMenu={setMenu}/>
        <Menu isMenuOpen={isMenuOpen} userName={userName}/>
        <Tasks/>
        </>
    )
}

