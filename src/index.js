import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';

import ViewError from './pages/ViewError';
import ChooseApp from './ChooseApp'
import UserApp from './UserApp'
import App from './App'

import styles from './index.module.css'
import './index.css';
import './colors.css'

import { CookiesProvider, useCookies } from 'react-cookie';
// import { ErrorProvider } from './context/ErrorProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { AuthProvider } from './context/AuthContext';

import axios from 'axios';

const container = document.getElementById('root')
const root = createRoot(container);

root.render(
    <AuthProvider>
        <ThemeProvider>
            <CookiesProvider>
                <Index />
            </CookiesProvider>
        </ThemeProvider>
    </AuthProvider>
)
/* root.render(
    <AuthProvider>
        <ThemeProvider>
            <ErrorProvider>
                <CookiesProvider>
                    <App />
                </CookiesProvider>
            </ErrorProvider>
        </ThemeProvider>
    </AuthProvider>
) */

function Index() {
    
    const [cookies, setCookie, removeCookie] = useCookies();

    const [loaded, setLoaded] = useState(false);
    const [isChoice, setIsChoice] = useState(false);
    const [choice, setChoice] = useState(<ViewError />);

    var tabViews = {
        'user': () => {
            return <UserApp back={() => { setIsChoice(false) }}/>
        },
        'admin': () => {
            return <App back={() => { setIsChoice(false) }}/>
        }
    }
    var chooseTab = (admin) => {
        if(admin) {
            setChoice(tabViews['admin']())
        } else setChoice(tabViews['user']()) 
        setIsChoice(true);
    }
    useEffect(() => {
        if(!cookies['unsolved_sid']) {
            setLoaded(true);
            return () => {};
        }

        const statusResolvers = {
            '200': (data) => {
                if(data.elevated) {
                    setChoice(tabViews['admin']())
                } else {
                    setChoice(tabViews['user']()) 
                }
                setIsChoice(true);
            }, 
            '410': () => {
                setCookie('unsolved_sid', '');// anti data leak
                removeCookie('unsolved_sid');
                setIsChoice(false);
            }
        }
        axios.post('http://localhost:3030/api/auth/getSessionType', {
            session_id: cookies.unsolved_sid
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            validateStatus: status => {
                return !!(statusResolvers[status.toString()]);
            }
        }).then( res => {
            statusResolvers[res.status](res.data);
        }).catch(err => {
            if(err.response) {
            } else if (err.request) {
            } else {
                console.log('err', err.message);
            }
            console.log(err.config);
        }).finally(() => {
            setLoaded(true);
            return () => {};
        })
    }, [])
    
    return (
        <React.Fragment>
            {   loaded
                ? (isChoice
                    ? (
                       choice 
                    ) : (<ChooseApp 
                        chooseTab={chooseTab}
                        />
                    )
                )
                : (<div className={styles['loading']}>Loading...</div>)
            }
        </React.Fragment>
    )
}