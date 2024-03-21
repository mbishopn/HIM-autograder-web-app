// ALL INTERACTION WITH API through Axios object is centralized here

import axios from "axios"

const client = axios.create({ baseURL: "http://127.0.0.1:3000"})

// FUNCTIONS TO SEND TO BACK END API

// ----------------  login FUNCTION  ------------------
// receive and send user credentials to the API and 
// returns its answer
export const userLogin = async (user)=>{
    console.log(user)
    const result = await client.post("/login", user)
    let answer=false
    if(result.data.message == "Successful Login")
        {
            answer=true
        }
    return {answer:answer, msg:result.data.message, token:result.data.token}
}

// -------------- createUser FUNCTION ------------------
// sends data to create new user credentials to API

export const createUser = async (user)=> {
const result = await client.post("/register", user)
console.log(result.data)
return result.data

}

// -------------- getAbs FUNCTION ------------------
// ask API to return abstracts according to parameters
// specified.

export const getAbs = async (t,p,s,sn)=> {
    //console.log("parametros: ",t,",",p,",",s)
    t=t===undefined?"":t;p=p===undefined?"":p;s=s===undefined?false:s;
    const result = await client.get(`/abstracts?t=${t}&p=${p}&s=${s}&sn=${sn}`)
    //console.log("llego esto ", result.data)
    return result.data
    
    }

// -------------- getUsers FUNCTION ------------------
// ask API to return med2020 users, could be used
// to get students or teachers

export const getUsers = async ()=> {
    const users = await client.get('/users')
    return users.data
    
    }


//------------------------ NO LO USO ----------------------------------
// --------------- getProducts FUNCTION ---------------
// retrieves all inventory items to be showed in main

export const getProducts = async ()=> {
    const { data } = await client.get('/products')
    return data
}

// ---------------- addProduct FUNCTION ----------------
// receives an object with product data and asks API to
// insert it in the DB

export const addProduct = async (newProduct) => {
    newProduct.id = crypto.randomUUID()
    const result = await client.post('/submitProduct', newProduct)
    console.log(result)
    return result.data
}

// ---------------- removeProduct FUNCTION -------------
// takes and Id and request its deletion from DB to API

export const removeProduct = async (product) => {
    const result = await client.delete(`/products/${product._id}`)
    console.log(result)
    return result.data
}

// ------------------ editProduct FUNCTION --------------
// receives a product object to ask API to update it

export const updateProduct = async (product) => {
    const result = await client.patch(`/products/${product._id}`, product)
    console.log(result)
    return result.data
}