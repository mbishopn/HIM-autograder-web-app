//  Create user component. asks for new user credentials and stores them in the DB

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../utilities/dbFunctions";

export default function CreateUser() {

  const navigate = useNavigate();

  const [user, setUser] = useState({ username: "", password: "" }) // hook for form data


  const [postResponse, setPostResponse] = useState(""); // get API responses

  const handleOnChange = (evt) => {             // to show characters as user writes filling the form
    const { name, value } = evt.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    })
  }

  const handleOnSubmit = (evt) => {               // calls createUser function and return is response
    evt.preventDefault();
    createUser(user)
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
