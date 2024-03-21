export default function Grading2({ tAbs, sAb, records, pacients, students }) {
  // console.log(tAbs)

  return (
    <div>
      <div>
        {/* Dropdoen to select Patients */}
        <select name="sGroup" id="sGroup">
          <option value="Select Group">Select Group</option>
          {/* Need to lopp through all the groups in the system */}
        </select>
        <select name="sPatient" id="sPatient">
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
        <select name="sStudent" id="sStudent">
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
          <p>{sAb}</p>
        </div>
        <button className="Export">Export to CSV</button>
        <button className="Clear">Clear Results</button>
        <button className="Back">Back</button>
      </div>
    </div>
  );
}
