import Button  from "../UI/Button";
import '../UI/Button';
import { useEffect, useState } from "react";
import { getTeams } from "../../services/services";
import Loading from "../UI/Loading";
import Card from "../UI/Card";
import TeamItem from "./TeamItem";
import { useParams } from "react-router-dom";

const AllTeams = () => {

    const [teams, setTeams] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const {tournamentId} = useParams();
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
    }, []);
    
    return(
      <Card>
          <h1>Turnyro komandos</h1>
          <br />
          <Button classes={"btn btn-primary"}>Pridėti naują komandą</Button>
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
            />
          );
        })}

      </Card>
    );
};
export default AllTeams;