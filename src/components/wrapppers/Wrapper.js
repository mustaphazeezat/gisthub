import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

const Wrapper = ({children}) => {
    const darkTheme = useTheme()
    const [theme, setTheme] = useState();
    useEffect(() => {
        setTheme(darkTheme)
    }, [])
    useEffect(() => {
        const getTheme = JSON.parse(localStorage.getItem("theme"));
        if (getTheme !== null) {
            setTheme(getTheme)
        }else{
            setTheme(!theme)
        }
    }, [darkTheme])
    return (
        <section className={`main-wrapper-y small-y main-wrapper-x main-wrapper ${theme? 'dark-main-wrapper' : 'light-main-wrapper'}`}>
            <div className='content-wrapper max-width-770'>
                {children}
            </div>
        </section>
    )
}

export default Wrapper
