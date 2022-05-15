import React, { useContext, useEffect, useState } from 'react';

import { Form, FloatingLabel } from 'react-bootstrap'

import Content from '../components/Content';

import styles from './NewArticle.module.css'
import axios from "axios";

export default function NewArticle() {

    const [problem, setProblem] = useState('');
    const [solution, setSolution] = useState('');

    const [instances, setInstances] = useState('');

    const handleCommit = (e) => {
        e.preventDefault();
        var statusResolvers = {
            '200': () => {
                
            },
            '401': () => {

            },
            '500': () => {

            }
        }
        axios.post('', {

        }, {

        })
    
    }

    return (
        <Content>
            <div className={styles["newarticle-wrapper"]}>
                <Form>
                <Form.Group>
                    <FloatingLabel for="select1">Instance</FloatingLabel>
                    <div>
                    <Form.Select id="select1" name="select1">
                        <option value="rabbit">Rabbit</option>
                        <option value="duck">Duck</option>
                        <option value="fish">Fish</option>
                    </Form.Select>
                    </div>
                </Form.Group>
                <Form.Group>
                    <FloatingLabel for="problemtext">Descriere Problema</FloatingLabel>
                    <Form.Control id="problemtext" name="problemtext" cols="40" rows="5" class="form-control"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.FloatingLabel for="mediacontent">Media</Form.FloatingLabel>
                    <div>
                    <Form.Select id="mediacontent" name="mediacontent">
                        <option value="rabbit">Rabbit</option>
                        <option value="duck">Duck</option>
                        <option value="fish">Fish</option>
                    </Form.Select>
                    </div>
                </Form.Group>
                <Form.Group>
                    <FloatingLabel for="solutiontext">Descriere Solutie (optional)</FloatingLabel>
                    <Form.Control id="solutiontext" name="solutiontext" cols="40" rows="5" class="form-control"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <button name="submit" type="submit" class="btn btn-primary">Posteaza</button>
                </Form.Group>
                </Form>
            </div>
        </Content>
    )
}
