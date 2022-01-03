import React,{createContext, useContext, useState} from 'react'

const ThemeContext = createContext()
const UpdateThemeContext = createContext()

export function useTheme () {
    return useContext(ThemeContext)
}

export function useUpdateTheme () {
    return useContext(UpdateThemeContext)
}

export const ThemeProvider = ({children}) => {
    const [darkTheme, setDarkTheme] = useState(true)
    const changeTheme = () =>{ setDarkTheme(!darkTheme)}
    return (
        <ThemeContext.Provider value={darkTheme}>
            <UpdateThemeContext.Provider value={changeTheme}>
                {children}
            </UpdateThemeContext.Provider>
        </ThemeContext.Provider>
    )
}