export default function EditGroup() {
  return (
    <div>
      <div>
        <select name="sGroup" id="sGroup">
          <option value="Select Group">Select Group</option>
          {/* Need to lopp through all the groups in the system */}
        </select>

        <div>
          <h2>Members</h2>
          <button>Remove</button>
          {/* Need to lopp through all the students in the group */}
        </div>
        <select name="students" id="students">
          <option value="Added students">Select Student to add to Group</option>
          {/* Need to lopp through all the groups in the system */}
        </select>
        <button>Edit and Save</button>
      </div>
    </div>
  );
}
