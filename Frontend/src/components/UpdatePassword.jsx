//  Create user component. asks for new user credentials and stores them in the DB
import { useEffect, useState } from "react";
import { getUsers,updatePassword } from "../utilities/dbFunctions";

export default function UpdatePassword() {

  const [user, setUser] = useState({ username: "", password: "" }) // hook for form data
  const [teachers,setTeachers]=useState(null)
  const [postResponse, setPostResponse] = useState(""); // get API responses
  const [updateList,setUpdateList]=useState(false)

  const handleOnChange = (evt) => {             // to show characters as user writes filling the form
    const { name, value } = evt.target;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    })
  }

  const updateUsersList=(evt)=>{
    evt.preventDefault()
    getUsers("users",2).then(
      (result)=>{console.log(result)
      setUpdateList(true)
      setPostResponse("Users list updated")})
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
  setUpdateList(false)
  },[updateList])

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
        {/* This button should be used every time there are new teachers in med2020 to bring them to the app */}
        <button onClick={updateUsersList}>Update Users list</button>
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
