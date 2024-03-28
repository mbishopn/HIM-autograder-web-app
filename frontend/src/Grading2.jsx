import { useEffect, useState } from "react";
import ShowData from "./showData";

export default function Grading2({ gradedAbs, patients, students }) {
  // hooks and handlers functions for dropdown lists selection
  const [selPatient, setSelPatient] = useState("Select Patient");
  const [selStudent, setSelStudent] = useState("Select Student");
  const hSelPatient = (e) => {
    setSelPatient(e.target.value);
  };
  const hSelStudent = (e) => {
    setSelStudent(e.target.value);
  };

  //  this function will format the data comming from gradedAbs array according to selections made with dropdown lists
  const formatData = (sp, ss) => {
    let data = []; // array to return
    let name = "";
    let mark = 0; // acumulates student marks
    let counter = 0; // just counts how many students abstracts are graded
    let maxMark = 0; //

    switch (
      true // --------------------------------------- format summary by pacient -------------------------------------------------
    ) {
      case sp !== "Select Patient" && ss === "Select Student":
        ss = "";
        name = sp.split(" ");

        gradedAbs.forEach((abs) => {
          if (
            abs["FirstName"][1] === name[0] &&
            abs["LastName"][1] === name[1]
          ) {
            // consider only currently selected PATIENT abstracts
            let p1 = "Student Name";
            let p2 = "Marks ";
            let p3 = "Total Grades";
            maxMark = 0;
            data[0] = [p1, p2, p3];
            Object.values(abs).map((x) => {
              if (x[3] !== "") {
                maxMark++;
                mark += x[3];
              } // if field must be marked, add it to maximun marks and student marks
            });
            counter++;
            data.push([abs["CoderNumberDesc"][2], mark, maxMark]);
            mark = 0;
          }
        });

        console.log(counter);
        // data=''
        break;
      // ------------------------------------------- format summary by student ---------------------------------------------------
      case sp === "Select Patient" && ss !== "Select Student":
        sp = "";

        gradedAbs.forEach((abs) => {
          if (abs["CoderNumberDesc"][2].toUpperCase() === ss) {
            // consider only currently selected STUDENT abstracts
            maxMark = 0;
            Object.values(abs).map((x) => {
              if (x[3] !== "") {
                maxMark++;
                mark += x[3];
              } // if field must be marked, add it to maximun marks and student marks
            });
            counter++;
            data.push([abs["FirstName"][1], abs["LastName"][1], mark, maxMark]);
            mark = 0;
          }
        });

        console.log(counter);
        break;
      // -------------------------------------- show specific pacient-student abstract ------------------------------------------
      case sp !== "Select Patient" && ss !== "Select Student":
        name = sp.split(" ");
        gradedAbs.forEach((abs) => {
          if (
            abs["CoderNumberDesc"][2].toUpperCase() === ss &&
            abs["FirstName"][1] === name[0] &&
            abs["LastName"][1] === name[1]
          ) {
            // consider only currently selected STUDENT abstracts
            //console.log(abs)

            //Heading of Table
            let h0 = "Field Name";
            let h1 = "Teacher Abstarct";
            let h2 = "Student Abstarct";
            let h3 = "Student Grades";
            let h4 = "Total Grades";
            maxMark = 0;
            data[0] = [h0, h1, h2, h3, h4];
            Object.values(abs).map((x) => {
              //console.log(x)
              if (x[4] !== "") {
                maxMark++;
                mark += x[3];
              } // if field must be marked, add it to maximun marks and student marks
              data.push([x[0], x[1], x[2], x[3], x[4]]);
            });

            // let m = mark;
            // let total = "Total Grades";
            // data.push([0]=total,[1]='',[2]='',[3]=m,[4]='')

            counter++;
            console.log(data);
            mark = 0;
          }
        });

        console.log(counter);
        break;
      default:
        sp = "";
        ss = "";
        // data=JSON.stringify(gradedAbs)
        data = "";
    }
    return [sp + " -- " + ss + " Abstracts: " + counter, data];
  };

  return (
    <div>
      <div>
        <select name="sGroup" id="sGroup">
          <option value="Select Group">Select Group</option>
          {/* Need to lopp through all the groups in the system */}
        </select>
        <select name="sPatient" id="sPatient" onChange={hSelPatient}>
          <option value="Select Patient">Select Patient</option>
          {Object.values(patients).map((name, key) => {
            return (
              <option key={key} value={name}>
                {name}
              </option>
            );
          })}
        </select>
        <select name="sStudent" id="sStudent" onChange={hSelStudent}>
          <option value="Select Student">Select Student</option>
          {Object.values(students).map((name, key) => {
            return (
              <option key={key} value={name}>
                {name}
              </option>
            );
          })}
        </select>
        <br></br>
        <div className="Searched_Results">
          <h3>{formatData(selPatient, selStudent)[0]}</h3>

          {/* {data!==''?data:""} */}

          {/* <ShowData data={data!==''?data:"nothing"}/> */}
          {/* <h2>{selPacient?JSON.stringify(gradedAbs[selPacient]):'Searched Results'}</h2> */}
          {/* <h2>{selPacient==='0'?formatData(gradedAbs[selPacient]):'Searched Results'}</h2>   <--- este medio funciona con lo que quiero solo voya probar llamar un componente*/}
          {/* <h3>{selPacient!=='Select Pacient'?<ShowData data={gradedAbs[selPacient]} />:'Searched Results'}</h3> */}
          <h3>
            <ShowData data={formatData(selPatient, selStudent)[1]} />
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
