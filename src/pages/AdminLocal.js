
import React from 'react'


import styles from './AdminLocal.module.css'

export default function AdminLocal(props) {

    return (
        <React.Fragment>
            <div className={styles['local-wrapper']}>
                <div className={styles['local-box']}>
                    <div className={styles['box-face']}>
                        <div>
                            Test1
                        </div>
                        <div>
                            Test1
                        </div>
                        <div>
                            Test1
                        </div>
                        <div>
                            Test1
                        </div>
                    </div>
                    <div className={styles['box-content']}>
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

