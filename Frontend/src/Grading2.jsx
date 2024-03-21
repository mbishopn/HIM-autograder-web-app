export default function Grading2({tAbs, records,pacients, students}) {

// console.log(tAbs)

  return (
    <div>
      <div>
        <select name="sGroup" id="sGroup">
          <option value="Select Group">Select Group</option>
          {/* Need to lopp through all the groups in the system */}
        </select>
        <select name="sPatient" id="sPatient">
          <option value="Select Patient">Select Patient</option>
          {Object.values(pacients).map((name,key)=>{
            return <option key={key} value={name}>{name}</option>
          })}
        </select>
        <select name="sStudent" id="sStudent">
          <option value="Select Student">Select Student</option>
          {Object.values(students).map((name,key)=>{
            return <option key={key} value={name}>{name}</option>
          })}
        </select>
        <br></br>
        <input type="sort" value="Sort"></input>
        <div className="Searched_Results">
          <h2>Searched Results</h2>
        </div>
        <button className="Export">Export to CSV</button>
        <button className="Clear">Clear Results</button>
        <button className="Back">Back</button>
      </div>
    </div>
  );
}
