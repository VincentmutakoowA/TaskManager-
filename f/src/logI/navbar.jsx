import './navbar.css'
import logo from '../assets/logo.svg'
import menuIcon from '../assets/menuIcon.svg'
import { useState } from 'react'
export default function Navbar({setMenu}){

    const [menuBtn1, setMenuBtn1] = useState("menuIcon1")
    const [menuBtn2, setMenuBtn2] = useState("menuIcon2")
    const [menuBtn3, setMenuBtn3] = useState("menuIcon3")

    const toggleMenuBtnStyle = () => {
        if (menuBtn1 === "menuIcon1") setMenuBtn1("menuIcon1-2")
        else setMenuBtn1("menuIcon1")

        if (menuBtn2 === "menuIcon2") setMenuBtn2("menuIcon2-2")
        else setMenuBtn2("menuIcon2")

        if (menuBtn3 === "menuIcon3") setMenuBtn3("menuIcon3-2")
        else setMenuBtn3("menuIcon3")
    }

    const handleMenuClick = () => {
        toggleMenuBtnStyle()
        setMenu()
    }

    return (
        <div className='navMain'>
            <img src={logo} className="logo" alt="Taskma logo" />
            <div className='item-2'></div>

            <div className="menuIcon" onClick={handleMenuClick}>
                <img src={menuIcon}  alt="" className={menuBtn1}/>
                <img src={menuIcon}  alt="" className={menuBtn2}/>
                <img src={menuIcon}  alt="" className={menuBtn3}/>
            </div>
        </div>
    )
}

