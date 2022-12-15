import Button  from "../UI/Button";
import '../UI/Button';
import { useEffect, useState } from "react";
import { getTournaments, addTournament } from "../../services/services";
import TournamentItem from "./TournamentItem";
import Loading from "../UI/Loading";
import Card from "../UI/Card";
import { getUserInfo, parseJwt } from "../../services/storage";
import CreateTournamentItemModal from "../Modals/CreateTournamentModal";


const Tournaments = () => {

    const [tournaments, setTournaments] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [forceRefresh, setForceRefresh] = useState(false); 
    const [createModalShow, setCreateModalShow] = useState(false);
    
    const createTournament = (name, description, prize) => {
        addTournament(name, description, prize)
        .then((res)=>{
          setForceRefresh(!forceRefresh);
          setCreateModalShow(false);
          console.log(res);
        })
        .catch((e) => {
          console.log(e?.response?.data?.message);
        })
    }

    useEffect(() => {
        const user = getUserInfo();
        if(user != null)
        { 
            const { userId, roles } = parseJwt(user);
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
          {isAdmin && <Button classes={"btn btn-primary"} onClick={() => setCreateModalShow(true)}>Pridėti naują turnyrą</Button>}
          <CreateTournamentItemModal show={createModalShow} onHide={() => setCreateModalShow(false)} onCreate={createTournament}/>
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