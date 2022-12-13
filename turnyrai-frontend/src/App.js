import './App.css';
import {Routes, Route} from "react-router-dom"
import Tournaments from './components/Tournaments/Tournaments.js';
import Layout from './components/Layout/Layout';
import AllTeams from './components/Teams/AllTeams';
import AllPlayers from './components/Players/AllPlayers';


function App() {
  return (
    
    <Layout>
      <Routes>
        <Route path='/' element={<Tournaments/>}/>
        <Route path='/tournaments/:tournamentId/teams' element={<AllTeams/>}/>
        <Route path='/tournaments/:tournamentId/teams/:teamId/players' element={<AllPlayers/>}/>
      </Routes>
    </Layout>
  );
}

export default App;
