import React, { useEffect, useState } from "react";
import axios from "axios";
import './Login.css'

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = event => {
        event.preventDefault()
    }

    return(
        <React.Fragment>
            <form className="login-form" 
                onSubmit={handleSubmit}>
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

