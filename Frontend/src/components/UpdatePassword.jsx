//  Create user component. asks for new user credentials and stores them in the DB
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers,updatePassword } from "../utilities/dbFunctions";

//import { createUser } from "./utilities/dbFunctions";

export default function UpdatePassword() {

  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" }) // hook for form data
  const [selTeacher, setSelTeacher] = useState("Select User");
  const [teachers,setTeachers]=useState(null)
  const [postResponse, setPostResponse] = useState(""); // get API responses




  const handleOnChange = (evt) => {             // to show characters as user writes filling the form
    const { name, value } = evt.target;
    setUser((prevUser) => {
      console.log(user)
      return { ...prevUser, [name]: value };
    })
  }

  const handleOnSubmit = (evt) => {               // calls createUser function and return is response
    evt.preventDefault();
    updatePassword(user)
    .then((result)=>setPostResponse(result))
    setUser({                                     // clean the form
      username: "",
      password: "",
    })
  }

 useEffect(()=>{
  getUsers("users",1).then((result)=>setTeachers(result))
  },[])


console.log(teachers)
  return (
    <div className="login">
      <h2>Create User</h2>
      <form action="" onSubmit={handleOnSubmit}>
      <select name="username" id="steacher" onChange={handleOnChange}>
          <option value="Select User">Select User</option>
           {teachers!==null?Object.values(teachers).map((value,key)=>{
            return(
              <option key={key} value={value.username}>{value.username}</option>
           )}):""}
        </select>
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
        {postResponse==""?<button onClick={handleOnSubmit}>Update Password</button>:""}
     
      </form>
      {postResponse}
      
    </div>
  );
}
