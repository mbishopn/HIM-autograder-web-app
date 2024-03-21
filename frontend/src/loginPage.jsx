import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "./utilities/dbFunctions";

export default function LoginUser() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const postToDB = async (user) => {
    const postUser = { ...user };

    await axios
      .post("http://localhost:3000/login", postUser)
      .then((response) => {
        console.log(response.data.message)
        setPostResponse(<p>{response.data.message}</p>);
        if (response.data.message == "Successful Login"){
          console.log(response)
          navigate("/main");
        }
      });
  };

  const postUser = async (evt) => {
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
