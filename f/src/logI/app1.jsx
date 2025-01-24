/* eslint-disable react/prop-types */

import Navbar from "./navbar"
import Menu from "./menu"
import { useState } from "react"
import Tasks from "./tasks"

export default function App1({ userName, mode, modeSwitchOptimistic }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    function setMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <Navbar setMenu={setMenu} />
            <Menu isMenuOpen={isMenuOpen} userName={userName} mode={mode} modeOptimistic={modeSwitchOptimistic}/>
            <Tasks />
        </>
    )
}

