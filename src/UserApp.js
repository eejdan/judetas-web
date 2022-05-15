import React, { useContext, useEffect, useState } from 'react'; 
import AuthContext from './context/AuthContext';

import Header from './components/Header';
import ContentContainer from './components/ContentContainer';
import ViewError from './pages/ViewError';

import UserLogin from './UserLogin';
import Feed from './userPages/Feed';
import NewArticle from './userPages/NewArticle';

import styles from './App.module.css';



export default function UserApp(props) {
    
    const {onInvalidSession, loggedIn } = useContext(AuthContext);

    //user pages
    const tabSelectData = [{
        value: 'feed', label: 'Flux' 
    }, {
        value: 'tracked', label: 'Postari Favorite'
    }, {
        value: 'profile', label: 'Profilul Meu'
    }, {
        value: 'newarticle', label: 'Postare Noua'
    }];
    var [tabSelectValue, setTabSelectValue] = useState(null);
    var [tab, setTab] = useState((<ViewError />))

    var tabViews = {
        'feed': () => {
            return <Feed />
        },
        'newarticle': () => {
            return <NewArticle />
        }

    }

    useEffect(() => {
        if(!tabSelectValue || tabSelectValue == null) return () => {}
        setTab(tabViews[tabSelectValue]())
    }, [tabSelectValue])

    useEffect(() => {
        if(!loggedIn) return () => {};
        setTabSelectValue('feed');
    }, [loggedIn])

 
    return (
        <div className={styles['layout-container']}>
            <Header 
                user={true}
                authorized={loggedIn}
                tabOptions={tabSelectData} 
                setTabIndex={setTabSelectValue}
            />
            <ContentContainer>
                { loggedIn
                ? (tab)
                : (<UserLogin back={props.back} />)
                }
            </ContentContainer>
        </div>
    )
}