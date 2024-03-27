import { useState } from "react";
import axios from "axios";
import { compareAllStudents } from "./utilities/compare";

export default function Grading2({ gradedAbs, records, pacients, students }) {
  // console.log(tAbs)
  const [selection, setSelection] = useState({
    student: "",
    group: "",
    patient: "",
  });
  // const [selectedStudent, setSelectedStudent] = useState("Select Student");
  // const [selectedGroup, setSelectedGroup] = useState("Select Group");
  // const [selectedPatient, setSelectedPatient] = useState("Select Patient");

  // const handleStudentChange = (evt) => {
  //   setSelectedStudent(evt.target.value);
  // };

  // const handleGroupChange = (evt) => {
  //   setSelectedGroup(evt.target.value);
  // };

  // const handlePatientChange = (evt) => {
  //   setSelectedPatient(evt.target.value);
  // };

  const handleOnChange = (evt) => {
    const { name, value } = evt.target;
    setSelection((prevData) => {
      return {
        ...prevData, // spread the previous state
        [name]: value,
      };
    });
  };

  return (
    <div>
      <div>
        <div className="Selection">
          <form action="">
            {/* Need to lopp through all the groups in the system */}
            <select
              name="sGroup"
              id="sGroup"
              value={selection.group}
              onChange={handleOnChange}
            >
              <option value="Select Group">Select Group</option>

              {/* Dropdown to select Patients */}
            </select>
            <select
              name="sPatient"
              id="sPatient"
              value={selection.patient}
              onChange={handleOnChange}
            >
              <option value="Select Patient">Select Patient</option>
              {Object.values(pacients).map((name, key) => {
                return (
                  <option key={key} value={name}>
                    {name}
                  </option>
                );
              })}
            </select>

            {/* Dropdoen to select Students */}
            <select
              name="sStudent"
              id="sStudent"
              value={selection.student}
              onChange={handleOnChange}
            >
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
            <button>Search</button>
          </form>
        </div>
        <div className="Searched_Results">
          {/* <p>{compareAllStudents(tAb, sAb)}</p> */}

          {Object.values(gradedAbs[0]).map((i, key) => {
            return <p key={key}>{i}</p>;
          })}
        </div>

        <button className="Clear">Clear Results</button>
        <button className="Back">Back</button>
      </div>
    </div>
  );
}
