import React from 'react'
import { useTheme } from '../../context/ThemeContext'

const Wrapper = ({children}) => {
    const darkTheme = useTheme()
    
    return (
        <section className={`main-wrapper-y small-y main-wrapper-x main-wrapper ${darkTheme? 'dark-main-wrapper' : 'light-main-wrapper'}`}>
            <div className='content-wrapper max-width-770'>
                {children}
            </div>
        </section>
    )
}

export default Wrapper
