import React, {useState} from "react";
import { login } from "../../services/services";
import { saveUserInfo , getUserInfo} from "../../services/storage";
import "./LoginModal.Module.css";
import ReactDOM from "react-dom";

export default function LoginModal(){
    const onSubmitHandler = (event) =>{
        event.preventDefault();
        login(event.target.uname.value, event.target.pass.value).then(
            (res) => {
                saveUserInfo(res);
                toggleModal();
                console.log(res);
            }).catch(
                (err) =>{
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
            Atsijungti
        </button>}
        { ReactDOM.createPortal(modal && (  
            <form onSubmit={onSubmitHandler}>
                <div className="modal">
                    <div className="overlay">
                        <div className="modal-content">
                            <div>
                               <h3 style={{ textAlign: 'center' }}>Ar tikrai norite atsijungti?</h3>
                            </div>
                            <div className="modal-footer">
                                <button inputMode="submit" className="btn btn-primary">
                                    Atsijungti
                                </button>
                                <button className="btn btn-secondary" onClick={toggleModal}>
                                    Atšaukti
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