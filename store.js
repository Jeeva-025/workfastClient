import { create } from "zustand";
import axios from "axios";
import {persist, devtools} from "zustand/middleware";

const API_BASE_URL = "https://workfast-server-tngc.vercel.app";
console.log(API_BASE_URL);  


const workfastStore=(set)=>({
   peoples:[],
   invites:[],
   isInviteOpen: false,
   teams:[],
   teamMates:[],



   
   setIsInviteOpen: (value) => set({ isInviteOpen: value }),

   fetchTeams:async()=>{
    try{
       const response= await axios.get(`${API_BASE_URL}/api/v1/team`);
       console.log(`${API_BASE_URL}/api/v1/team`)
       set({teams:response.data});
    }catch(err){
        console.log(err);
        throw err
    }
   },
   addTeams:async(team_name, members)=>{
    try{
        const response= await axios.post(`${API_BASE_URL}/api/v1/team/create`, {
            team_name,
            members
        });
        set((state) => ({ teams: [...state.teams, response.data] }));
    }catch(err){
        console.log(err);
        throw err;
    }
   },
   fetchByTeamNames:async(id)=>{
    try{
       
        const response=await axios.get(`${API_BASE_URL}/api/v1/user/${id}`);
        set({teamMates:response.data});
        console.log(response);
    }catch(err){
        console.log(err)
        throw err;
    }
   }, 
   deleteUserFromTeam:async(user_ids, team_id)=>{
    try{
        const response=await axios.post(`${API_BASE_URL}/api/v1/team/delete`, {
            user_ids,
            team_id
          } );
    }catch(err){
        console.log(err);
        throw err;
    }
   }, 
   deleteTeam:async(team_id)=>{
    try{
        const response=await axios.post(`${API_BASE_URL}/api/v1/team/deleteteam`,  {team_id});
        
    }catch(err){
        console.log(err);
        throw err;
    }
   },

   fetchPeoples: async(str)=>{
    try{
     const response=await axios.get(`${API_BASE_URL}/api/v1/people?${str}`)
     
     set({peoples:response.data});

    }catch(err){
        console.log(err);
        throw err;
    }
   },


   fetchInvites: async()=>{
    try{
     const response=await axios.get(`${API_BASE_URL}/api/v1/invite`)
     console.log(`${API_BASE_URL}/api/v1/invite`);
     set({invites:response.data});

    }catch(err){
        console.log(err);
        throw err;
    }
   },

   addInvites:async(invite)=>{
    try{
        const response=await axios.post(`${API_BASE_URL}/api/v1/invite`, invite);
        set((state) => ({ invite: [...state.invites, response.data] }));

    }catch(err){
        console.log(err);
        throw err;
    }
   },
   deleteInvite:async(id)=>{
    try{
        const response=await axios.post(`${API_BASE_URL}/api/v1/invite/delete?id=${id}`);
    }catch(err){
        console.log(err);
        throw err;
    }
   }

})

const useWorkfastStore=create(
    devtools(
        persist(workfastStore, {
        name:"workfast",
        })
    )
)
export default useWorkfastStore;