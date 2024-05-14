import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MakeGroup() {
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
        setPostResponse(<p>{response.data.message}</p>);
        if (response.data.message === "Successful Login") {
          navigate("/app");
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
    <>
      <style>
        {`
          .login-Container {
            width: 300px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #fff;
          }

          h2 {
            text-align: center;
          }

          form {
            display: flex;
            flex-direction: column;
          }

          label {
            margin-bottom: 5px;
          }

          input {
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
          }

          button {
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
          }

          button:hover {
            background-color: #0056b3;
          }

          p {
            text-align: center;
            margin-top: 10px;
            font-weight: bold;
            color: red;
          }
        `}
      </style>
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
    </>
  );
}
