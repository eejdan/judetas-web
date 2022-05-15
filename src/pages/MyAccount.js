import React, { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios'

import ReactDataGrid from "@inovua/reactdatagrid-community";

import Content, { DefaultBoxFace } from '../components/Content'
import InstanceModal from '../components/modals/InstanceModal';
import AuthContext from '../context/AuthContext';

import styles from './MyAccount.module.css';

const roleGridColumns = [
    { name: 'displayName', header: 'Administrare asupra', defaultFlex: 1 },
    { name: 'parentName', header: 'Subdivizie a lui', defaultFlex: 1 }
]

export default function MyAccount(props) {

    const {
        session, onInvalidSession, accessToken, setAccessToken
    } = useContext(AuthContext);
    const [account, setAccount] = useState({});
    const [isAccount, setIsAccount] = useState(false);

    const [instanceModal, setInstanceModal] = useState(null);
    const [showInstanceModal, setShowInstanceModal] = useState(false);

    useEffect(() =>{
        var statusResolvers = {
            '500': async () => {
                //tbd TODO
            },
            '400': async () => {
                onInvalidSession();
            },
            '410': async () => {
                onInvalidSession();
            },
            '401': async () => {
                onInvalidSession();
            },
            '200': async (data) => {
                console.log(data);
                let container = {};
                container.registrationDate = data.registrationDate;
                container.username = data.username;
                container.fullName = data.fullName;
                container.email = data.email;
                container.roles = {};
                container.gridData = [];
                if(data.access.general) {
                    container.gridData.push({
                        displayName: 'Administrator General',
                        id: 0
                    });
                }
                if(data.access.local && data.access.local.length > 0)
                data.access.local.forEach((li) => {
                    let localContainer = {
                        displayName: li.displayName,
                        id: li.id
                    };
                    if(li.parentName) { 
                        localContainer.parentName = li.parentName
                        localContainer.parentId = li.parentId
                    };
                    container.gridData.push(localContainer)
                    container.roles[li.id] = localContainer;
                });
                console.log(container);
                setAccount(container);
                setIsAccount(true);
            }
        }
        axios.post('https://JudetAs-Backend.danielbirleanu.repl.co/api/admin/getaccount', {
            unsolved_sid: session,
            currentAccessToken: accessToken
        }, {
            headers: {
                "Content-Type": "application/json"  
            },
            validateStatus: status => {
                return !!(statusResolvers[status.toString()])
            }
        }).then( res => { 
            setAccessToken(res.headers.newaccesstoken);
            statusResolvers[res.status](res.data.account);
        }).catch(err => { 
            if(err.response) { 
               /* 
               setError('Eroare necunoscuta. Incercati mai tarziu');
               setShowError(true); */
           } else if (err.request) {
               /* 
               setError('Server indisponibil. Incercati mai tarziu');
               setShowError(true); */ 
           } else {
               console.log('err', err.message); 
           }
           console.log(err.config);
        });
        return function cleanup() {};
    }, [])

    const onRowClick = useCallback((rowProps, event) =>{
        if(rowProps.data.id !== 0 || rowProps.data.id !== '0') {
            setInstanceModal(rowProps.id);
            setShowInstanceModal(true);
        }
    }, [])

    const exitInstanceModal = () => {
        setShowInstanceModal(false);
        setInstanceModal(null);
    }

    return (
        <Content customBox={true}>
            { showInstanceModal && (
                <InstanceModal
                    instanceId={instanceModal}
                    exit={exitInstanceModal} 
                    originalPage={"Contul meu"}
                />
            )}
            <div className={styles['myaccount-wrapper']}>
                <div className={styles['myaccount-container']}>
                    <div>&nbsp;</div>
                    <div>&nbsp;</div>
                    <div className={styles['myaccount-topface']}>
                        <div>Contul meu</div>
                        <div className={styles['myaccount-hide-1000']}>&nbsp;</div>
                        <div className={styles['myaccount-hide-1000']}>&nbsp;</div>
                        <div className={styles['myaccount-hide-1000']}>&nbsp;</div>
                    </div>
                    <div className={styles["myaccount-box-wrapper"]}>
                        <div className={styles['myaccount-box']}>
                            { isAccount && (<React.Fragment>
                            <div className={styles['myaccount-box-face']}>
                                <div>{account.username}</div>
                                <div className={styles['myaccount-hide-1000']}>&nbsp;</div>
                                <div className={styles['myaccount-hide-1000']}>&nbsp;</div>
                                <div className={styles['myaccount-hide-1000']}>&nbsp;</div>

                            </div>
                            <div className={styles['myaccount-box-underface']}>
                                <div>Numele dumneavoastra: {account.fullName}</div>
                                <div>Email-ul contului: {account.email}</div> 
                            </div>
                            <div className={styles['myaccount-box-data']}>
                                <div className={styles['myaccount-box-data-desc']}>
                                    Rolurile dumneavoastra de administrare
                                </div>
                                <div className={styles['myaccount-box-data-table']}>
                                    <ReactDataGrid 
                                        onRowClick={onRowClick}
                                        idProperty='id'
                                        columns={roleGridColumns}
                                        dataSource={account.gridData}
                                    />
                                </div>
                            </div>
                            </React.Fragment>)}
                        </div>
                        <div>&nbsp;</div>
                    </div>
                
                </div>
            </div>
        </Content>
    )
    
}