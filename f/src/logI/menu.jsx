/* eslint-disable react/prop-types */

import './menu.css'
import user from '../assets/icons/user.svg'
import logout from '../assets/icons/logout.svg'
import modeIcon from '../assets/icons/mode.svg'
import deleteIcon from '../assets/icons/delete.svg'
import axios from 'axios'
import { useRef, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'


export default function Menu({ isMenuOpen, mode, modeOptimistic }) {

    let menuHeight;
    if (isMenuOpen) {
        menuHeight = 'menuActive1'
    } else {
        menuHeight = 'menu1'
    }

    let colorMode;
    if (mode == 'light') { colorMode = 'Dark' } else { colorMode = 'Light' }


    const ref = useRef(null)

    const [showAccountOptions, setShowAccountOptions] = useState(false)

    function logOut() {
        ref.current.continuousStart()
        axios.get('http://localhost:8000/logout', { withCredentials: true })
            .then(response => {
                console.log(response.data);
                ref.current.complete()
                window.location.reload()
            })
            .catch(error => {
                console.error('Error deleting cookie:', error);
                ref.current.complete()
            });
    }

    function deleteAccount() {
        const confirmDelete = window.confirm("This will delete your account and saved data. This action cannot be undone.")
        if (confirmDelete) {
            ref.current.continuousStart()
            axios.delete('http://localhost:8000/user/deleteAccount', { withCredentials: true })
                .then(response => {
                    console.log(response.data);
                    ref.current.complete()
                    window.location.reload()
                })
                .catch(error => {
                    console.error('Error deleting account:', error);
                    ref.current.complete()
                });
        }
    }

    return (
        <>
            <LoadingBar ref={ref} color="#4ed9ff" />

            <div className={menuHeight}>

                <div className='a' onClick={() => setShowAccountOptions(!showAccountOptions)}>
                    <div className='imgC'>
                        <img src={user} alt="Account"></img>
                    </div>
                    <p>Account</p>
                </div>

                {showAccountOptions && (
                    <div className='accountOptions'>
                        <div className='a' onClick={deleteAccount}>
                            <div className='imgC'>
                                <img src={deleteIcon} alt="Delete Account"></img>
                            </div>
                            <p>Delete Account</p>
                        </div>
                    </div>
                )}

                <div className='a'><div className='imgC'>
                    <img src={modeIcon}></img>
                </div><p onClick={modeOptimistic}>{colorMode}  Mode</p></div>

                <div className='a'><div className='imgC'>
                    <img src={logout}></img>
                </div><p onClick={logOut} >Log Out</p></div>
            </div>
        </>
    )
}

