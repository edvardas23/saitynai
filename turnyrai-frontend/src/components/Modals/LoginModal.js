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
            Prisijungti
        </button>}
        { ReactDOM.createPortal(modal && (  
            <form onSubmit={onSubmitHandler}>
                <div className="modal">
                    <div className="overlay">
                        <div className="modal-content">
                            <div className="modal-header" color="black">
                                <h2>Prisijungimas</h2>
                            </div>
                            <div>
                                <div className="input-container">
                                    <label>Naudotojo vardas</label>
                                    <input style={{border: "none", borderBottom: "2px solid", borderColor:"#006A8E",outline:"none"}} type="text" name="uname" required />
                                </div>
                                <div className="input-container">
                                    <label>Slaptažodis</label>
                                    <input style={{border: "none", borderBottom: "2px solid", borderColor:"#006A8E",outline:"none"}} type="password" name="pass" required />
                                </div>     
                            </div>
                            <div className="modal-footer">
                                <button inputMode="submit" className="btn btn-primary">
                                    Prisijungti
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
