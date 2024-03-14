export default function Grading2() {
  return (
    <div>
      <div>
        <select name="sGroup" id="sGroup">
          <option value="Select Group">Select Group</option>
          {/* Need to lopp through all the groups in the system */}
        </select>
        <select name="sPatient" id="sPatient">
          <option value="Select Patient">Select Patient</option>
          {/* Need to lopp through all the patients in the system */}
        </select>
        <select name="sStudent" id="sStudent">
          <option value="Select Student">Select Student</option>
          {/* Need to lopp through all the Student in the system */}
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
