/* eslint-disable react/prop-types */
import './menu.css'
import login from '../assets/login.svg'

export default function Menu({isMenuOpen}) {

    let menuHeight;
    if (isMenuOpen) {
        menuHeight = 'menuActive'
    } else {
        menuHeight = 'menu'
    }

    return (
        <>
            <div className={menuHeight}>

                <div className='loginImg'>
                    <a href='./login'><img src={login} alt="Login" /></a>
                    </div>

                <br />
            </div>
        </>
    )
}
