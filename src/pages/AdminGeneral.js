import React, {useState, useEffect, useCallback} from "react";


import ModalContainer from '../ModalContainer';
import { ModalStatus } from "../ModalContainer";
import UserSearchModal from "../components/Modals/UserSearchModal";

import styles from './AdminGeneral.module.css'

//pagina "Administrare Generala"

import axios from "axios";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import '@inovua/reactdatagrid-community/index.css'
import Select from 'react-select';



const gridStyle = { 
    height: "100%", 
    maxHeight: "100%", 
    minHeight: "1px", 
    fontFamily: 'Helvetica, sans-serif' 
}

const columns = [
    { name: "lastName", header: "Nume", id: "nume",
        defaultFlex: 1,
    },
    { name: "firstName", header: "Prenume", id: "prenume",
        defaultFlex: 1.
    },
    { name: "CNP", header: "CNP", id: "CNP", 
        type: 'string', 
        defaultFlex: 2
    }
]

export default function AdminGeneral() {

    const [people, setPeople] = useState([
        { firstName: "George", lastName: "Gheorge", CNP: "200", id: 1},
        { firstName: "George1", lastName: "Gheorge1", CNP: "2100", id: 2}
    ]);
    useEffect(() => {
        axios
        .get("/api/admin/user-req")
        .then(response => {
            if(response.status === 200)
                setPeople(response.data)
        }).catch(err => {
            if(err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else if(err.request) {
                console.log(err.request);
            } else {
                console.log('Error', err.message);
            }
            console.log(err.config);
        })
    }, [])


    const [selected, setSelected] = useState(null);
    
    const onSelectionChange = useCallback(({ selected }) => {
        setSelected(selected);
        console.log(people[selected-1].CNP)
    }, [])
    const [openSearch, setOpenSearch] = useState(null);
    return(
        <React.Fragment>
            <div className={styles['general-wrapper']}>
                <div className={styles['general-box']}>
                    <div className={styles['box-face']}>
                        <h3>
                        &nbsp;&nbsp; Administrare platforma
                        </h3>
                        <div className={styles['box-face-desc']}>
                            <div className={styles['box-face-desc-text']}>
                                Atribuire roluri de administrator pentru unitati admnistrativ teritoriale<br />
                                Selectati o cerere de administrare sau cautati un utilizator pentru a-i atribui un rol de administrare
                            </div>
                            <div className={styles['box-face-desc-button']}>
                                <button onClick={() => {
                                    setOpenSearch(true);
                                }}>Cautati un utilizator</button>
                            </div>
                        </div>
                        {openSearch &&(
                            <UserSearchModal setOpenSearch={setOpenSearch} />
                        )
                        }
                    </div>
                    <div className={styles['box-table']}>
                    <ReactDataGrid
                        idProperty='id'
                        columns={columns}
                        dataSource={people}
                        enableSelection={true}
                        onSelectionChange={onSelectionChange}
                        style={gridStyle}
                    
                    />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const selectStyles = {
    menuPortal: base => ({ ...base, zIndex: 200 }),
    option: (provided, state) => ({
        ...provided,
        fontWeight: '300',
        textAlig: 'left',
        fontSize: '1.2em',
        fontFamily: "'Open Sans', sans-serif",
        zIndex: '200',
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
