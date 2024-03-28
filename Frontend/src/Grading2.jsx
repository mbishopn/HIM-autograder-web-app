import { useEffect, useState } from "react";
import ShowData from "./showData";

export default function Grading2({gradedAbs, patients, students}) {
  // hooks and handlers functions for dropdown lists selection
  const [selPatient,setSelPatient]=useState('Select Patient')
  const [selStudent,setSelStudent]=useState('Select Student')
  const hSelPatient=(e)=>{
    setSelPatient(e.target.value)
   }
  const hSelStudent=(e)=>{
    setSelStudent(e.target.value)
  }

  //  this function will format the data comming from gradedAbs array according to selections made with dropdown lists
   const formatData=(sp,ss)=>{
    let data=[] // array to return
    let name=''
    let mark=0    // acumulates student marks 
    let counter=0  // just counts how many students abstracts are graded
    let maxMark=0   // 

    switch (true)
    { // --------------------------------------- format summary by pacient -------------------------------------------------
      case (sp!=='Select Patient' && ss==='Select Student'):
        ss=''
        name=sp.split(' ')
        
        gradedAbs.forEach((abs)=>{
          
          if((abs['FirstName'][0]===name[0]) && (abs['LastName'][0]===name[1]))  // consider only currently selected PATIENT abstracts
          {
            maxMark=0
            Object.values(abs).map(x=>{
              
              if(x[2]!==''){maxMark++;mark+=x[2]} // if field must be marked, add it to maximun marks and student marks
            })
            counter++
            data.push([abs['RegistrationNumber'][0],abs['ChartNumber'][0],abs['ChartNumber'][1],abs['CoderNumberDesc'][1],mark, maxMark])
            mark=0
          }
        })
        
        console.log(counter)
        // data=''
      break
      // ------------------------------------------- format summary by student ---------------------------------------------------
      case (sp==='Select Patient' && ss!=='Select Student'):
        sp=''
        
        gradedAbs.forEach((abs)=>{
         
          if((abs['CoderNumberDesc'][1].toUpperCase()===ss))  // consider only currently selected STUDENT abstracts
          {
             
            maxMark=0
            Object.values(abs).map(x=>{
              
              if(x[2]!==''){maxMark++;mark+=x[2]} // if field must be marked, add it to maximun marks and student marks
            })
            counter++
            data.push([abs['RegistrationNumber'][0],abs['ChartNumber'][0],abs['ChartNumber'][1],abs['FirstName'][0],abs['LastName'][0],mark, maxMark])
            mark=0
          }
        })

        console.log(counter)
      break
      // -------------------------------------- show specific pacient-student abstract ------------------------------------------
      case (sp!=='Select Patient' && ss!=='Select Student'):
        name=sp.split(' ')
        gradedAbs.forEach((abs)=>{
         
          if((abs['CoderNumberDesc'][1].toUpperCase()===ss) && (abs['FirstName'][0]===name[0]) && (abs['LastName'][0]===name[1]))  // consider only currently selected STUDENT abstracts
          {
           
            //console.log(abs)
            maxMark=0
            Object.values(abs).map((x)=>{
              //console.log(x)
              if(x[2]!==''){console.log("aquiestoy");maxMark++;mark+=x[2]} // if field must be marked, add it to maximun marks and student marks
              data.push([x[0],x[1],x[2]])
            })
            
             counter++
            console.log(data)
            mark=0
          }
        })

        console.log(counter)
      break
      default:
        sp='';ss=''
        // data=JSON.stringify(gradedAbs)
        data=''
    }
    return [sp+' -- '+ss+" Abstracts: "+counter,data]
  }
  

  return (
    <div>
      <div>
        <select name="sGroup" id="sGroup">
          <option value="Select Group">Select Group</option>
          {/* Need to lopp through all the groups in the system */}
        </select>
        <select name="sPatient" id="sPatient" onChange={hSelPatient} >
          <option value="Select Patient">Select Patient</option>
          {Object.values(patients).map((name,key)=>{
            return <option key={key} value={name}>{name}</option>
          })}
        </select>
        <select name="sStudent" id="sStudent" onChange={hSelStudent}>
          <option value="Select Student">Select Student</option>
          {Object.values(students).map((name,key)=>{
            return <option key={key} value={name}>{name}</option>
          })}
        </select>
        <br></br>
        <input type="sort" value="Sort"></input>
        <div className="Searched_Results">
          <h2>{formatData(selPatient,selStudent)[0]}{/* {data!==''?data:""} */}</h2>
          {/* <ShowData data={data!==''?data:"nothing"}/> */}
          {/* <h2>{selPacient?JSON.stringify(gradedAbs[selPacient]):'Searched Results'}</h2> */}
          {/* <h2>{selPacient==='0'?formatData(gradedAbs[selPacient]):'Searched Results'}</h2>   <--- este medio funciona con lo que quiero solo voya probar llamar un componente*/} 
          {/* <h3>{selPacient!=='Select Pacient'?<ShowData data={gradedAbs[selPacient]} />:'Searched Results'}</h3> */}
          <h3>
            <ShowData data={formatData(selPatient,selStudent)[1]}/>
           {/* selPacient!==undefined||selStudent!==undefined?((selPacient!=='Select Pacient'?pacients[selPacient]:'') + (selStudent!=='Select Student'?students[selStudent]:'')):"nada"
            ((selPacient!=='Select Pacient'?pacients[selPacient]:'')+(selStudent!=='Select Student'?students[selStudent]:'')):'nada que mostrar' */}
          
          
          </h3>
        </div>
        <button className="Export">Export to CSV</button>
        <button className="Clear">Clear Results</button>
        <button className="Back">Back</button>
      </div>
    </div>
  );
}
