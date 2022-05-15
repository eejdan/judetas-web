import React from "react";



import Header from './components/Header'
import ContentContainer from "./components/ContentContainer";
import Content from './components/Content'

import styles from './App.module.css'


export default function ChooseApp(props) {
    return (
        <div className={styles['layout-container']}>
        <Header />
        <ContentContainer>
            <Content>
                <div className={styles['chooseapp-wrapper']}>
                    <div className={styles['chooseapp-container']}>
                        <div onClick={() => props.chooseTab(false)}>IC Autentificare ca Utilizator</div>
                        <div onClick={() => props.chooseTab(true)}>IC Autentificare ca Administrator</div> 
                    </div>
                </div>
            </Content>
        </ContentContainer>
        </div>
    ) //TODO ICON
}

//left fe choose app userlogin userapp userfeed useraccount userposts userfav
//left fe userregister user submit proof user awaiting confirmation page
//left be /api/user/getTracked
//left be /api/user/getMyProfile /api/user/getProfile
//TODO