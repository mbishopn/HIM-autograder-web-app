// load components to be rendered
import LoggedBar from "./loggedBar"
import Grading2 from "./Grading2";
import EditGroup from "./EditGroup"

// libraries required
import { useNavigate, Link, useLocation } from "react-router-dom";
import { gradeAbstracts } from "../utilities/compare";
import { useEffect, useState } from "react";

export default function LandingPage() {

  const location = useLocation()      // to get the states
  const {qryname} = location.state!==null?location.state:""  // qryname is the one used to identify teacher's abstrats in db, it's different to username in med2020/HIM app
  const [absData,setAbsData]=useState(null)
  
  const toggleGroups = (evt)=>{
    let group=document.getElementById('groups')
    let info=document.getElementById('infoArea')
    if(group.style.display==="none")
      {group.style.display="block";info.style.display="none";evt.target.textContent="Abstracts"}
    else
      {group.style.display="none";info.style.display="block";evt.target.textContent="Groups"}
  }

  useEffect(()=>{
    gradeAbstracts(qryname).then((result)=>setAbsData(result))
  },[qryname])
  return (
    <>
      <div><LoggedBar /></div>
      <div className="title">HIM Autograder</div>
      <div className="mainContainer">
      <div className="menu"><button onClick={toggleGroups}>Groups</button></div>
      <div className="groups" id="groups" style={{display: 'none'}} ><EditGroup qryname={qryname} absData={absData}/></div>
      <div className="infoArea" id="infoArea" style={{display: 'block'}} ><Grading2 qryname={qryname} absData={absData}/></div>
      </div>
    </>
  );
}
