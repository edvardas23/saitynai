import Button  from "../UI/Button";
import '../UI/Button';
import { useEffect, useState } from "react";
import { getTournaments } from "../../services/services";
import TournamentItem from "./TournamentItem";
import Loading from "../UI/Loading";
import Card from "../UI/Card";

const Tournaments = () => {

    const [tournaments, setTournaments] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
      getTournaments()
      .then((res) => {
        setTournaments(res);
        console.log(tournaments);
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
      }).finally(() => {
        setIsLoading(false);
      });
    }, []);
    
    return(
      <Card>
          <h1>Turnyrai</h1>
          <br />
          <Button classes={"btn btn-primary"}>Pridėti naują turnyrą</Button>
          <br />
        {isLoading && <Loading/>}
        {  
        tournaments?.map((tournament) => {
          return(
            <TournamentItem
              key={tournament.id}
              id={tournament.id}
              name={tournament.name}
              description={tournament.description}
              prize={tournament.prize}
            />
          );
        })}

      </Card>
    );
};
export default Tournaments;