import { useEffect, useState } from "react";
import ShowData from "./showData";
import { useLocation } from "react-router-dom";
import { gradeAbstracts } from "../utilities/compare";

export default function Grading2({
  qryname,
  absData,
  groups
}) {
  // console.log(absData)
  // console.log(qryname)

  const [selPatient, setSelPatient] = useState("Select Patient");
  const [selStudent, setSelStudent] = useState("Select Student");
  const [selectedItems, setSelectedItems] = useState([]);
  const [enteredNum, setEnteredNum] = useState({});
  const [finalFieldGrade, setFinalFieldGrade] = useState({});

  const hSelPatient = (e) => {
    setSelPatient(e.target.value);
  };
  const hSelStudent = (e) => {
    setSelStudent(e.target.value);
  };
  if(groups!=null)
  {
    console.log(groups)
    if(groups[0]!=undefined && groups[0].groups!='')
    {
      let tempArr=[]
      tempArr=JSON.parse(groups[0].groups)
      tempArr.forEach((x)=>{
        mygroups.set(JSON.parse(x)[0],new Set(JSON.parse(x)[1]))
      })
      console.log(mygroups)
      groupslist.innerHTML=''
      let option=document.createElement('option')
      option.value='--new group--'
      option.text='--new group--'
      groupslist.add(option)
      let temp=new Set(students)
      mygroups.forEach((value,key)=>{
        let option=document.createElement('option')
        option.value=key
        option.text=key
        groupslist.add(option)
        console.log(students.length)
        value.forEach((x)=>{  //--- llena el outGroup sin los alumnos ya en grupos
          temp.delete(x)
        })
      })
      students=[]
      temp.forEach(x=>students.push(x))
      console.log(temp)
      console.log(students)
    }
  }

 
  let formatData = null;
  let students = [];
  let patients = [];
  // const [absData,setAbsData]=useState(null)

  // useEffect(()=>{
  //   gradeAbstracts(qryname).then((result)=>setAbsData(result))
  // },[qryname])

  //  console.log(absData)
  if (absData !== null) {
    const gradedAbs = absData[0].gradedAbs;
    students = absData[0].students;
    patients = absData[0].patients;

    // hooks and handlers functions for dropdown lists selection

    //  this function will format the data comming from data.gradedAbs array according to selections made with dropdown lists
    formatData = (sp, ss) => {
      let data = []; // array to return
      let name = "";
      let mark = 0; // acumulates student marks
      let counter = 0; // just counts how many data.students abstracts are graded
      let maxMark = 0; //
      let weightedMark = 0; //the total of the multiplied marks

      function checkboxHandler(e) {
        let isSelected = e.target.checked;
        let value = e.target.value;
        if (isSelected) {
          setSelectedItems([...selectedItems, value]);
        } else {
          setSelectedItems((prevData) => {
            return prevData.filter((fName) => {
              return fName !== value;
            });
          });
        }
      }

      const onNumChange = (e) => {
        let { name, value } = e.target;

        setEnteredNum((prevData) => {
          return {
            ...prevData,
            [name]: value,
          };
        });
      };
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

          // console.log(counter);
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
              data.push([
                abs["FirstName"][1],
                abs["LastName"][1],
                mark,
                maxMark,
              ]);
              mark = 0;
            }
          });

          // console.log(counter);
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
              let c1 = <input type="checkbox" />;
              let h0 = "Field Name";
              let h1 = "Teacher Abstarct";
              let h2 = "Student Abstarct";
              let h3 = "Correct";
              let h4 = "Multiplier";
              let h5 = "Total";
              maxMark = 0;
              // let top;
              data[0] = [c1, h0, h1, h2, h3, h4, h5];
              Object.values(abs).map((x) => {
                if (x[3] !== "") {
                  x[4] = (
                    <input
                      type="checkbox"
                      value={x[0]}
                      checked={selectedItems.includes(x[0])}
                      onChange={checkboxHandler}
                    />
                  );
                  maxMark++;
                  mark += x[3];
                  weightedMark += x[6];
                  // top = x[1];
                  // console.log(top);
                  x[5] = (
                    <input
                      type="number"
                      name={x[0]}
                      onChange={onNumChange}
                      defaultValue={0}
                      max={10}
                      min={1}
                    />
                  );
                  // console.log(x[5]);
                  //ZIAD DID THIS!
                  if (!enteredNum[x[0]] || !selectedItems.includes(x[0])) {
                    //if the field is not checked or the multiplier didn't change return 0
                    x[6] = 0;
                  } else {
                    x[6] = enteredNum[x[0]] * x[3]; //else multiply the grade by the multiplier
                  }

                  // console.log(x[3]);
                  // console.log(enteredNum);
                  // console.log(enteredNum[selectedItems[0]] * x[3]);
                  // selectedItems.map((y) => {
                  // console.log(enteredNum[y] * x[3]);
                  // setFinalFieldGrade(
                  //   (finalFieldGrade[y] = parseInt(enteredNum[y] * x[3]))
                  // );
                  // console.log(finalFieldGrade);
                  // });
                } // if field must be marked, add it to maximun marks and student marks

                data.push([x[4], x[0], x[1], x[2], x[3], x[5], x[6]]);
              });

              counter++;
              // Adding total to the end
              const total = ["Total", "", "", "", mark, "", weightedMark];
              data.push(total);
              // console.log(data);
              mark = 0;
            }
          });

          // console.log(counter);
          break;
        default:
          sp = "";
          ss = "";
          // data=JSON.stringify(data.gradedAbs)
          data = "";
      }
      return [sp + " -- " + ss + " Abstracts: " + counter, data];
    };
  }

  // return <>
  // {absData!==null?absData[0].gradedAbs.length:"Loading Abstr..."}
  // </>
  return absData !== null ? (
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
        <h3>
          <ShowData data={formatData(selPatient, selStudent)[1]} />
        </h3>
      </div>
      <button className="Export">Export to CSV</button>
      <button className="Clear">Clear Results</button>
      <button className="Back">Back</button>
    </div>
  ) : (
    "Loading Abstracts..."
  );
}
