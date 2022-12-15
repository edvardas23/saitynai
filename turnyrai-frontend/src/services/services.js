import axios from "axios";
import { getUserInfo, saveUserInfo } from "./storage";

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
export const logout = async () => {
  const token = getUserInfo()?.accessToken;
  if (!token) return Promise.reject();
  console.log(token);
  const res = await api.post("/logout", {}, {
    headers: {
      //'Content-Type':'application/problem+json; charset=utf-8',
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