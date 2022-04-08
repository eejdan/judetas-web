
import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

import Login from './Login'

import './App.css';


import axios from 'axios';

function App() {
  const [page, setPage] = useState(<div></div>)

  const appLayout = 
    <Tabs>
    <div className="layout-container">
      <div className="left-wrapper">
        <div className="user-container">
          <span className="dot"></span>
          <div>Will contain JudetAs Name and logo</div>
        </div>
        <div className="nav-container">
          <div>
            will contain sectiuni
          </div>
          <TabList>
            <Tab>
              1
            </Tab>
            <Tab>
              2
            </Tab>
          </TabList>
        </div>
      </div>
      <div className="right-wrapper">
        <div className="header-wrapper">
          <header className="header">
            <div className="head">
                Tab Name + info
            </div>
            
          </header>
        </div>
        <div className="content-wrapper">
          <TabPanel>
            content 1
          </TabPanel>
          <TabPanel>
            content 2
          </TabPanel>
        </div>
      </div>
    </div>
    </Tabs>;
  useEffect(() => {
    setPage(<Login />)
    // axios.get()
  }, [])

  return (
    <React.Fragment>
      {page}
    </React.Fragment>
  )
}

export default App;
