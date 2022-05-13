import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

export default function Modal(props) {
    return ReactDOM.createPortal(
        <div className='modal-wrapper'>
            <div className='modal'>
            {props.children}
            </div>
        </div>
    , document.getElementById('app-modal'))
}