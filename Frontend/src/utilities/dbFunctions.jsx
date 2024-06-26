// ALL INTERACTION WITH API through Axios object is centralized here

import axios from "axios"

const client = axios.create({ baseURL: "http://127.0.0.1:3000"})   // base url for API server

// FUNCTIONS TO SEND TO BACK END API

// ----------------  login FUNCTION  ------------------
// receives from App and sends user credentials to the API and 
// returns its answer
export const userLogin = async (user)=>{

    const result = await client.post("/login", user)
    let answer=false
    if(result.data.message == "Successful Login")
        {
            answer=true  // I'm not really using this cause msg holds the outcome of login
        }
    return {username:user.username, msg:result.data.message, token:result.data.token, qry:result.data.qry}
}

// -------------- updatePassword FUNCTION ------------------
// sends data to update user credentials to API

export const updatePassword = async (user)=> {
const result = await client.post("/updatePassword", user)
return result.data
}

// -------------- getAbs FUNCTION ------------------
// asks API to return abstracts according to parameters
// specified. Arguments description is on server.js backend file

export const getAbs = async (t,p,s,sn)=> {
    t=t===undefined?"":t;p=p===undefined?"":p;s=s===undefined?false:s;
    const result = await client.get(`/abstracts?t=${t}&p=${p}&s=${s}&sn=${sn}`)
    return result.data
    }

// -------------- getUsers FUNCTION ------------------
// ask API to return med2020 users, could be used
// to get students or teachers

export const getUsers = async (route,qry)=> {
    const users = await client.get('/'+route+'?qry='+qry)
    return users.data
    }

// -------------- getGroups FUNCTION ------------------
// ask API to get an return groups created by teachers
// you need to pass teacher's username

export const getdbGroups = async (teacher)=> {
    const groups = await client.get('/groups?teacher='+teacher)
    return groups.data
    }

export const setdbGroups = async (teacher,grps)=> {
    const option='2'
    const groups = await client.post('/groups',{teacher,option,grps})
    return groups.data
    }

export const updatedbGroups = async (teacher,grps)=> {
    const option='3'
    const groups = await client.post('/groups',{teacher,option,grps})
    return groups.data
    }