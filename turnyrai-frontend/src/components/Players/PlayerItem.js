import Button  from "../UI/Button";
import btn from "../UI/Button.module.css"
import classes from '../Tournaments/TournamentItem.module.css';
import { useParams } from 'react-router-dom';
import DeleteItemModal from "../Modals/DeleteItemModal";
import { useEffect, useState } from "react";
import { getUserInfo, parseJwt } from "../../services/storage";
import { deletePlayer } from "../../services/services";


const PlayerItem = (props) => {

    const {tournamentId, teamId} = useParams();
    const [isAdmin, setIsAdmin] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);

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

    return(
        <div className={classes.tournamentitem}>
            <h2>Pavadinimas: {props.name}</h2>
            <h2>Sportas: {props.sports}</h2>
            <h2>Amžius: {props.age}</h2>
            <br/>
            {(isAdmin || props.isOwner)&& <Button classes={`${btn.btn} ${btn["btn-primary"]}`} >Redaguoti</Button> }
            {(isAdmin || props.isOwner) && <Button classes={`${btn.btn} ${btn["btn-danger"]}`} onClick={() => setDeleteModalShow(true)}>Pašalinti</Button> }
            <DeleteItemModal show={deleteModalShow} onHide={() => setDeleteModalShow(false)} onDelete={onDelete}/>
        </div>
    );
};

export default PlayerItem;