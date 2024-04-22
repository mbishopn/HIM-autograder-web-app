// load components to be rendered
import LoggedBar from "./loggedBar"
import Grading2 from "./Grading2";
// libraries required
import { gradeAbstracts } from "../utilities/compare";

import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";



export default function LandingPage() {

  const location = useLocation()      // to get the states
  const {qryname} = location.state!==null?location.state:""  // state brings product data with it? store it
 
  console.log(qryname)
  if(qryname==='')
   console.log("soy el admin")

  return (
    <>
      <div><LoggedBar /></div>
      <div className="title">HIM Autograder</div>
      <div className="mainContainer">
      <div className="menu">Groups</div>
      <div className="infoArea"><Grading2 qryname={qryname}/></div>
      </div>
    </>
  );
}
