
import React, { useEffect, useState } from 'react';
import './App.css';
import styles from './App.module.css'
import ContentContainer from './components/ContentContainer';

import { useCookies } from 'react-cookie'

/*import './App.css';

import useAuth from './hooks/useAuth';
import useErrorQueue from './hooks/useErrorQueue';
import PinModal from './PinModal'
 */
import Header from './components/Header';

import Login from './Login';
import PinModal from './components/Modals/PinModal';

import Unauthorized from './pages/Unauthorized';
import ViewError from './pages/ViewError';
import AdminGeneral from './pages/AdminGeneral';
import AdminLocal from './pages/AdminLocal';
import axios from 'axios';
//tbd 500 error page

function App() {
  const [user, setUser] = useState({});
  const [cookies, setCookie] = useCookies();
  const [userActions, setUserActions] = useState({});

  const [session, setSession] = useState(false);
  const [accessToken, setAccessToken] = useState(false);

  const [authorized, setAuthorized] = useState(false);
  const [isSession, setIsSession] = useState(false);

  const [tabSelectData, setTabSelectData] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [tabData, setTabData] = useState({});
  const [tab, setTab] = useState((<ViewError />))


  useEffect(() => {
    const cleanupFunction = () => {}
    if(!(cookies.unsolved_sid)) return cleanupFunction;

    updateAuth.setSession(cookies.unsolved_sid)

  }, [])

  

  useEffect(() => {
    if(!tabIndex) return;
    var tabViews = {
      'account': () => { //tbd component TODO
        return <ViewError />
      },
      'general': () => {
        return <AdminGeneral /> //tbd props TODO
      },
      'localInstance': () => {
        return <AdminLocal /> //tbd props TODO
      }
    }
    if(!tabViews[tabData[tabIndex].type]) { setTab(<ViewError />)}
    else { setTab(tabViews[tabData[tabIndex].type]()) }
  }, [tabIndex])

  const updateAuth = {
    setAccessToken: (accessToken) => {
      setAccessToken(accessToken);
      if(!authorized) setAuthorized(true);
    },
    removeAccessToken: () => {
      setAccessToken(false);
      setAuthorized(false);
    },
    setSession: (session_id) => {
      setSession(session_id);
      setAccessToken(false);
      setCookie('unsolved_sid', session_id);
      if(!isSession) setIsSession(true);
      if(!userActions.logout) setUserActions({
        ...userActions,
        logout: true
      })
    },
    removeSession: () => {
      setSession(false);
      setAccessToken(false);
      setCookie('unsolved_sid', '')
      setIsSession(false);
      setAuthorized(false);
      setUserActions({
        ...userActions,
        logout: false
      })
    }
  }

  const onLogin = (data) => {
    updateAuth.setSession(data.session_id)
    setUser({
      ...user,
      username: data.username
    })
  }

  const onLoginAuthorize = (accessToken) => {

    updateAuth.setAccessToken(accessToken);
    var statusResolvers = {
      '500': () => {
        
        //display error
      },
      '401': () => {
        updateAuth.removeAccessToken();
      },
      '410': () => {
        onInvalidSession();
      },
      '204': () => {
        setTab(<Unauthorized />)
      },
      '200': (data) => {
        console.log(data);
        let newTabData = {
          tabs: ['0'],
          '0': {
            type: 'account',
            displayName: 'Contul Meu'
          }
        };
        let newTabSelectData = [
          {
            value: '0', label: 'Contul Meu'
          }
        ]
        let count = 1;
        if(data.general) {
          count++
          newTabData.tabs[newTabData.tabs.length] = count;
          newTabData[count.toString()] = {
            type: 'general',
            displayName: 'Administrator General'
          };
          newTabSelectData[newTabSelectData.length] = {
            value: count.toString(), label: 'Administrator General' 
          }
        }
        if(!data.local || parseInt(data.local.length) === 0) {
          setTabData(newTabData);
          console.log(newTabSelectData);
          console.log('data above')
          setTabSelectData(newTabSelectData);
          return;
        }
        data.local.forEach(li => {
          count++;
          newTabData.tabs[newTabData.tabs.length] = count;
          newTabData[count.toString()] = {
            type: 'localInstance',
            id: li.instanceid,
            displayName: li.displayName,
            parents: li.parents
          }
          let selectDisplayName = li.displayName
          if(li.parents) if(li.parents.length > 0) selectDisplayName += ', '+li.parents.join(', ')
          newTabSelectData[newTabSelectData.length] = {
            value: count.toString(), label: selectDisplayName
          }
        });
        setTabData(newTabData);
        console.log(newTabSelectData);
        console.log('data above')
        setTabSelectData(newTabSelectData);
      },
    }
    axios.post('http://localhost:3030/api/admin/roles', {
      unsolved_sid: session,
      currentAccessToken: accessToken
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      validateStatus: status => {
        return !!(statusResolvers[status.toString()])
      }
    }).then( res => {
      statusResolvers[res.status](res.data);
    }).catch(err => {
       if(err.response) {
          /* setErrorTimeout(30);
          setError('Eroare necunoscuta. Incercati mai tarziu');
          setShowError(true); */
      } else if (err.request) {
          /* setErrorTimeout(30);
          setError('Server indisponibil. Incercati mai tarziu');
          setShowError(true); */
      } else {
          console.log('err', err.message);
      }
      console.log(err.config);
    });
  }
  const onInvalidSession = () => {
    updateAuth.removeSession()
  }
  return (
    <div className={styles['layout-container']}>
      <Header 
        authorized={authorized} 
        userActions={userActions}
        tabOptions={tabSelectData} 
        setTabIndex={setTabIndex}
        />
      <ContentContainer>
        {
          authorized
          ? (tab)
          : (isSession
            ? (<React.Fragment>
                {(tab && (tab))}
                <PinModal 
                  onAuthorize={onLoginAuthorize} 
                  onInvalidSession={onInvalidSession}
                  sid={session}
                  headMessage={"Buna ziua, va rugam sa autorizati sesiunea:"}
                  />
              </React.Fragment>)
            : <Login onLogin={onLogin}/> )
        }
      </ContentContainer>
    </div>
  )
}

export default App;
