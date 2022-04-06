
import { createContext, useEffect, useState } from 'react';

import './App.css';
// import Layout from './util/Layout';
//import UserReq from './components/UserReq'
import Header from './components/Header'


import axios from 'axios';

const TabsContext = createContext(null);

function App() {

  // const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);

  const [tabs, setTabs] = useState(null)

  useEffect(() => {
    axios.get()
  }, [])

  return (
    <TabsContext.Provider value={tabs}>
      <div className="layout-container">
        <div className="left-wrapper">
        
        </div>
        <div className="right-wrapper">
          <div className="header-wrapper">
            <Header />
          </div>
          <div className="content-wrapper">
            test
          </div>
        </div>
      </div>
    </TabsContext.Provider>
  )
}

export default App;
