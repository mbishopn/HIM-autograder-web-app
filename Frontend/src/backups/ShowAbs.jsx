import { getUsers,getAbs } from "./utilities/dbFunctions"
import { useState, useEffect } from "react";

export default function ShowAbs() {

// const result= getAbs()
const [records, setRecords] = useState([])

useEffect(() => {
    getAbs("","",1).then((result)=>setRecords(result))
  }, []);

  
return(

    <>
        <h1>ABSTRACTS Page</h1>
        <div>
            blablalbalblalbla
            <table className="abs" >
            {
                Object.values(records).map((abs,i)=>{
                    return(
                    <>
                        <thead key={i}><tr>
                            {
                                Object.keys(abs).map((keys)=>{
                                    return <th key={keys}>{keys}</th>
                                })
                            }
                        </tr></thead>
                        <tbody key={"b"+i}><tr>
                            {
                                Object.values(abs).map((val,key)=>{
                                    if(typeof(val)!=='object')
                                    return <td key={key}>{val}</td>
                                    else{
                                        let occurrence=Object.entries(val).map((occF)=>(
                                            Object.values(occF).map((val)=>{
                                                return val
                                            })
                                        ))
                                        return(
                                            <td key={key}>
                                                {Object.entries(occurrence).map((val,i)=>{
                                                    return(
                                                    <div>
                                                    
                                                        <p key={key+"-"+i}>{Object.values(val[1][0])}</p>
                                                        {
                                                            Object.keys(val[1][1]).map(k=>{
                                                                return k+" : "+val[1][1][k]+" "
                                                            }
                                                        )}
                                                    </div>) 
                                                })}
                                            </td>
                                        )
                                    }
                                })
                            }
                        </tr></tbody>    
                    </>
                )
                })
            }
            </table>
        </div>

    </>
)
}

/*
                <thead>
                    { Object.values(records).map((abs, i)=>(                    
                    <tr key={i}>
                            {
                                Object.keys(abs).map(key=>{
                                    //console.log("valor ",key)
                                    return <th key={key}>{key}</th>})
                            }
                    </tr>
                     ))}
                </thead>
                <tbody>
                    {Object.values(records).map((abs,i)=>(
                    <tr key={i}>
                        {
                            Object.values(abs).map((val,key)=>{
                                console.log("valor ",val)
                                return (typeof(val)==='string'?
                                <td key={key}>{val}</td> :
                                <td>Object</td>)
                            })
                        }
                    </tr>
                    ))}
                </tbody>
*/