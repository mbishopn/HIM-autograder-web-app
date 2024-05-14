import { useState } from "react"
import ShowData from "./showData"

export default function Grading2({
  absData,
  groups
}) {

  const [selPatient, setSelPatient] = useState("Select Patient")
  const [selStudent, setSelStudent] = useState("Select Student")
  const [selectedItems, setSelectedItems] = useState([])
  const [enteredNum, setEnteredNum] = useState({})
  const [mygroups,setMyGroups]=useState(new Map())
  const [first,setFirst]=useState(true)
  const [activeStudents,setActiveStudents]=useState([])
  let wrongAnswers=[]
  let wacounts=document.getElementById('wacounts')


  const hSelPatient = (e) => {
   setSelPatient(e.target.value)
  }

  const hSelStudent = (e) => {
      setSelStudent(e.target.value)
  }

  let formatData = null
  let students = []
  let patients = []
  let grps=[]

  if (absData !== null && groups!==null) {
    const gradedAbs = absData[0].gradedAbs
    students = absData[0].students
    if(first)
    {
      setActiveStudents(students);setFirst(false)
    }
    
    patients = absData[0].patients
    //------------------------------------------------------------------------------
    let tempArr=[]
    if(groups[0].groups!=='')
    {
      tempArr=JSON.parse(groups[0].groups)
      tempArr.forEach((x)=>{
      grps.push(JSON.parse(x)[0])
      mygroups.set(JSON.parse(x)[0],new Set(JSON.parse(x)[1]))
    })
    }

    //---------------------------------------------------------------------------------

    //  this function will format the data comming from data.gradedAbs array according to selections made with dropdown lists
    formatData = (sp, ss) => {
      let data = [] // array to return
      let name = ""
      let mark = 0 // acumulates student marks
      let counter = 0 // just counts how many data.students abstracts are graded
      let maxMark = 0 //
      let weightedMark = 0 //the total of the multiplied marks

      function checkboxHandler(e) {
        let isSelected = e.target.checked
        let value = e.target.value
        if (isSelected) {
          setSelectedItems([...selectedItems, value])
        } else {
          setSelectedItems((prevData) => {
            return prevData.filter((fName) => {
              return fName !== value
            })
          })
        }
      }

      const onNumChange = (e) => {
        let { name, value } = e.target

        setEnteredNum((prevData) => {
          return {
            ...prevData,
            [name]: value,
          }
        })
      }
      switch (
        true // --------------------------------------- format summary by pacient -------------------------------------------------
      ) {
        case sp !== "Select Patient" && ss === "Select Student":
          ss = ""
          name = sp.split(" ")
          
          gradedAbs.forEach((abs) => {
            activeStudents.forEach((student)=>{
            if (
              abs["FirstName"][1] === name[0] &&
              abs["LastName"][1] === name[1] && abs["CoderNumberDesc"][2].toUpperCase()===student
            ) {
              // consider only currently selected PATIENT abstracts
              let p1 = "Student Name"
              let p2 = "Marks "
              let p3 = "Total Grades"
              maxMark = 0
              data[0] = [p1, p2, p3]
              Object.values(abs).map((x) => {
                if (x[3] !== "") {
                  maxMark++
                  mark += x[3]
                  
                  if(x[3]<=0)
                  {
                    if(wrongAnswers.find((field)=>field.field===x[0]))
                    {
                      wrongAnswers[wrongAnswers.findIndex((field)=>field.field===x[0])].count++
                    }
                     else
                     wrongAnswers.push({field:x[0],count:1})
                  }

                } // if field must be marked, add it to maximun marks and student marks
              });
              counter++
              data.push([abs["CoderNumberDesc"][2], mark, maxMark])
              mark = 0
            }
            })
          });
          wrongAnswers.sort((a,b)=>b.count-a.count)

          break;
        // ------------------------------------------- format summary by student ---------------------------------------------------
        case sp === "Select Patient" && ss !== "Select Student":
          sp = ""

          gradedAbs.forEach((abs) => {
            if (abs["CoderNumberDesc"][2].toUpperCase() === ss) {
              // consider only currently selected STUDENT abstracts
              maxMark = 0
              Object.values(abs).map((x) => {
                if (x[3] !== "") {
                  maxMark++
                  mark += x[3]
                } // if field must be marked, add it to maximun marks and student marks
              })
              counter++
              data.push([
                abs["FirstName"][1],
                abs["LastName"][1],
                mark,
                maxMark,
              ])
              mark = 0
            }
          })

          break
        // -------------------------------------- show specific pacient-student abstract ------------------------------------------
        case sp !== "Select Patient" && ss !== "Select Student":
          name = sp.split(" ")
          gradedAbs.forEach((abs) => {
            if (
              abs["CoderNumberDesc"][2].toUpperCase() === ss &&
              abs["FirstName"][1] === name[0] &&
              abs["LastName"][1] === name[1]
            ) {
              // consider only currently selected STUDENT abstracts
              //Heading of Table
              let c1 = <input type="checkbox" />
              let h0 = "Field Name"
              let h1 = "Teacher Abstarct"
              let h2 = "Student Abstarct"
              let h3 = "Correct"
              let h4 = "Multiplier"
              let h5 = "Total"
              maxMark = 0
              data[0] = [c1, h0, h1, h2, h3, h4, h5]
              Object.values(abs).map((x) => {
                if (x[3] !== "") {
                  x[4] = (
                    <input
                      type="checkbox"
                      value={x[0]}
                      checked={selectedItems.includes(x[0])}
                      onChange={checkboxHandler}
                    />
                  )
                  maxMark++
                  mark += x[3]
                  weightedMark += x[6]
                  x[5] = (
                    <input
                      type="number"
                      name={x[0]}
                      onChange={onNumChange}
                      defaultValue={0}
                      max={10}
                      min={1}
                    />
                  )
                  //ZIAD DID THIS!
                  if (!enteredNum[x[0]] || !selectedItems.includes(x[0])) {
                    //if the field is not checked or the multiplier didn't change return 0
                    x[6] = 0
                  } else {
                    x[6] = enteredNum[x[0]] * x[3] //else multiply the grade by the multiplier
                  }

                } // if field must be marked, add it to maximun marks and student marks

                data.push([x[4], x[0], x[1], x[2], x[3], x[5], x[6]])
              })

              counter++
              // Adding total to the end
              const total = ["Total", "", "", "", mark, "", weightedMark]
              data.push(total)
              mark = 0
            }
          });

          break
        default:
          sp = ""
          ss = ""
          data = ""
      }
      return [sp + " -- " + ss + " Abstracts: " + counter, data]
    }
  }

// select to create a new group or show an existing one ----------------------------------------------------------------------
const showSelGroup=(e)=>
{
  const sStudent=document.getElementById('sStudent')
  const sPatient=document.getElementById('sPatient')
  if(e.target.value=='Select Group')
    {students=absData[0].students;setActiveStudents(students);loadSelect(sStudent,students);loadSelect(sPatient,absData[0].patients)}
  else
    {students=Array.from(mygroups.get(e.target.value));setActiveStudents(students);loadSelect(sStudent,students);loadSelect(sPatient,groupPatients(students))}
    setSelStudent(sStudent.options[0].text)
}

// ------------ filter patient names by group -------------
const groupPatients=(students)=>
{
  let gPatients=new Set()
  absData[0].gradedAbs.forEach((abs)=>{
    students.forEach((x)=>{
      if (abs["CoderNumberDesc"][2].toUpperCase() === x)
      {
        gPatients.add(abs['FirstName'][1]+" "+abs['LastName'][1])
      }
    })
  })
  return gPatients
}

//  ------------ helper function to load select elements with data provided ---------------
const loadSelect=(select, data)=>{
  select.innerHTML=''
  let option=document.createElement('option')
  if(select.id==='sStudent')
  {
    option.text='Select Student'
    option.value='Select Student'
  }
  else
  {
    option.text='Select Patient'
    option.value='Select Patient'
  }
  select.add(option)
  data.forEach((x)=>{
    let option=document.createElement('option')
    option.text=x
    option.text=x
    select.add(option)
  })
}

// ------------- shows/hides Wrong Answer Stats ----------------
const toggleWASbtn=(e)=>{
  // let wacounts=document.getElementById('wacounts')
  if(wacounts.style.display=='none')
  {
     wacounts.style.display='block', e.target.textContent="Hide wrong counts"
  }
  else
  {
    wacounts.style.display='none', e.target.textContent="wrong counts"
 }
}

//----------------  exporting to csv still needs to be refined, I just added this to get an idea -------------------------------
function downloadJSONAsCSV(jsonData) {
  // Fetch JSON data from the endpoint
if (jsonData!==null)
{
            // Convert JSON data to CSV
          let csvData = jsonToCsv(jsonData); // Add .items.data
          // Create a CSV file and allow the user to download it
          let blob = new Blob([csvData], { type: 'text/csv' })
          let url = window.URL.createObjectURL(blob)
          let a = document.createElement('a')
          a.href = url;
          a.download = 'data.csv'
          document.body.appendChild(a)
          a.click()
}

}
function jsonToCsv(jsonData) {
  let csv = ''
  // Get the headers
  let headers = Object.keys(jsonData)
  csv += headers.join(',') + '\n'
  // Add the data
  jsonData.forEach(function (row) {
      let data = headers.map(header => JSON.stringify(row[header])).join(','); // Add JSON.stringify statement
      csv += data + '\n'
  });
  return csv
}

const handleExport=()=>{
  downloadJSONAsCSV(formatData(selPatient,selStudent)[1])
}

//----------------------------- RENDERING --------------------------------------------


  return absData !== null && mygroups !==null? (
    <div>{students.length>0?students.forEach(x=><p>{x}</p>):""}
       <select name="sGroup" id="sGroup" onChange={showSelGroup}>
        <option value="Select Group">Select Group</option>
        {Object.values(grps).map((name, key) => {
          return (
            <option key={key} value={name}>
              {name}
            </option>
          )
        })}
      </select>
      <select name="sPatient" id="sPatient" onChange={hSelPatient}>
        <option value="Select Patient">Select Patient</option>
        {Object.values(patients).map((name, key) => {
          return (
            <option key={key} value={name}>
              {name}
            </option>
          )
        })}
      </select>
      <select name="sStudent" id="sStudent"  onChange={hSelStudent}>
        <option value="Select Student">Select Student</option>
        {Object.values(students).map((name, key) => {
          return (
            <option key={key} value={name}>
              {name}
            </option>
          )
        })}
      </select>
      <br></br>
      <div className="Searched_Results">
        <h3>{formatData(selPatient, selStudent)[0]}<button id='wasBtn' onClick={toggleWASbtn}>wrong counts</button></h3>
         <div className="wacounts" id="wacounts" style={{display:'none'}}>
         <div>{Object.values(wrongAnswers).map((value,key)=>{return (<p key={key}>{value.field}:&emsp;{value.count}</p>)})}</div>
        </div>
        <h3>
          <ShowData data={formatData(selPatient, selStudent)[1]} />
        </h3>
      </div>
      <button onClick={handleExport} className="Export">Export to CSV</button>
      <button className="Clear">Clear Results</button>
      <button className="Back">Back</button>
    </div>
  ) : (
    "Loading Abstracts..."
  );
}
