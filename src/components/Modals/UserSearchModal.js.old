import React, {useState} from 'react';

import ModalContainer from '../../ModalContainer';
import { ModalStatus } from '../../ModalContainer';

import Select from 'react-select'

import styles from './UserSearchModal.module.css'


const selectStyles = {
    menuPortal: base => ({ ...base, zIndex: 200 }),
    option: (provided, state) => ({
        ...provided,
        fontWeight: '300',
        textAlig: 'left',
        fontSize: '1.2em',
        fontFamily: "'Open Sans', sans-serif",
        zIndex: '1200',
        padding: '5px 10px',
        minWidth: 'fit-content !important'
    }),
    control: () => ({
        border: '1px solid salmon',
        borderRadius: '12px',
        margin: '0',
        fontWeight:'400'
    }),
    singleValue: (provided, state) => ({
        ...provided,
        fontWeight: '300',
        textAlig: 'left',
        fontSize: '.7em',
        fontFamily: "'Open Sans', sans-serif",
    }),
    dropdownIndicator: defaultStyles => ({
        ...defaultStyles,
        '& svg': { display: 'none' }
    }),
    indicatorsContainer: () => ({
        display: 'none'
    })
}



export default function UserSearchModal(props) {
    const [status, setStatus] = useState(false);
    const [statusColor, setStatusColor] = useState("red");

    const searchOptions = [
        { value: 'username', label: 'Nume de utilizator (username)' },
        { value: 'cnp', label: 'CNP' }
    ]

    const interimFunctions = {
        onCancel: () => {},
        onSubmit: () => {
            setStatusColor("green")
            setStatus("submitted")
            setTimeout(() => {
                setStatus(false);
            }, 5000)
            return false;
        },
        onError: (err) => {},
    }
    const serviceFunctions = {
        close: () => { props.setOpenSearch(false) }

    }
    
    const [queryDataString, setQueryDataString] = useState("");


    return (
        <ModalContainer 
            interimFunctions={interimFunctions}
            serviceFunctions={serviceFunctions}
            cancel={true}
            submit={true}
        >
           { ((status) && (
                <ModalStatus
                    color={statusColor}
                    message={status}
                />
            )) }
            <div className={styles.title}>
                
            </div>
            <div className={styles.search}> 
                <div className={styles['search-left']}>
                    Cautare dupa
                </div> 
                <div className={styles['search-right']}>
                    <Select 
                        isSearchable={false}
                        menuPortalTarget={document.getElementById('app-modal')}
                        options={searchOptions}
                        noOptionsMessage={() => 'FOOOO!'}
                        onChange={() => { setQueryDataString("") }}
                    />
                </div>
            </div>
            <input 
                className={styles['modal-input']}
                placeholder='@' 
                value={queryDataString} 
                onChange={(e) => {
                    setQueryDataString(e.target.value)
                }}
            />
        </ModalContainer>
    )
}