//  Create user component. asks for new user credentials and stores them in the DB
import { useEffect, useState } from "react";
import { getUsers,updatePassword } from "../utilities/dbFunctions";

export default function UpdatePassword() {

  const [user, setUser] = useState({ username: "", password: "" }) // hook for form data
  const [teachers,setTeachers]=useState(null)
  const [postResponse, setPostResponse] = useState(""); // get API responses

  const handleOnChange = (evt) => {             // to show characters as user writes filling the form
    const { name, value } = evt.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    })
  }

  const handleOnSubmit = (evt) => {               // sends new credentials to API
    evt.preventDefault();
    if(user.username!==''&&user.username!=='Select User'&&user.password!=='')
    {updatePassword(user)
      .then((result)=>setPostResponse(result))
      {
          setUser({username: "",password: ""})
        document.getElementById('updatepassword').reset()
      }
    }
    else {setUser({username: "",password: ""});setPostResponse("Fill the from before clicking")}
  }

  const resetButton =(evt)=>{
    evt.preventDefault();
    setPostResponse("")
  }

 useEffect(()=>{
  getUsers("users",1).then((result)=>setTeachers(result))
  },[])

  return (
    <div className="login">
      <form id="updatepassword" action="" onSubmit={handleOnSubmit}>
      <select name="username" id="steacher" onChange={handleOnChange} defaultValue="Select User">
          <option value="Select User">Select User</option>
           {teachers!==null?Object.values(teachers).map((value,key)=>{
            return(
              <option key={key} value={value.username}>{value.username}</option>
           )}):""}
        </select>
        <br />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleOnChange}
        />
        <br/>
        <br />
        {postResponse==""?<button onClick={handleOnSubmit}>Update Password</button>:<button onClick={resetButton}>Reset</button>}
     
      </form>
      {postResponse}
      
    </div>
  );
}
