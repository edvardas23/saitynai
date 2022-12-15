import React, { useState } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import "../Layout/style.css";

function CreateTournamentItemModal(props){

    const createTournament = (event) =>{
        event.preventDefault();
        props.onCreate(event.target.name.value, event.target.description.value, event.target.prize.value);
    }

  return (
    <Modal
      {...props}
      color="black"
      backdropClassName='overlay'
      style={{overflowY:"scroll", overflowX:"hidden"}}>
        <Form onSubmit={createTournament} style={{marginLeft:"auto", marginRight:"20px"}}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3 style={{color:"black", textAlign:"center"}}>Naujo turnyro kūrimas</h3>
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
                <Form.Label>Prizas</Form.Label>
                <Form.Control name="prize" type='number' min='0' step='1' placeholder='100' required/>
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
export default CreateTournamentItemModal