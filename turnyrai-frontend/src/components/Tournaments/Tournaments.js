import Button  from "../UI/Button";
import '../UI/Button';
import { useEffect, useState } from "react";
import { getTournaments } from "../../services/services";
import TournamentItem from "./TournamentItem";
import Loading from "../UI/Loading";
import Card from "../UI/Card";
import { getUserInfo, parseJwt } from "../../services/storage";


const Tournaments = () => {

    const [tournaments, setTournaments] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [forceRefresh, setForceRefresh] = useState(false); 
    
    useEffect(() => {
        const user = getUserInfo();
        if(user != null)
        { 
            const roles = parseJwt(user);
            setIsAdmin(roles.includes("Admin"));
        }
    });

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
    }, [forceRefresh]);
    
    return(
      <Card>
          <h1>Turnyrai</h1>
          <br />
          {isAdmin && <Button classes={"btn btn-primary"}>Pridėti naują turnyrą</Button>}
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
              forceRefresh={forceRefresh}
              setForceRefresh={setForceRefresh}
            />
          );
        })}

      </Card>
    );
};
export default Tournaments;