
import React, { useState, useCallback, useEffect } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css'

import './UserReq.css'

import axios from 'axios';

const gridStyle = { minHeight: 200 }

// const people = [
//     { nume: "George", prenume: "Gheorge", CNP: "200", id: 1},
//     { nume: "George1", prenume: "Gheorge1", CNP: "2100", id: 2}
// ]

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

function UserReq() {
    const [people, setPeople] = useState([]);
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
    return(
        <div className="UserReq">
            <ReactDataGrid
                idProperty='id'
                columns={columns}
                dataSource={people}
                enableSelection={true}
                onSelectionChange={onSelectionChange}
                style={gridStyle}
            
            />
        </div>
    )
}

export default UserReq;