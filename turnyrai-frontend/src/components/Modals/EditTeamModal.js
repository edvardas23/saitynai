import React, { useState } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import "../Layout/style.css";
import { AiOutlineEdit } from 'react-icons/ai';

function EditTeamModal(props){

    const editTeam = (event) =>{
        event.preventDefault();
        props.onEdit(event.target.name.value, event.target.description.value, event.target.leader.value);
    }

  return (
    <Modal
      {...props}
      color="black"
      backdropClassName='overlay'
      style={{overflowY:"scroll", overflowX:"hidden"}}>
        <Form onSubmit={editTeam} style={{marginLeft:"auto", marginRight:"20px"}}>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3 style={{color:"black", textAlign:"center"}}>Komandos redagavimas</h3>
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
                <Button type='submit'><AiOutlineEdit style={{verticalAlign:"middle", display:"inline-block", paddingRight:"4px"}}/><span style={{verticalAlign:"middle", display:"inline-block"}}>Redaguoti</span></Button>
                <Button onClick={props.onHide}>Atšaukti</Button> 
            </Modal.Footer>
        </Form>
    </Modal>
  );
}
export default EditTeamModal