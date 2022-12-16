import Button  from "../UI/Button";
import btn from "../UI/Button.module.css"
import classes from '../Tournaments/TournamentItem.module.css';
import { getUserInfo, parseJwt } from "../../services/storage";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import DeleteItemModal from "../Modals/DeleteItemModal";
import { deleteTeam , editTeamItem} from "../../services/services";
import EditTeamModal from "../Modals/EditTeamModal";
import { BsTrash } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';

const TeamItem = (props) => {

    var navigate = useNavigate();
    const {tournamentId} = useParams();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    
    useEffect(() => {
        const user = getUserInfo();
        if(user != null)
        {             
            const { userId, roles } = parseJwt(user);
            setIsAdmin(roles.includes("Admin"));
            if(props.userId === userId){
                setIsOwner(true);
            }
        }
    });

    const onDelete=(event)=>{
        if(isAdmin || isOwner){
            deleteTeam(tournamentId, props.id)
            .then((res)=>{
                props.setForceRefresh(!props.forceRefresh);
                console.log(res);
            })
            .catch((e) => {
                console.log(e?.response?.data?.message);
            })
        }
    }

    const editTeam=(name, description, prize)=>{
        if(isAdmin || isOwner){
            editTeamItem(name, description, prize, tournamentId, props.id)
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


    const onPlayersViewHandler=(event)=>{
        navigate(`/tournaments/${tournamentId}/teams/${props.id}/players`);
    }
    
    return(
        <div className={classes.tournamentitem}>
            <h2>Pavadinimas: {props.name}</h2>
            <h2>Aprašymas: {props.description}</h2>
            <h2>Prizas: {props.leader}</h2>
            <br/>
            <Button classes={`${btn.btn} ${btn["btn-primary"]}`} onClick={onPlayersViewHandler} >Peržiūrėti žaidėjus</Button>
            {(isAdmin || isOwner) && <Button classes={`${btn.btn} ${btn["btn-primary"]}`} onClick={() => setEditModalShow(true)} ><AiOutlineEdit style={{verticalAlign:"middle", display:"inline-block", paddingRight:"4px"}}/><span style={{verticalAlign:"middle", display:"inline-block"}}>Redaguoti</span></Button> }
            {(isAdmin || isOwner) && <Button classes={`${btn.btn} ${btn["btn-danger"]}`} onClick={() => setDeleteModalShow(true)}><BsTrash style={{verticalAlign:"middle", display:"inline-block", paddingRight:"4px"}}/><span style={{verticalAlign:"middle", display:"inline-block"}}>Pašalinti</span></Button> }
            <DeleteItemModal show={deleteModalShow} onHide={() => setDeleteModalShow(false)} onDelete={onDelete}/>
            <EditTeamModal show={editModalShow} onHide={() => setEditModalShow(false)} onEdit={editTeam}/>
        </div>
    );
};

export default TeamItem;