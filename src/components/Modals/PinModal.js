import React, { useEffect, useState, useContext } from "react";

import { sha256 } from "crypto-hash"

import Modal from "../Modal";

import styles from './PinModal.module.css'

import axios from 'axios';
import AuthContext from "../../context/AuthContext";

function PinModal(props) {
    const [pin, setPin] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const { onAuthorize, onInvalidSession,
        session
    } = useContext(AuthContext);

    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");
    var hideErrorTimeout;
    const setErrorTimeout = (seconds) => {
        clearTimeout(hideErrorTimeout);
        hideErrorTimeout = setTimeout(
            () => setShowError(false), seconds*1000)
    }

    useEffect(() => {
        return () => { //pentru cleanup la demontarea componentei
            clearTimeout(hideErrorTimeout);
            setPin('');
            setError('');
        }
    }, [])
    
    const handleSubmit = async event => { 
        event.preventDefault();

        const statusResolvers = {
            '201': (data) => {
                setShowError(false);
                setShowSuccess(true);
                onAuthorize(data.currentAccessToken);
            },
            '400': () => {
                onInvalidSession();
            },
            '401': () => {
                setErrorTimeout(5);
                setError("Invalid Pin");
                setShowError(true);
            },
            '403': () => {
                onInvalidSession();
            },
            '410': () => {
                onInvalidSession();
            },
            '500': () => {
                setErrorTimeout(30);
                setError('Eroare de server. Incercati mai tarziu')
                setShowError(true);
            }
        }
        let solvedSid = await sha256(session+pin);

        axios.post('https://JudetAs-Backend.danielbirleanu.repl.co/api/auth/admin/authorize', {
          unsolved_sid: session,
          solved_sid: solvedSid
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
                setErrorTimeout(30);
                setError('Eroare necunoscuta. Incercati mai tarziu');
                setShowError(true);
            } else if (err.request) {
                setErrorTimeout(30);
                setError('Server indisponibil. Incercati mai tarziu');
                setShowError(true);
            } else {
                console.log('err', err.message);
            }
            console.log(err.config);
        })

    }
    return (
      <React.Fragment>
        <Modal> 
            { showSuccess && (
                <div className="modal-success" >
                        Autorizat cu success. Va rugam asteptati.
                </div>
            )}
            { props.headMessage && (
                <div className={styles['head-message']}>
                    {props.headMessage}
                </div>
            )}
            { showError && (
            <div className={styles['error']}>
                { error }
            </div>
            )}
            <form onSubmit={handleSubmit}>
                <input type={"text"} onChange={e => setPin(e.target.value)}/>
                <input type={"submit"} />
            </form>
        </Modal>
      </React.Fragment>
    )
}

export default PinModal;