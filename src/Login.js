
import React, { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";
import useErrorQueue from "./hooks/useErrorQueue";
import './Login.css'

const axios = require('axios').default;

function LoginForm(props) {
    const { auth, setAuth } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setError } = useErrorQueue();
    const [success, setSuccess] = useState("")
    const [successDisplay, setSuccessDisplay] = useState("none")
    const handleSubmit = event => {
        event.preventDefault()
        axios.post('/api/auth/login', {
            password: password, 
            username: username
        }).then( res => {
            //temporar
            setAuth({
                loggedIn: true,
                user: username,
                session: res.data.sid,
                authorized: false,
                currentAccessToken: null
            })
            setSuccess("Date corecte!")
            setSuccessDisplay("block")
            setTimeout(() => {
                setSuccess("");
                setSuccessDisplay("none")
            }, 15000)
            props.onLogin();
        }).catch(err => {
            if(err.response) {
                switch(err.response.status) {
                    case 400:
                        setError("Date de autentificare malformate.")
                        break;
                    case 401:
                        setError("Nume de utilizator sau parola gresite.")
                        break;
                    case 404:
                        setError("Server indisponibil")
                        break;
                    default:
                        setError("Eroare");
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
                    className="login-form-success" 
                    style={{display: successDisplay}}>
                        {success}
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

export default function Login(props) {


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
            <LoginForm onLogin={props.onLogin}/>
        </div>
        <div className="bottom-span">&nbsp;</div>
    </div>
    )
}

