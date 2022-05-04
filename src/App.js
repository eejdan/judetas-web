
import React, { useEffect, useState } from 'react';
import './App.css';
import styles from './App.module.css'
import ContentContainer from './components/ContentContainer';

/* import { useCookies } from 'react-cookie'
import Login from './Login'
import './App.css';

import useAuth from './hooks/useAuth';
import useErrorQueue from './hooks/useErrorQueue';
import PinModal from './PinModal'
 */
import Header from './components/Header';
import AdminGeneral from './pages/AdminGeneral';
import Unauthorized from './pages/Unauthorized';

/* function App() {
  const [cookies, setCookies, removeCookie] = useCookies(['unsolved_sid'])
  const [isLoggedIn, setIsLoggedIn] = useState((cookies.unsolved_sid))
  const { auth, setAuth } = useAuth();
  const { addError } = useErrorQueue(); 
  useEffect(() => {
    if(cookies['unsolved_sid'])
        setAuth({
          loggedIn: true,
          session: cookies['unsolved_sid']
        })
  }, [])
  const onLogin = () => {
    setIsLoggedIn(true);
  }
  const onLogout = () => {
    setIsLoggedIn(false);
  }
  const onAuthorize = () => {
    
  }
  return( 
  <React.Fragment>
    {(!isLoggedIn ? (<div>
      <Login onLogin={onLogin} />
    </div>)
    : ( !auth.authorized ? <div>
      <PinModal sid={auth.session}/>
      Esti Logat; dar neautorizat
    </div>
    : <React.Fragment>
      Esti Logat;
    </React.Fragment>))}
   
  </React.Fragment>
  )
  
} */


function App() {
  return (
    <div className={styles['layout-container']}>
      <Header />
      <ContentContainer>
        <AdminGeneral />
      </ContentContainer>
    </div>
  )
}


export default App;
