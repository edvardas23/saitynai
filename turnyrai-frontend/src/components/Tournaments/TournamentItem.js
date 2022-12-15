import Button  from "../UI/Button";
import { useEffect, useState } from "react";
import btn from "../UI/Button.module.css"
import classes from './TournamentItem.module.css';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, parseJwt } from "../../services/storage";
import DeleteItemModal from "../Modals/DeleteItemModal";
import { deleteTournament } from "../../services/services";

const TournamentItem = (props) => {

    var navigate = useNavigate();

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
    const onDeleteTournament=(event)=>{
        if(isAdmin){
            deleteTournament(props.id)
            .then((res)=>{
                props.setForceRefresh(!props.forceRefresh);
                console.log(res);
            })
            .catch((e) => {
                console.log(e?.response?.data?.message);
            })
        }
        console.log(props.id);
    }
    const onTeamsViewHandler=(event)=>{
        navigate(`/tournaments/${props.id}/teams`);
    }


    return(
        <div className={classes.tournamentitem}>
            <h2>Pavadinimas: {props.name}</h2>
            <h2>Aprašymas: {props.description}</h2>
            <h2>Prizas: {props.prize}</h2>
            <br/>
            <Button classes={`${btn.btn} ${btn["btn-primary"]}`} onClick={onTeamsViewHandler}>Peržiūrėti komandas</Button>
            {isAdmin && <Button classes={`${btn.btn} ${btn["btn-primary"]}`} onClick={onTeamsViewHandler} >Redaguoti</Button>}
            {isAdmin && <Button classes={`${btn.btn} ${btn["btn-danger"]}`} onClick={() => setDeleteModalShow(true)}>Pašalinti</Button> }
            <DeleteItemModal show={deleteModalShow} onHide={() => setDeleteModalShow(false)} onDelete={onDeleteTournament}/>
        </div>
    );
};

export default TournamentItem;