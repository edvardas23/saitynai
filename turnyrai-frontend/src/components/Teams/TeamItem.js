import Button  from "../UI/Button";
import btn from "../UI/Button.module.css"
import classes from '../Tournaments/TournamentItem.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const TeamItem = (props) => {

    var navigate = useNavigate();
    const {tournamentId} = useParams();
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
            <Button classes={`${btn.btn} ${btn["btn-primary"]}`} >Redaguoti</Button>
            <Button classes={`${btn.btn} ${btn["btn-danger"]}`}>Pašalinti</Button>
        </div>
    );
};

export default TeamItem;