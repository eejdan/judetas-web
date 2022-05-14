import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import styles from './ModalContainer.module.css'

export default function ModalContainer(props) {
  function close() {
    props.serviceFunctions.close();
  }
  function submit() {
    if(props.interimFunctions.onSubmit())
      close();
  }
  return ReactDOM.createPortal(
    <div className={styles['modal-wrapper']}
      onClick={close}
    >
      <div>&nbsp;</div>
      <div className={styles['modal-box']}
        onClick={(e) => e.stopPropagation()}  
      >
        <div className={styles['modal-content']}>
          {props.children}
        </div>
        <div className={styles['modal-actions']}>
          {props.cancel && (<button onClick={() => {
            props.interimFunctions.onCancel();
            close();
          }}>Cancel</button>)} 
          {props.submit && (<button onClick={() => {
            submit();
          }}>Submit</button>)}
        </div>
      </div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
    </div>
  , document.getElementById('app-modal'))
} 

export function ModalStatus(props) {
  return(
    <div className={styles['modal-status']}
    style={{backgroundColor: props.color}}
  >
    {props.message}
  </div>
  )
}