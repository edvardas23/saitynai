import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsTrash } from 'react-icons/bs';

function DeleteItemModal(props){
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      color="black"
      backdropClassName='overlay'
      style={{overflowY:"scroll", overflowX:"hidden"}}>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            <h3 style={{color:"black", textAlign:"center"}}>Dėmesio!</h3>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{textAlign:"center"}}>
              Ar tikrai norite ištrinti šį įrašą?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" style={{backgroundColor:"#dc3545", color:"white"}} onClick={props.onDelete}><BsTrash style={{verticalAlign:"middle", display:"inline-block", paddingRight:"4px"}}/><span style={{verticalAlign:"middle", display:"inline-block"}}>Pašalinti</span></Button>
            <Button onClick={props.onHide}>Atšaukti</Button> 
          </Modal.Footer>
    </Modal>
  );
}
export default DeleteItemModal