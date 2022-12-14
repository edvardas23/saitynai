import React, {useState} from "react";
import { login } from "../../services/services";
import { saveUserInfo , getUserInfo} from "../../services/storage";
import "./LoginModal.Module.css";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Modal, Form} from 'react-bootstrap';


export default function LoginModal(){
    const onSubmitHandler = (event) =>{
        event.preventDefault();
        login(event.target.uname.value, event.target.pass.value).then(
            (res) => {
                saveUserInfo(res);
                toggleModal();
                window.location.reload(false);
                console.log(res);
            }).catch(
                (err) =>{
                alert("Neteisingi prisijungimo duomenys!");
                console.log(err);
            });
    }
    const portalElement = document.getElementById('overlays');
    const [modal, setModal] = useState(false);
    const toggleModal = () =>{
        setModal(!modal)
    }
    if(modal){
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    return(
        <React.Fragment>
        {!getUserInfo()  &&
        <button onClick={toggleModal} className="btn-header">
            Prisijungti
        </button>}
        { ReactDOM.createPortal(modal && (
            <form onSubmit={onSubmitHandler}>
                <div className="modal" style={{marginLeft:"auto", marginRight:"20px"}}>
                    <div className="overlay">
                        <div className="modal-content">
                            <Modal.Header>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    <h3 style={{color:"black", textAlign:"center"}}>Prisijungimas</h3>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group>
                                <Form.Label>Naudotojo vardas</Form.Label>
                                <Form.Control style={{width:"90%"}} name="uname" type="text" placeholder="Naudotojo vardas" autoFocus required/>
                                </Form.Group>
                                <Form.Group>
                                <Form.Label>Slapta??odis</Form.Label>
                                <Form.Control style={{width:"90%"}} name="pass" type="password" placeholder="Slapta??odis" required/>
                                </Form.Group>
                            </Modal.Body>
                            <div className="modal-footer">
                                <button inputMode="submit" className="btn btn-primary">
                                    Prisijungti
                                </button>
                                <button className="btn btn-secondary" onClick={toggleModal}>
                                    At??aukti
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        ), portalElement)}
       </React.Fragment>
    );
}
