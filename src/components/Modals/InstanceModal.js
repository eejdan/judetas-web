import { useContext, useEffect } from 'react'; 


import Modal from "../Modal";
import AuthContext from "../../context/AuthContext";
import axios from 'axios';
import styles from './InstanceModal.module.css'

export default function InstanceModal(props) {

    const {
        session, onInvalidSession, accessToken, setAccessToken
    } = useContext(AuthContext);

    useEffect(() => {

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

            }
        }
        axios.post('https://JudetAs-Backend.danielbirleanu.repl.co/api/localAdmin/')
    }, [])

    return (
        <Modal>
            Numele diviziei
            <br />
            { props.exit && (
                <button onClick={props.exit}>Inapoi la {props.originalPage}</button>
            )}

        </Modal>
    )
}