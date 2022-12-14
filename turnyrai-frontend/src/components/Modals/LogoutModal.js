import React, {useState} from "react";
import { logout } from "../../services/services";
import { getUserInfo, removeUserInfo} from "../../services/storage";
import "./LoginModal.Module.css";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

export default function LogoutModal(){
    const navigate = useNavigate();
    const onSubmitHandler = (event) =>{
        event.preventDefault();
        logout().then(() => {
                removeUserInfo();
                console.log("test");
                //removeUserInfo();
                toggleModal();
            }).catch(
                (err) =>{
                console.log(err);
            }).finally(()=>{
                window.location.reload();
                //removeUserInfo();
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
        {getUserInfo() &&
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