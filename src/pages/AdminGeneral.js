import React, {useState, useEffect, useCallback} from "react";


import styles from './AdminGeneral.module.css'

//pagina "Administrare Generala"

import ReactDataGrid from "@inovua/reactdatagrid-community";
import '@inovua/reactdatagrid-community/index.css'



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

export default function AdminGeneral(props) {

    const [people, setPeople] = useState([
        { firstName: "George", lastName: "Gheorge", CNP: "200", id: 1},
        { firstName: "George1", lastName: "Gheorge1", CNP: "2100", id: 2}
    ]);
    useEffect(() => {
    }, [])


    const [selected, setSelected] = useState(null);
    
    const onSelectionChange = useCallback(({ selected }) => {
        setSelected(selected);
        console.log(people[selected-1].CNP)
    }, [])
    const [openSearch, setOpenSearch] = useState(null);
    return(
        <React.Fragment>
{/*             <div className={styles['general-wrapper']}>
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
            </div> */}
        </React.Fragment>
    )
}