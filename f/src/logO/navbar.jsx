import './navbar.css'
import logo from '../assets/logo.svg'

export default function Navbar(){

    return (
        <div className='navMain'>
            <img src={logo} className="logo" alt="Taskma logo" />
            <div className='item-2'></div>

        </div>
    )
}

