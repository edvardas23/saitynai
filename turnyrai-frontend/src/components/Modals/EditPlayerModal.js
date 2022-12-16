import React, { useState } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import "../Layout/style.css";
import { AiOutlineEdit } from 'react-icons/ai';

function EditPlayerModal(props){

    const editPlayer = (event) =>{
        event.preventDefault();
        props.onEdit(event.target.name.value, event.target.sports.value, event.target.age.value);
    }

  return (
    <Modal
      {...props}
      color="black"
      backdropClassName='overlay'
      style={{overflowY:"scroll", overflowX:"hidden"}}>
        <Form onSubmit={editPlayer} style={{marginLeft:"auto", marginRight:"20px"}}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3 style={{color:"black", textAlign:"center"}}>Žaidėjo redagavimas</h3>
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
                <Button type='submit'><AiOutlineEdit style={{verticalAlign:"middle", display:"inline-block", paddingRight:"4px"}}/><span style={{verticalAlign:"middle", display:"inline-block"}}>Redaguoti</span></Button>
                <Button onClick={props.onHide}>Atšaukti</Button> 
            </Modal.Footer>
        </Form>
    </Modal>
  );
}
export default EditPlayerModal