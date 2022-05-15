
import React, { useContext, useEffect, useState } from "react";
import './Login.css'
import styles from "./Login.module.css"

import AuthContext from "./context/AuthContext";

import axios from 'axios';

export function LoginForm(props) {

    const { setUsername, onNewSession } = useContext(AuthContext); 

    const [mockUsername, setMockUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");
    var hideErrorTimeout;
    const setErrorTimeout = (seconds) => {
        clearTimeout(hideErrorTimeout);
        hideErrorTimeout = setTimeout(
            () => setShowError(false), seconds*1000)
    }

    useEffect(() => { // done
        return () => { //pentru cleanup la demontarea componentei
            clearTimeout(hideErrorTimeout);
            setMockUsername('');
            setPassword('');
            setError('');
        }
    }, [])


    const handleSubmit = event => { //done
        event.preventDefault();

        const statusResolvers = {
            '200': (data) => {
                setShowError(false)
                setShowSuccess(true);
                setUsername(mockUsername);
                onNewSession(data.session_id);
            }, 
            '401': () => {
                setError('Date incorecte.');
                setErrorTimeout(5);
            },
            '500': () => {
                setError('Eroare de server. Incercati mai tarziu')
                setShowError(true);
                setErrorTimeout(30);
            }
        }
        axios.post('https://JudetAs-Backend.danielbirleanu.repl.co/api/auth/admin/login',{
            username: mockUsername,
            password: password
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
        });
    }
    return(
        <React.Fragment>
            <form className="login-form" 
                onSubmit={handleSubmit}>
                { showSuccess && (
                    <div className="login-form-success" >
                            Autentificat cu success. Va rugam asteptati.
                    </div>
                )}
                { showError && (
                    <div className={styles['error']}>
                        { error }
                    </div>
                )}
                <label>Nume de utilizator</label>
                <input type={"text"}
                    onChange={e => setMockUsername(e.target.value)}
                />
                <label>Parola</label>
                <input type={"password"} 
                    onChange={e => setPassword(e.target.value)}
                />
                <input type={"submit"} />
            </form>
        </React.Fragment>
    )
}

export default function Login(props) {

    return(
    <div className="login-box">
        <div className="top-span">&nbsp;</div>
        <div className="login-form-wrapper">       
            <LoginForm onLogin={props.onLogin}/>
        </div>
        <div className="bottom-span">&nbsp;</div>
    </div>
    )
}