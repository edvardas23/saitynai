import Button  from "../UI/Button";
import btn from "../UI/Button.module.css"
import classes from '../Tournaments/TournamentItem.module.css';
import { useParams } from 'react-router-dom';
import DeleteItemModal from "../Modals/DeleteItemModal";
import EditPlayerModal from "../Modals/EditPlayerModal";
import { useEffect, useState } from "react";
import { getUserInfo, parseJwt } from "../../services/storage";
import { deletePlayer, editPlayerItem } from "../../services/services";
import { BsTrash } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';




const PlayerItem = (props) => {

    const {tournamentId, teamId} = useParams();
    const [isAdmin, setIsAdmin] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    useEffect(() => {
        const user = getUserInfo();
        if(user != null)
        {             
            const { userId, roles } = parseJwt(user);
            setIsAdmin(roles.includes("Admin"));
        }
    });

    const onDelete=(event)=>{
        if(isAdmin || props.isOwner){
            deletePlayer(tournamentId, teamId, props.id)
            .then((res)=>{
                props.setForceRefresh(!props.forceRefresh);
                console.log(res);
            })
            .catch((e) => {
                console.log(e?.response?.data?.message);
            })
        }
    }

    const editPlayer=(name, description, prize)=>{
        if(isAdmin || props.isOwner){
            editPlayerItem(name, description, prize, tournamentId, teamId, props.id)
            .then((res)=>{
                props.setForceRefresh(!props.forceRefresh);
                setEditModalShow(false);
                console.log(res);
            })
            .catch((e) =>{
                console.log(e?.response?.data?.message);
            })
        }
    }

    return(
        <div className={classes.tournamentitem}>
            <h2>Pavadinimas: {props.name}</h2>
            <h2>Sportas: {props.sports}</h2>
            <h2>Amžius: {props.age}</h2>
            <br/>
            
            {(isAdmin || props.isOwner)&& <Button classes={`${btn.btn} ${btn["btn-primary"]}`} onClick={() => setEditModalShow(true)}><AiOutlineEdit style={{verticalAlign:"middle", display:"inline-block", paddingRight:"4px"}}/><span style={{verticalAlign:"middle", display:"inline-block"}}>Redaguoti</span></Button> }
            {(isAdmin || props.isOwner) && <Button classes={`${btn.btn} ${btn["btn-danger"]}`} onClick={() => setDeleteModalShow(true)}><BsTrash style={{verticalAlign:"middle", display:"inline-block", paddingRight:"4px"}}/><span style={{verticalAlign:"middle", display:"inline-block"}}>Pašalinti</span></Button> }
            <DeleteItemModal show={deleteModalShow} onHide={() => setDeleteModalShow(false)} onDelete={onDelete}/>
            <EditPlayerModal show={editModalShow} onHide={() => setEditModalShow(false)} onEdit={editPlayer}/>
        </div>
    );
};

export default PlayerItem;