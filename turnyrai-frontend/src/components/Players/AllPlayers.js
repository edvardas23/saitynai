import Button  from "../UI/Button";
import '../UI/Button';
import { useEffect, useState } from "react";
import { getPlayers } from "../../services/services";
import Loading from "../UI/Loading";
import Card from "../UI/Card";
import PlayerItem from "./PlayerItem";
import { useParams } from "react-router-dom";

const AllPlayers = () => {

    const [palyers, setPlayers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {tournamentId, teamId} = useParams();
    useEffect(()=>{
      getPlayers(tournamentId, teamId)
      .then((res) => {
        setPlayers(res);
        console.log(res);
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
      }).finally(() => {
        setIsLoading(false);
      });
    }, []);
    
    return(
      <Card>
          <h1>Komandos žaidėjai</h1>
          <br />
          <Button classes={"btn btn-primary"}>Pridėti naują žaidėją</Button>
          <br />
        {isLoading && <Loading/>}
        {  
        palyers?.map((player) => {
          return(
            <PlayerItem
              key={player.id}
              id={player.id}
              name={player.name}
              sports={player.sports}
              age={player.age}
            />
          );
        })}

      </Card>
    );
};
export default AllPlayers;