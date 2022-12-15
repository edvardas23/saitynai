import React, { useState } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import "../Layout/style.css";

function CreateTeamModal(props){

    const createTeam = (event) =>{
        event.preventDefault();
        props.onCreate(event.target.name.value, event.target.description.value, event.target.leader.value);
    }

  return (
    <Modal
      {...props}
      color="black"
      backdropClassName='overlay'
      style={{overflowY:"scroll", overflowX:"hidden"}}>
        <Form onSubmit={createTeam} style={{marginLeft:"auto", marginRight:"20px"}}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3 style={{color:"black", textAlign:"center"}}>Naujos komandos kūrimas</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                <Form.Label>Pavadinimas</Form.Label>
                <Form.Control name="name" type="text" placeholder="Pavadinimas" autoFocus required/>
                </Form.Group>
                <Form.Group>
                <Form.Label>Aprašymas</Form.Label>
                <Form.Control  name="description" style={{maxWidth:"600px", minWidth:"200px", width:"100%"}} as="textarea" rows={3} required/>
                </Form.Group>
                <Form.Group>
                <Form.Label>Komandos kapitonas</Form.Label>
                <Form.Control name="leader" placeholder="Komandos kapitonas" required/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button type='submit'>Sukurti</Button>
                <Button onClick={props.onHide}>Atšaukti</Button> 
            </Modal.Footer>
        </Form>
    </Modal>
  );
}
export default CreateTeamModal