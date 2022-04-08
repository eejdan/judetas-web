
import React, { useEffect, useState } from "react";
import './Login.css'

const axios = require('axios').default;

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [errorDisplay, setErrorDisplay] = useState("none")
    let errorTimeout;
    const handleSubmit = event => {
        event.preventDefault()
        axios.post('/api/auth/login', {
            password: password, 
            username: username
        }).then( res => {
            //temporar
            setError("Date corecte!")
            setErrorDisplay("block")
            errorTimeout = setTimeout(() => {
                setError("");
                setErrorDisplay("none")
            }, 15000)
        }).catch(err => {
            if(err.response) {
                switch(err.response.status) {
                    case 400:
                        clearTimeout(errorTimeout)
                        setError("Date de autentificare malformate.")
                        setErrorDisplay("block")
                        errorTimeout = setTimeout(() => {
                            setError("");
                            setErrorDisplay("none")
                        }, 15000)
                        break;
                    case 401:
                        clearTimeout(errorTimeout)
                        setError("Nume de utilizator sau parola gresite.")
                        setErrorDisplay("block");
                        errorTimeout = setTimeout(() => {
                            setError("");
                            setErrorDisplay("none")
                        }, 15000)
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
    return(
        <React.Fragment>
            <form className="login-form" 
                onSubmit={handleSubmit}>
                <div 
                    className="login-form-error" 
                    style={{display: errorDisplay}}>
                        {error}
                </div>
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

export default function Login() {


    useEffect(() => {

    }, [])

    return(
    <div className="login-box">
        <div className="top-span">&nbsp;</div>
        <header className="header">
            <div className="logo-box">
                <span className="temp-logo-span"></span>
            </div>
            <div className="title-box">
                JudetAs
            </div>
        </header>
        <div className="login-form-wrapper">       
            <LoginForm />
        </div>
        <div className="bottom-span">&nbsp;</div>
    </div>
    )
}

