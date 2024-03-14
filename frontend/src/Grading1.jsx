// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function Grading1() {
  return (
    <div>
      <div>
        <select name="gPresets" id="preset">
          <option value="Grading Preset">Choose from a preset</option>
          {/* Need to lopp through all the presets in the system */}
        </select>
        <br></br>
        <input type="submit" value="Submit"></input>
        <table>
          <tr>
            <th>Field Name</th>
            <th>Weightage</th>
          </tr>
          <tr></tr>
          {/* Need to loop through all the field names */}
        </table>
        <button>Save</button>
      </div>
    </div>
  );
}
