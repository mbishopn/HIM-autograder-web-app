import "./App.css";
import LandingPage from "./LandingPage";
import UpdatePassword from "./UpdatePassword";
import LoginUser from "./loginPage";
import ShowAbs from "./ShowAbs";
import Grading2 from "./Grading2"

import { BrowserRouter, Route, Routes } from "react-router-dom"; // to use routing
import { getAbs } from "./utilities/dbFunctions";

/*------------ BY NOW I'M PUTTING THIS HERE BUT IT SHOULD BE ON FUNCTIONS LIBRARY */
const records= await getAbs("faryal","",1,"")
const students=[... new Set(records.map(x=>x['CoderNumberDesc'].toUpperCase()))]
const pacients=[... new Set(records.map(x=>x['FirstName'].replace(/\s+/g,'').toUpperCase()+' '+x['LastName'].replace(/\s+/g,'').toUpperCase()).sort())]
console.log(pacients)

// hola
/*--------------------------------------------------------------------------------*/
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/main" element={<LandingPage />}/>
          <Route path="/showabstracts" element={<ShowAbs records={records}/>}/>  
          <Route path="/updateuserpass" element={<UpdatePassword/>}/>
          <Route path="/grading2" element={<Grading2 students={students} pacients={pacients} records={records}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
