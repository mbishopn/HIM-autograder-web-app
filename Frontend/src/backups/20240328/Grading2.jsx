import { useEffect, useState } from "react";
import ShowData from "./showData";

export default function Grading2({gradedAbs, patients, students}) {

  const [selPatient,setSelPatient]=useState('Select Patient')
  const [selStudent,setSelStudent]=useState('Select Student')
  // const[data,setData]=useState('')
  // const [data2,setData2]=useState('')
  let ga=[]
  ga=gradedAbs
  const hSelPatient=(e)=>{
    setSelPatient(e.target.value)
    // console.log(e.target.value)
  }

  const hSelStudent=(e)=>{
    setSelStudent(e.target.value)
    // console.log(e.target.value)
  }

   const formatData=(a1,a2)=>{
    let data=[]
    let ab=[]
    let name=''
    let mark=0
    let counter=0
    let maxMark=0
    //let data=(a1!=='Select Patient'?a1:'') + ' -- ' + (a2!=='Select Student'?a2:'')
    switch (true)
    { // format summary by pacient
      case (a1!=='Select Patient' && a2==='Select Student'):
        a2='All students'
        name=a1.split(' ')
        
        ga.forEach((abs)=>{
          
          if((abs['FirstName'][0]===name[0]) && (abs['LastName'][0]===name[1]))
          {
            maxMark=0
            Object.values(abs).map(x=>{
              maxMark++
             if(x[2]!=='')
             mark+=x[2]
            })
            // console.log(a1,abs['CoderNumberDesc'][0],mark+' out of '+maxMark)
            
            counter++
            data.push([abs['RegistrationNumber'][0],abs['ChartNumber'][0],abs['ChartNumber'][1],abs['CoderNumberDesc'][1],mark, maxMark])
            mark=0
          }
          // {
        
          //   data.push(abs)}
        })
        
        console.log(counter)
        // data=''
      break
      // format summary by student
      case (a1==='Select Patient' && a2!=='Select Student'):
        a1='All patients'
      break
      // show specific pacient-student abstract
      case (a1!=='Select Patient' && a2!=='Select Student'):
        
      break
      default:
        a1='All Patients';a2='All Students'
        // data=JSON.stringify(gradedAbs)
        data=''
    }
    return [a1+' -- '+a2,data]
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
