import Button  from "../UI/Button";
import btn from "../UI/Button.module.css"
import classes from './TournamentItem.module.css';
import { useNavigate } from 'react-router-dom';

const TournamentItem = (props) => {

    var navigate = useNavigate();

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
            <Button classes={`${btn.btn} ${btn["btn-primary"]}`} onClick={onTeamsViewHandler}>Redaguoti</Button>
            <Button classes={`${btn.btn} ${btn["btn-danger"]}`}>Pašalinti</Button>
        </div>
    );
};

export default TournamentItem;