import axios from "axios";
import { getUserInfo } from "./storage";

const api = axios.create({
  baseURL: "https://turnyraiapi20221105171153.azurewebsites.net/api",
});

export const login = async (userName, password) => {
    const res = await api.post("/login", {
        userName,
        password,
    });
    return res.data;
  };
export const register = async (userName, email, password) => {
    const res = await api.post("/register", {
        userName,
        email,
        password,
    });
    return res.data;
  };
export const logout = async () => {
  const token = getUserInfo()?.accessToken;
  if (!token) return Promise.reject();
  console.log(token);
  const res = await api.post("/logout", {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.data;
};

  export const getTournaments = async () => {
    const res = await api.get("/tournaments", {});
    return res.data;
  };
  export const getTeams = async (tournamentId) => {
    const res = await api.get(`/tournaments/${tournamentId}/teams`, {});
    return res.data;
  };
  export const getPlayers = async (tournamentId, teamId) => {
    const res = await api.get(`/tournaments/${tournamentId}/teams/${teamId}/players`);
    return res.data;
  };
  export const getTeam = async (tournamentId, teamId) => {
    const res = await api.get(`/tournaments/${tournamentId}/teams/${teamId}`);
    return res.data;
  };

  export const deleteTournament = async (tournamentId) => {
    const token = getUserInfo()?.accessToken;
    const res = await api.delete(`/tournaments/${tournamentId}`, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data;
};
export const deleteTeam= async (tournamentId, teamId) => {
  const token = getUserInfo()?.accessToken;
  const res = await api.delete(`/tournaments/${tournamentId}/teams/${teamId}`, {
    headers:{
      'Authorization': `Bearer ${token}`
    }
  });
  return res.data;
};
export const deletePlayer= async (tournamentId, teamId, playerId) => {
  const token = getUserInfo()?.accessToken;
  const res = await api.delete(`/tournaments/${tournamentId}/teams/${teamId}/players/${playerId}`, {
    headers:{
      'Authorization': `Bearer ${token}`
    }
  });
  return res.data;
};

export const addTournament = async (name, description, prize) => {
  const token = getUserInfo()?.accessToken;
  const res = await api.post(`/tournaments`, { name, description, prize},{
  headers:{
    'Authorization': `Bearer ${token}`
  }});
  return res.data;
};

export const addTeam = async (name, description, leader, tournamentId) => {
  const token = getUserInfo()?.accessToken;
  const res = await api.post(`/tournaments/${tournamentId}/teams`, { name, description, leader},{
  headers:{
    'Authorization': `Bearer ${token}`
  }});
  return res.data;
};
export const addPlayer = async (name, sports, age, tournamentId, teamId) => {
  const token = getUserInfo()?.accessToken;
  const res = await api.post(`/tournaments/${tournamentId}/teams/${teamId}/players`, { name, sports, age},{
  headers:{
    'Authorization': `Bearer ${token}`
  }});
  return res.data;
};

export const editTournamentItem = async (name, description, prize, tournamentId) => {
  const token = getUserInfo()?.accessToken;
  const res = await api.put(`/tournaments/${tournamentId}`, { name, description, prize},{
  headers:{
    'Authorization': `Bearer ${token}`
  }});
  return res.data;
};

export const editTeamItem = async (name, description, leader, tournamentId, teamId) => {
  const token = getUserInfo()?.accessToken;
  const res = await api.put(`/tournaments/${tournamentId}/teams/${teamId}`, { name, description, leader},{
  headers:{
    'Authorization': `Bearer ${token}`
  }});
  return res.data;
};

export const editPlayerItem = async (name, sports, age, tournamentId, teamId, playerId) => {
  const token = getUserInfo()?.accessToken;
  const res = await api.put(`/tournaments/${tournamentId}/teams/${teamId}/players/${playerId}`, { name, sports, age},{
  headers:{
    'Authorization': `Bearer ${token}`
  }});
  return res.data;
};