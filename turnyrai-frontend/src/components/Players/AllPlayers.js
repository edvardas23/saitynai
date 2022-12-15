import Button  from "../UI/Button";
import '../UI/Button';
import { getUserInfo, parseJwt } from "../../services/storage";
import { useEffect, useState } from "react";
import { getPlayers, addPlayer, getTeam } from "../../services/services";
import Loading from "../UI/Loading";
import Card from "../UI/Card";
import PlayerItem from "./PlayerItem";
import { useParams } from "react-router-dom";
import CreatePlayerItemModal from "../Modals/CreatePlayerModal";

const AllPlayers = () => {

    const [palyers, setPlayers] = useState();
    const [team, setTeam] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {tournamentId, teamId} = useParams();
    const [forceRefresh, setForceRefresh] = useState(false);
    const [createModalShow, setCreateModalShow] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const createPlayer = (name, description, leader) => {
      addPlayer(name, description, leader, tournamentId, teamId)
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
          if(team?.userId === userId){
              setIsOwner(true);
          }
      }
    },[team]);

    useEffect(()=>{
      getTeam(tournamentId, teamId)
      .then((res) => {
        setTeam(res);
        console.log(res);
      })
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
    }, [forceRefresh]);
    
    return(
      <Card>
          <h1>Komandos žaidėjai</h1>
          <br />
          {(isAdmin || isOwner) && <Button classes={"btn btn-primary"}  onClick={() => setCreateModalShow(true)}>Pridėti naują žaidėją</Button>}
          <CreatePlayerItemModal show={createModalShow} onHide={() => setCreateModalShow(false)} onCreate={createPlayer}/>
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
              forceRefresh={forceRefresh}
              setForceRefresh={setForceRefresh}
              isOwner={isOwner}
            />
          );
        })}

      </Card>
    );
};
export default AllPlayers;