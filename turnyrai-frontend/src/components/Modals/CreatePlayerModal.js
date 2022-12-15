import React, { useState } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import "../Layout/style.css";

function CreatePlayerItemModal(props){

    const createPlayer = (event) =>{
        event.preventDefault();
        props.onCreate(event.target.name.value, event.target.sports.value, event.target.age.value);
    }

  return (
    <Modal
      {...props}
      color="black"
      backdropClassName='overlay'
      style={{overflowY:"scroll", overflowX:"hidden"}}>
        <Form onSubmit={createPlayer} style={{marginLeft:"auto", marginRight:"20px"}}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3 style={{color:"black", textAlign:"center"}}>Naujo žaidėjo kūrimas</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                <Form.Label>Vardas</Form.Label>
                <Form.Control name="name" type="text" placeholder="Pavadinimas" autoFocus required/>
                </Form.Group>
                <Form.Group>
                <Form.Label>Sporto šaka</Form.Label>
                <Form.Control name="sports" type="text" placeholder="Sportas" required/>
                </Form.Group>
                <Form.Group>
                <Form.Label>Amžius</Form.Label>
                <Form.Control name="age" type='number' min='0' max='120' step='1' placeholder='20' required/>
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
export default CreatePlayerItemModal