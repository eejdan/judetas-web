
import React from 'react'

import styles from './LogoutButton.module.css'



export default function LogoutButton(props) {
    let theme;
    if(!props.parentTheme) {
        theme = 'day';
    } else {
        theme = props.parentTheme;
    }
    console.log(theme+'-logout-button')
    return (
        <button className={styles[theme+'-logout-button']}>
            Log Out
        </button>
    )
}