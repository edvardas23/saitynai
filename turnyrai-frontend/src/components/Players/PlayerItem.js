import Button  from "../UI/Button";
import btn from "../UI/Button.module.css"
import classes from '../Tournaments/TournamentItem.module.css';
import { useNavigate } from 'react-router-dom';

const PlayerItem = (props) => {

    var navigate = useNavigate();

    return(
        <div className={classes.tournamentitem}>
            <h2>Pavadinimas: {props.name}</h2>
            <h2>Sportas: {props.sports}</h2>
            <h2>Amžius: {props.age}</h2>
            <br/>
            <Button classes={`${btn.btn} ${btn["btn-primary"]}`} >Redaguoti</Button>
            <Button classes={`${btn.btn} ${btn["btn-danger"]}`}>Pašalinti</Button>
        </div>
    );
};

export default PlayerItem;