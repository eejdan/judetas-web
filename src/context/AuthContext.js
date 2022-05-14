import { createContext, useState, useEffect } from 'react'

import axios from 'axios'
import { useCookies } from 'react-cookie';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [cookies, setCookie] = useCookies();

    let [accessToken, setAccessToken] = useState(null);
    let [session, setSession] = useState(null) 
    let [username, setUsername] = useState(null);

    let [loggedIn, setLoggedIn] = useState(false);
    let [authorized, setAuthorized] = useState(false);

    let onInvalidSession = () => {
        setLoggedIn(false);
        setAuthorized(false);

        setSession(null);
        setAccessToken(null);

        setUsername(null);
    }

    let onNewSession = (session) => {
        setAuthorized(false);
        setAccessToken(null);

        setSession(session);
        setLoggedIn(true);

        setCookie('unsolved_sid', session);
    }

    let onAuthorize = (newAccessToken) => {
        setAccessToken(newAccessToken);
        setAuthorized(true);
    }

    let contextData = {
        onAuthorize: onAuthorize,
        onNewSession: onNewSession,
        onInvalidSession: onInvalidSession,
        accessToken: accessToken,
        setAccessToken: setAccessToken,
        session: session,
        setSession: setSession,
        username: username,
        setUsername: setUsername,
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        authorized: authorized,
        setAuthorized: setAuthorized
    }

    useEffect(() => {
        const cleanupFunction = () => {}
        if(!(cookies['unsolved_sid'])) return cleanupFunction;

        setSession(cookies['unsolved_sid'])
        setLoggedIn(true);
    }, []);
    
    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}
