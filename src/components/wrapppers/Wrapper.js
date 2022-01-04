import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

const Wrapper = ({children}) => {
    const darkTheme = useTheme()
    const [theme, setTheme] = useState(true)
    const getTheme = JSON.parse(localStorage.getItem("theme"));
    useEffect(() => {
        
        if(getTheme === null){
            setTheme(darkTheme)
        }else if( getTheme === theme){
            setTheme(getTheme)
        }else if( getTheme !== theme){
            setTheme(getTheme)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        setTheme(getTheme)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
