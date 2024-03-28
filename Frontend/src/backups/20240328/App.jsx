import "./App.css";
import LandingPage from "./LandingPage";
import UpdatePassword from "./UpdatePassword";
import LoginUser from "./loginPage";
import ShowAbs from "./ShowAbs";
import Grading2 from "./Grading2"

import { BrowserRouter, Route, Routes } from "react-router-dom"; // to use routing
import { getAbs } from "./utilities/dbFunctions";
import { compareAllStudents, compareObjectsManually2 } from "./utilities/compare";

/*------------ BY NOW I'M PUTTING THIS HERE BUT IT SHOULD BE ON FUNCTIONS LIBRARY */
const records= await getAbs("bailey","",1,"")
console.log(records)
records.forEach(x=>{
  x['FirstName']=x['FirstName'].replace(/\s+/g,'').toUpperCase()
  x['LastName']=x['LastName'].replace(/\s+/g,'').toUpperCase()
})
const tAbs=records.filter(x=>x['codernumber']==='100719')
const sAbs=records.filter(x=>x['codernumber']!=='100719')
const students=[... new Set(sAbs.map(x=>x['CoderNumberDesc'].toUpperCase()))]
// I had to add chartnumber because turns out that some teachers abstracts are using repeated pacients names, so we need a way to differentiate them
// we could just omit it and let them know that they shouldn't use repeated names at least not with same students.
// const pacients=[... new Set(tAbs.map(x=>[x['ChartNumber']+' - '+ x['RegistrationNumber'], [x['FirstName']+' '+x['LastName']].sort()]))]
const patients=[... new Set(tAbs.map(x=>x['FirstName']+' '+x['LastName']).sort())]
// const pacients=[... new Set(records.map(x=>x['FirstName'].replace(/\s+/g,'').toUpperCase()+' '+x['LastName'].replace(/\s+/g,'').toUpperCase()).sort())]
console.log(patients.length + " patients")
console.log(students.length + " students")


console.log(tAbs)
console.log(sAbs)
let gradedAbs=[]
tAbs.forEach(tAb=>{
  let sAb=sAbs.filter(x=>(x['FirstName']==tAb['FirstName'])&&(x['LastName']==tAb['LastName']))
  //console.log(sAb)
  // gradedAbs.push( [tAb['FirstName']+' '+tAb['LastName'],compareAllStudents(tAb,sAb)])
  // gradedAbs.push(compareAllStudents(tAb,sAb)) // lod eshabilité para probar crear un solo arreglo
  sAb.forEach((student)=>{
    let result=compareObjectsManually2(tAb,student)
    gradedAbs.push(result)
  })


})
console.log(gradedAbs)
// console.log(sAbs.filter(x=>x['FirstName']==='OCTAVIUS')) 
//  console.log(tAb)
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
          {/* <Route path="/grading2" element={<Grading2 sAbs={sAbs} tAbs={tAbs} students={students} pacients={pacients} records={records}/>} /> */}
          <Route path="/grading2" element={<Grading2 gradedAbs={gradedAbs} students={students} patients={patients} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
