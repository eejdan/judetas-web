import React, { useState, useContext, useEffect } from 'react';
import AuthContext from './context/AuthContext';

import './Login.css'
import axios from 'axios'



function UserLoginForm() {
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


    const handleSubmit = event => {
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
        axios.post('http://localhost:3030/api/auth/user/login',{
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

    useEffect(() => { // done
        return () => { //pentru cleanup la demontarea componentei
            clearTimeout(hideErrorTimeout);
            setMockUsername('');
            setPassword('');
            setError('');
        }
    }, [])


    return (        
    <React.Fragment>
        <form className="login-form" 
            onSubmit={handleSubmit}>
            { showSuccess && (
                <div className="login-form-success" >
                        Autentificat cu success. Va rugam asteptati.
                </div>
            )}
            { showError && (
                <div className="error">
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
            <UserLoginForm onLogin={props.onLogin}/>
        </div>
        <div><button onClick={props.back}>Inapoi</button></div>
        <div className="bottom-span">&nbsp;</div>

    </div>
    )
}