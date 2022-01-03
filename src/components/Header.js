import React, { useEffect, useState } from 'react'
import { useTheme, useUpdateTheme } from '../context/ThemeContext'
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { getDoc, doc } from "firebase/firestore"; 
import ProfileDrop from './ProfileDrop';


const Header = () => {
    const darkTheme = useTheme()
    const updateTheme = useUpdateTheme()
    const {currentUser} = useAuth()
    const [userDetails, setUserDetails] = useState(null)
    
    useEffect(() => {
        if (currentUser) {
            const userRef = doc(db, 'users', currentUser.uid)
            const getUser = async () => {
                const data = await getDoc(userRef)
                setUserDetails(data.data())
            }
            getUser()
        }
    }, [currentUser])
    
    useEffect(() => {
      const root = document.querySelector('#root')  
      if (darkTheme) {
        root.style.backgroundColor = '#09093B '
      } else {
        root.style.backgroundColor = "rgba(225,225 ,225 ,0.2 )"
      }
    }, [darkTheme])

    
    return (
        <header className={`main-wrapper-x header ${darkTheme ? 'dark-main-header': 'light-main-header'}`}>
            <button className='theme-btn' onClick={updateTheme}>{darkTheme? 'light' : 'dark'} </button>
            <div className='header-wrapper'>
                <div className='logo-holder'>
                    <Link className={`logo ${darkTheme ? 'dark-logo': 'light-logo'}`} to='/'>Gist<span>Hub</span></Link>
                </div>
                {
                    currentUser? 
                    <nav className='page-nav'>
                        <ul className='navigation'>
                            <li><Link to='/my-gist'>My gists</Link></li>
                            <li><Link to='/Liked'>Liked</Link></li>
                        </ul>
                    </nav>: null
                }
                <div className='profile-wrapper'>
                {
                    currentUser && userDetails ?
                    <ProfileDrop 
                        title={userDetails?.firstName?.charAt(0) + userDetails?.lastName?.charAt(0)}
                    />:
                    <Link to='/login' className='login-btn'>Log in</Link>
                }
                    
                    
                </div>
            </div>
        </header>
    )
}

export default Header
