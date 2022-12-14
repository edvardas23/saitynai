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

  export const deleteTournament = async (tournamentId) => {
    const token = getUserInfo()?.accessToken;
    const res = await api.delete(`/tournaments/${tournamentId}`, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data;
};
