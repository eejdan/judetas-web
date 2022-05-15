import React, { useContext, useEffect, useState } from 'react';

import Content from "../components/Content";

import styles from './Feed.module.css'

export default function Feed() {

    const [filterPopular, setFilterPopular] = useState(false);

    useEffect(()=> {

    }, [])

    useEffect(() => {

    })
    
    const handleFilterNew = () => {

    }
    const handleFilterPopular = () => {

    }

    return (
        <Content>
            <div className={styles['feed-wrapper']}>
                <div className={styles['feed-topface']}>
                    <div className={styles['feed-filters-container']}>
                        <div className={styles['feed-filterempty']}>&nbsp;</div>
                        <div className={styles['feed-filter']}
                            onClick={handleFilterPopular}>
                            Noi
                        </div>
                        <div className={styles['feed-filter']}
                            onClick={handleFilterNew}>
                            Populare
                        </div>
                    </div>
                    <div className={styles['feed-empty']}></div>
                    <div></div>
                </div>
                <div className={styles['feed-art-wrapper']}>

                    {/* //TODO */}
                </div>
            </div>
        </Content>
    )


    
}