import React, { createContext, useState, useRef } from "react";
import ReactDOM from 'react-dom';
import { v4 as uuid } from "uuid";

import './ErrorProvider.css';

export const ErrorContext = createContext({})
ErrorContext.displayName = 'errorContext'
function ErrorQueueBox(props) {

    return ReactDOM.createPortal(
        <div className="error-queue-box">
            { 
            props.items.map(item => 
            <div className={"item-"+(item.severe ? "danger" : "warning")}
                key={item.id}>
                <div className="item-x" onClick={() => props.remover(item.id)} />
                <div className="item-title">
                    Eroare
                </div>
                <div className="item-details">
                    {item.details}
                </div>
            </div>)
            }
        </div>
    , document.getElementById('error-portal'))
}


export function ErrorProvider({ children }) {
    const [errors, setErrors] = useState([]);

    const ref = useRef();
    ref.current = errors;

    function addError({ details, severe }, timeout = 10000) {
        const id = uuid();
        if(!severe) severe = true;
        setErrors([
            {   id,
                details, 
                severe,
                timeout: setTimeout(()=> {
                    removeError(id);
                }, timeout)
            }, ...errors
        ])
    }
    function removeError(id) {
        setErrors(ref.current.filter((msg) => msg.id !== id))
    }

    return (
        <ErrorContext.Provider value={{ addError }}>
            <ErrorQueueBox items={errors} remover={removeError} />
            {children}
        </ErrorContext.Provider>
    )
}