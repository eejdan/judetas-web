import React, { useState } from "react";
import useAuth from "./hooks/useAuth";
import Modal from "./components/Modal";
import axios from 'axios'

import { sha256 } from "crypto-hash"

function PinModal(props) {
    // to be stylize
    console.log(props);
    const { setAuth } = useAuth();
    const [pin, setPin] = useState("");
    const handleSubmit = async event => {
      event.preventDefault();
      let solvedSid = await sha256(props.sid+pin)
      axios.post('/api/auth/authorize', {
        'unsolved_sid': props.sid,
        'solved_sid': solvedSid
      }).then( res => {
          props.onAuthorize(res.data.currentAccessToken)
    }).catch(err => {
        if(err.response) {
          console.log(err.response.status);
          switch(err.response.status) {
            case 410:
              setAuth({ loggedIn: false });
              break;
            case 400:
              console.log(props.sid)
              console.log(solvedSid);
              break;
            default:
              break;
          }
        } else if (err.request) {
            
        } else {
            console.log('err', err.message);
        }
        console.log(err.config);
    }).then(() =>{
  
    })
    }
    return (
      <React.Fragment>
        <Modal>
          <form onSubmit={handleSubmit}>
            <input type={"text"} onChange={e => setPin(e.target.value)}/>
            <input type={"submit"} />
          </form>
        </Modal>
      </React.Fragment>
    )
}

export default PinModal;