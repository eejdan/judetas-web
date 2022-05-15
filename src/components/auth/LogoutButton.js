
import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext';

import styles from './LogoutButton.module.css'



export default function LogoutButton(props) {
    let theme;
    if(!props.parentTheme) {
        theme = 'day';
    } else {
        theme = props.parentTheme;
    }
    const { onInvalidSession } = useContext(AuthContext);

    const handleLogout = () => {
        // no await axios /logout
        onInvalidSession();
    }
 
    return (
        <button onClick={handleLogout} className={styles[theme+'-logout-button']}>
            Log Out
        </button>
    )
}