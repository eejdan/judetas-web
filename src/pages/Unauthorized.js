
import React from 'react';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';

import styles from './Unauthorized.module.css'

export default function Unauthorized() {

    

    return(
        <React.Fragment>
            <div className={styles['unauthorized-box']}>
                <div>
                    Contul tau nu este autorizat pentru a efectua aceasta actiune.
                </div>
                <div>
                   &nbsp;
                </div>
            </div>
        </React.Fragment>
    )

}