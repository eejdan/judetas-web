
import React, { useEffect, useState } from "react";
import './Login.css'
import styles from "./Login.module.css"
import axios from 'axios';

export function LoginForm(props) {

    const [username, setUsername] = useState("");
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
            setUsername('');
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
                props.onLogin({
                    session_id: data.session_id,
                    username: username
                });
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
        axios.post('http://localhost:3030/api/auth/admin/login',{
            username: username,
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
                    onChange={e => setUsername(e.target.value)}
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