////GET USER OBJECT PROFILES NAME AND COLOR MODE
import { useState } from 'react';
import './menu.css'
import { logOut } from '../requests/requests';


export default function Menu({ isMenuOpen  , userName}) {

    const [ colorMode, setColorMode ] = useState('Dark')
    
    let menuHeight;
    if (isMenuOpen) {
        menuHeight = 'menuActive1'
    } else {
        menuHeight = 'menu1'
    }

    return (
        <>
            <div className={menuHeight}>
                
                <h3>Welcome {userName}</h3>
                <h3>{colorMode} Mode</h3>
                <h3 onClick={logOut} >Log Out</h3>     
            </div>
        </>
    )
}
