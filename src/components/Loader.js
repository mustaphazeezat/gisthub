import React from 'react'
import { useTheme } from '../context/ThemeContext'

const Loader = () => {
    const darkTheme = useTheme()
    return (
        <div className={`loader-wrapper ${darkTheme ? 'dark-loader-wrapper': 'light-loader-wrapper'}`}>
            <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader
