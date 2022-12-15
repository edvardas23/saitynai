import Button  from "../UI/Button";
import '../UI/Button';
import { useEffect, useState } from "react";
import { getTeams, addTeam } from "../../services/services";
import Loading from "../UI/Loading";
import Card from "../UI/Card";
import TeamItem from "./TeamItem";
import { useParams } from "react-router-dom";
import CreateTournamentItemModal from "../Modals/CreateTeamModal";
import { getUserInfo, parseJwt } from "../../services/storage";

const AllTeams = () => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [isTeamOwner, setIsTeamOwner] = useState(false);
    const [teams, setTeams] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {tournamentId} = useParams();
    const [forceRefresh, setForceRefresh] = useState(false);
    const [createModalShow, setCreateModalShow] = useState(false);

    useEffect(() => {
      const user = getUserInfo();
      if(user != null)
      {             
          const { userId, roles } = parseJwt(user);
          setIsTeamOwner(roles.includes("TeamOwner"));
          setIsAdmin(roles.includes("Admin"));
      }
     });


    const createTeam = (name, description, leader) => {
        addTeam(name, description, leader, tournamentId)
        .then((res)=>{
          setForceRefresh(!forceRefresh);
          setCreateModalShow(false);
          console.log(res);
        })
        .catch((e) => {
          console.log(e?.response?.data?.message);
        })
    }

    useEffect(()=>{
      getTeams(tournamentId)
      .then((res) => {
        setTeams(res);
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
          <h1>Turnyro komandos</h1>
          <br />
          {(isTeamOwner || isAdmin ) && <Button classes={"btn btn-primary"} onClick={() => setCreateModalShow(true)}>Pridėti naują komandą</Button>}
          <CreateTournamentItemModal show={createModalShow} onHide={() => setCreateModalShow(false)} onCreate={createTeam}/>
          <br />
        {isLoading && <Loading/>}
        {  
        teams?.map((team) => {
          return(
            <TeamItem
              key={team.id}
              id={team.id}
              name={team.name}
              description={team.description}
              leader={team.leader}
              userId={team.userId}
              forceRefresh={forceRefresh}
              setForceRefresh={setForceRefresh}
            />
          );
        })}

      </Card>
    );
};
export default AllTeams;