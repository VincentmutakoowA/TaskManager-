/* eslint-disable react/prop-types */

import './menu.css'
export default function Menu({ isMenuOpen  }) {

    
    let menuHeight;
    if (isMenuOpen) {
        menuHeight = 'menuActive1'
    } else {
        menuHeight = 'menu1'
    }

    return (
        <>
            <div className={menuHeight}>
                
                <h3>Profile Name</h3>
                <h3>Toggle Dark</h3>
                <h3>Log Out</h3>     
            </div>
        </>
    )
}