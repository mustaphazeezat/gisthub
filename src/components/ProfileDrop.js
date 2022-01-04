import React, { useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProfileDrop = ({title}) => {
    const {logOut} = useAuth()
    const [drop, setDrop] = useState(false)
    const navigate = useNavigate()

    const handleSignOut = () => {
        logOut()
        navigate("/")
    }
    
    return (
        <div className='profile-dropdown'>
            <button onClick={()=> setDrop(!drop)} className='profile'>{title}</button>
            {
                drop? 
                <ClickAwayListener onClickAway={()=>setDrop(false)}>
                    <div className='drop-wrapper'>
                        <ul className={`drop-list ${drop? 'drop' : ''}`}>
                            <li ><button onClick={handleSignOut}>log out</button></li>
                        </ul>
                    </div>
                </ClickAwayListener>
                : null
            }
        </div>
    )
}

export default ProfileDrop
