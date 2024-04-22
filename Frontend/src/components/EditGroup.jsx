export default function EditGroup({qryname,absData}) {

  let students=[]

  if(absData!==null)
{
  students=absData[0].students
}

const addStudent =()=>{
  let selStu=document.getElementById('students')
  let selGroup=document.getElementById('sGroup')
 
  let ii=selStu.options.length-1
  for (ii;ii>=0;ii--)
  {
    if(selStu.options[ii].selected)
    {
      let option=document.createElement("option")
      option.text=selStu.options[ii].text
      selGroup.add(option)
      selStu.remove(ii)
    }
  }
    // Object.values(selStu.options).map((value,key)=>{
    //   if(value.selected===true)
    //   {
    //     let option=document.createElement("option")
    //     option.text=value.text
    //     selGroup.add(option)
    //   }
    // })
}

const removeStudent=async ()=>{

  // [...sGroup.selectedOptions].forEach(opt=>opt.remove())  //  --- does removal in one line
  let selGroup=document.getElementById('sGroup')
  let ii=selGroup.options.length-1
  for (ii;ii>=0;ii--)
  {
    if(selGroup.options[ii].selected)
    {selGroup.remove(ii)}
  }
}


  return (
    <div>
      <div>
        <div>grupos de {qryname!==null?qryname:"Loading..."}</div>
        <div>
          <h2>Members</h2>
          <button>Remove</button>
          {/* Need to lopp through all the students in the group */}
        </div>
        <div className="groups-layout">
          <div>
          <p><label>All students list</label></p>
            <select name="students" id="students" multiple size="20">
              <option value="Added students">Select Student to add to Group</option>
              {Object.values(students).map((value,key)=>{
              return <option key={key}>{value}</option>
            })}
            </select>
          </div>
          <div className="groups-buttons">
            <div><button onClick={addStudent}>&gt;&gt;</button></div>
            <div><button onClick={removeStudent}>&lt;&lt;</button></div>
          </div>
          <div>
            <p><label>Students in group</label></p>
            <select name="sGroup" id="sGroup" size="20" multiple >
              <option value="Select Group">----------------------------</option>
              {/* Need to lopp through all the groups in the system */}
            </select>          
          </div>          
        </div>


        <button>Edit and Save</button>
      </div>
    </div>
  );
}
