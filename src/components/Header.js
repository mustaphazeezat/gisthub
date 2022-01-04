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
    const [theme, setTheme] = useState(true)
    const getTheme = JSON.parse(localStorage.getItem("theme"));
    const root = document.querySelector('#root')  

    useEffect(() => {
        if(getTheme === null){
            setTheme(darkTheme)
        }else if( getTheme === theme){
            setTheme(getTheme)
        }else if( getTheme !== theme){
            updateTheme()
            setTheme(getTheme)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
      if (theme) {
        root.style.backgroundColor = '#09093B '
      } else {
        root.style.backgroundColor = "rgba(225,225 ,225 ,0.2 )"
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme])

    const update = () =>{
        updateTheme()
        setTheme(!theme)
        localStorage.setItem("theme", !theme)
    }
    return (
        <header className={`main-wrapper-x header ${theme? 'dark-main-header': 'light-main-header'}`}>
            <button className='theme-btn' onClick={update}>{theme? 'light' : 'dark'} </button>
            <div className='header-wrapper'>
                <div className='logo-holder'>
                    <Link className={`logo ${theme ? 'dark-logo': 'light-logo'}`} to='/'>Gist<span>Hub</span></Link>
                </div>
                {
                    currentUser? 
                    <nav className='page-nav'>
                        <ul className='navigation'>
                            <li><Link to='/my-gist'>My gists</Link></li>
                            <li><Link to='/liked-gist'>Liked</Link></li>
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
