import React from 'react'
import { useTheme } from '../../context/ThemeContext'

const TextInput = ({type, label, onChange, value, className, ...props}) => {
    const darktheme = useTheme()
    return (
        <label className={`input-wrapper ${className} ${darktheme? 'dark-input': 'light-input'}`}>
            <span className='label'>{label}</span>
            <input {...props} maxLength={304} type={type} onChange={e => onChange(e.target.value)} value={value} autoComplete="new" required />
        </label>
    )
}

export default TextInput
