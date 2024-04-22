
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "./../utilities/dbFunctions";
import Cookies from "js-cookie"

export default function LoginUser() {
  
  const navigate = useNavigate();
  const [postResponse, setPostResponse] = useState("");  // ----- login responses
  const [formData, setFormData] = useState({             // ----- credentials for login
    username: "",
    password: "",
  });

  const handleOnChange = (evt) => {                      // ----- handles form changes
    const { name, value } = evt.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const postToDB = async (user) => {                     // ------ calls login function
    console.log(user)
    const result= await userLogin(user)
    if (result.msg=="Successful Login")
    {
      Cookies.set("jwt-cookie",result.token)
      if(result.username==='admin')
        {console.log("llegue al admin");navigate("/admin",{state:{qryname:result.qry}})}
      else
        {navigate("/main",{state:{qryname:result.qry}})}
    }
    else {setPostResponse(result.msg)}
  };

  const postUser = async (evt) => {                       // ------ gets crential from form and resets it
    evt.preventDefault();
    postToDB(formData);
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="login-Container">
      <h2>Login</h2>
      <form action="" onSubmit={postUser}>
        <label htmlFor="username"> Username </label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleOnChange}
          value={formData.username}
          required
        />
        <br /> <br />
        <label htmlFor="password"> Password </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleOnChange}
          value={formData.password}
          required
        />
        <br /> <br />
        <button>Log In</button>
      </form>
      {<p>{postResponse}</p>}
    </div>
  );
}
