

import React from 'react'
import styles from './Content.module.css'

export default function Content(props) {
    
    return(
        <div className={styles['content-wrapper']}>
            {props.customBox 
            ?   (<React.Fragment>
                    {props.children}
                </React.Fragment>
            ) : (
                <div className={styles['content-box']}>
                {props.children}
                </div>
             )
            }
        </div>
    )
}

export function DefaultBoxFace(props) {
    return (
        <div className={styles['defaultboxface']}>
            <h3>
            &nbsp;&nbsp;&nbsp;{props.title}
            </h3>
            {props.customDesc && (
                <React.Fragment>
                    {props.children}
                </React.Fragment>
            )}
            { props.desc && (
                <div className={styles['defaultboxface-desc']}>
                    {props.desc}
                </div>
            )}
        </div>
    )

}