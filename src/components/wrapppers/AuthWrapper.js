import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme, useUpdateTheme } from '../../context/ThemeContext'

const AuthWrapper = ({children}) => {
    const darkTheme = useTheme()
    const updateTheme = useUpdateTheme()
    useEffect(() => {
        const root = document.querySelector('#root')  
        if (darkTheme) {
          root.style.backgroundColor = '#09093B '
        } else {
          root.style.backgroundColor = "#fff"
        }
      }, [darkTheme])
    return (
        <section className={`auth-main-wrapper main-wrapper-y main-wrapper-x ${darkTheme? 'dark-auth-main-wrapper' : 'light-auth-main-wrapper'}`}>
            <button className='theme-btn' onClick={updateTheme}>{darkTheme? 'light' : 'dark'} </button>
            <Link className={`logo ${darkTheme ? 'dark-logo': 'light-logo'}`} to='/'>Gist<span>Hub</span></Link>
            <div className={`width-500 auth-wrapper ${darkTheme? 'dark-auth-wrapper' : 'light-auth-wrapper'}`}>
                {children}
            </div>
        </section>
    )
}

export default AuthWrapper
