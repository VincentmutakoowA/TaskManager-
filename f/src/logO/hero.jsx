import { useState } from "react"
import Navbar from "./navbar"
import Menu from "./menu"
import './hero.css'
import image1 from "../assets/image1.svg"

export default function Hero() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    function setMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <>
            <Navbar setMenu={setMenu} />
            <Menu isMenuOpen={isMenuOpen} />
            <div className="mainContainer">
                <h1>TASK MANAGER</h1>
                <div className="imageContainer">
                    <img src={image1} className="image1"></img>
                </div>
                <p>BY: Vincent Mutakoowa</p>
            </div>
        </>
    )
}
