
import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import styles from './App.module.css'
import ContentContainer from './components/ContentContainer';

/*import './App.css';

import useAuth from './hooks/useAuth';
import useErrorQueue from './hooks/useErrorQueue';
import PinModal from './PinModal'
 */

import AuthContext from './context/AuthContext';

import Header from './components/Header';

import Login from './Login';
import PinModal from './components/modals/PinModal';

import Unauthorized from './pages/Unauthorized';
import ViewError from './pages/ViewError';
import WSA from './pages/WSA';

import MyAccount from './pages/MyAccount';
import AdminGeneral from './pages/AdminGeneral';
import AdminLocal from './pages/AdminLocal';

import axios from 'axios';
//tbd 500 error page

function App() {

  const { 
    session, onInvalidSession,
    accessToken, setAccessToken,
    loggedIn,
    authorized, 
   } = useContext(AuthContext);

  const [tabSelectData, setTabSelectData] = useState([]);
  const [tabIndex, setTabIndex] = useState(-1);
  const [tabData, setTabData] = useState({});
  const [tab, setTab] = useState((<ViewError />))

  useEffect(() => {
    if(parseInt(tabIndex) < 0) return;
    var tabViews = {
      'account': () => { //tbd component TODO
        return (
          <MyAccount />
        )
      },
      'general': () => {
        return (
          <AdminGeneral />
        )
      },
      'localInstance': () => {
        return (
          <AdminLocal />
        )
      }
    }
    if(!tabViews[tabData[tabIndex].type]) { setTab(<ViewError />)}
    else { setTab(tabViews[tabData[tabIndex].type]()) }
  }, [tabIndex])

  useEffect(() => {
    if(!authorized) return () => {};
    var statusResolvers = {
      '500': async () => {
        //tbd display error TODO
      },
      '401': async () => { //tbd resolve 400 TODO 
        setAccessToken(null);
      },
      '410': async () => {
        onInvalidSession();
      },
      '204': async () => {
        setTab(<Unauthorized />)
      },
      '200': async (data) => {
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
        if(!data.local || parseInt(data.local.length) === 0) { // look down
          setTabData(newTabData);
          setTabIndex(0);
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
        setTabData(newTabData); //look up
        setTabIndex(0);
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
      setAccessToken(res.headers.newaccesstoken)
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
  }, [authorized])
  
  return (
    <div className={styles['layout-container']}>
      <Header 
        authorized={authorized} 
        userActions={{}}
        tabOptions={tabSelectData} 
        setTabIndex={setTabIndex}
        />
      <ContentContainer>
        {
          authorized
          ? (tab)
          : (loggedIn
            ? (<React.Fragment>
                {<WSA />}
                <PinModal 
                  headMessage={"Buna ziua, va rugam sa autorizati sesiunea:"}
                  />
              </React.Fragment>)
            : <Login/> )
        }
      </ContentContainer>
    </div>
  )
}

export default App;
