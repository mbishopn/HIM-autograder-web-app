// load components to be rendered
import LoggedBar from "./loggedBar"
import Grading2 from "./Grading2";
// libraries required
import { gradeAbstracts } from "../utilities/compare";

import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import UpdatePassword from "./UpdatePassword";



export default function Admin() {

  const location = useLocation()      // to get the states
  const {qryname} = location.state!==null?location.state:""  // state brings product data with it? store it
 
  // console.log(qryname)
 

  return (
    <>
      <div><LoggedBar /></div>
      <h2>HIM Autograder</h2>
      <div className="mainContainer">
      <div ><span>Setting passwords for current users</span></div>
      <div className="infoArea"><UpdatePassword /></div>
      </div>
    </>
  );
}
