//  Create user component. asks for new user credentials and stores them in the DB
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { createUser } from "./utilities/dbFunctions";

export default function UpdatePassword() {

  const navigate = useNavigate();

  const [user, setUser] = useState({ username: "", password: "" }) // hook for form data


  const [postResponse, setPostResponse] = useState(""); // get API responses

  const handleOnChange = (evt) => {             // to show characters as user writes filling the form
    const { name, value } = evt.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    })
  }

 const updatePassword = async (user)=> {
    await axios.post("http://localhost:3000/updatePassword", user)
    .then((result)=>{
      console.log(result.data.message)
      setPostResponse(<p>{result.data.message}</p>)
    })
    
    return result.data}

  const handleOnSubmit = (evt) => {               // calls createUser function and return is response
    evt.preventDefault();
    updatePassword(user)
    .then((result)=>setPostResponse(result))
    setUser({                                     // clean the form
      username: "",
      password: "",
    })
  }

  return (
    <div className="login">
      <h2>Create User</h2>
      <form action="" onSubmit={handleOnSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="email"
          name="username"
          id="username"
          value={user.username}
          onChange={handleOnChange}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="text"
          name="password"
          id="password"
          value={user.password}
          onChange={handleOnChange}
        />
        <br/>
        <br />
        {postResponse==""?<><button onClick={handleOnSubmit}>Submit</button><button onClick={()=>navigate("/")}>Back to Login</button></>:""}
     
        {postResponse==""?"":<button onClick={()=>navigate("/")}>Back to Login</button>}
      </form>
      {postResponse}
      
    </div>
  );
}
