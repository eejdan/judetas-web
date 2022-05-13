import { createContext, useState } from 'react'

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        currentTheme: 'day' //or night
    })

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;