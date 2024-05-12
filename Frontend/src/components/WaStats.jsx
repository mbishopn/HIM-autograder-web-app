// this component shows wrong answers counts, these counts could be simply put into a select instead of div 

import "../App.css";

export default function WaStats({ patient }) {
  console.log(patient)

return (
  <div> hola
    {patient.forEach((value,key)=>{
      console.log(key+" -------- "+value)
      return <>NADA</>
    })}
  </div>
)

}

