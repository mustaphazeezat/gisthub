import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProfileDrop = ({title}) => {
    const {logOut} = useAuth()
    const [drop, setDrop] = useState(false)

    const handleSignOut = () => {
        logOut()
    }
    return (
        <div className='profile-dropdown'>
            <button onClick={()=> setDrop(!drop)} className='profile'>{title}</button>
            {
                drop? 
                <div className='drop-wrapper'>
                    <ul className={`drop-list ${drop? 'drop' : ''}`}>
                        <li><Link to='/profile' className=''>Profile</Link></li>
                        <li ><button onClick={handleSignOut}>log out</button></li>
                    </ul>
                </div>:
                null
            }
        </div>
    )
}

export default ProfileDrop
