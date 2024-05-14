import { useState } from "react"
import { updatedbGroups } from "../utilities/dbFunctions"

export default function EditGroup({qryname,absData,groups,setGroups}) {

  let students=[]

  let groupslist=document.getElementById("currentGroups")
  const groupTag=document.getElementById("groups-tag")
  let outGroup=document.getElementById('outGroup')
  let inGroup=document.getElementById('inGroup')

  const [mygroups,setMyGroups]=useState(new Map())
  const[addEditBtn,setAddEditBtn]=useState('add group')
  const[delBtn,setDelBtn]=useState(false)
  const [numOg,setNumOg]=useState()
  const [numIg,setNumIg]=useState()
  const [first,setFirst]=useState(true)

  if(absData!==null){students=absData[0].students}

// to sort elements in <select> lists --------------------------------------------------------------------------------
const sortSelectContent=(select)=>{
  let tempArr=[]
  let ii=select.options.length-1

  for (ii;ii>=0;ii--)
  {
    tempArr.push(select.options[ii].text)
    select.remove(ii)
  }
  tempArr.sort()

  Object.values(tempArr).map((student)=>{
    let option=document.createElement('option')
    option.text=student
    option.value=student
    select.add(option)
  })
} // ------------------------------------------------------------------------------------

  if(groups!==null && first && absData!==null){
    if(groups[0]!=undefined && groups[0].groups!='')
    {
      let tempArr=[]
      tempArr=JSON.parse(groups[0].groups)
      tempArr.forEach((x)=>{
        mygroups.set(JSON.parse(x)[0],new Set(JSON.parse(x)[1]))
      })
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
        value.forEach((x)=>{  
          temp.delete(x)
        })
      })
      students=[]
      temp.forEach(x=>students.push(x))
    }
      setFirst(false)
      outGroup.innerHTML=''
      students.forEach((x)=>{
      let option=document.createElement('option')
      option.value=x
      option.text=x
      outGroup.add(option)
      })
      setNumOg(outGroup.options.length)
      sortSelectContent(outGroup)
  }

// select to create a new group or show an existing one ----------------------------------------------------------------------
const showSelGroup=(e)=>
{
  if(inGroup.options.length!=0)  // undo whatever it's been done and not save yet
  {
    if(mygroups.has(groupTag.value))
    {
      for(let ii=inGroup.options.length-1;ii>=0;ii--)
        {
            if((mygroups.get(groupTag.value)).has(inGroup.options[ii].text))
              {inGroup.remove(ii)}
        }
        for(let ii=outGroup.options.length-1;ii>=0;ii--)
        {
            if((mygroups.get(groupTag.value)).has(outGroup.options[ii].text))
              {outGroup.remove(ii)}
        } 
    }

    moveStudent(inGroup,outGroup,true)
  }
  // --------- undo complete ---------------------------------------------
  inGroup.innerHTML=''
  if(e.target.value==="--new group--")
    {
      groupTag.value="Identify this Group"
      setNumIg(inGroup.options.length)
      setAddEditBtn('add group')
      setDelBtn(false)
    }
  else
    {
      groupTag.value=e.target.value
      setAddEditBtn('update group')
      setDelBtn(true)
      mygroups.get(groupTag.value).forEach((x)=>{
        let option=document.createElement('option')
        option.text=x
        option.value=x
        inGroup.add(option)
      })
      setNumIg(inGroup.options.length)
    }
}

// these functions are called by buttons according to students movement selected, then will call moveStudent function
const addStudent=()=>{ moveStudent(outGroup,inGroup)}
const removeStudent=()=>{moveStudent(inGroup,outGroup)}

// moves selected elements in source list to target list, then sorted them -------------------------------------------
const moveStudent =(source, target, all=false)=>{
  let ii=source.options.length-1
  if(!all)
  {
      for (ii;ii>=0;ii--)
      {
        if(source.options[ii].selected)
        {
          let option=document.createElement('option')
          option.text=source.options[ii].text
          target.add(option)
          source.remove(ii)
        }
      }
  }
  else
  { // moves all options from source to target select
    for (ii;ii>=0;ii--)
    {
      if(document.getElementById('outGroup').value===source.options[ii])
       {alert("repeated element")}  
      let option=document.createElement('option')
      option.text=source.options[ii].text
      target.add(option)
    }
  }
  setNumIg(inGroup.options.length)
  setNumOg(outGroup.options.length)
  sortSelectContent(target)
}

// -------------------------------- saving all groups created and store them in db --------------------------------------- 
const saveGroup=()=>{
  let tempArr=[]
  mygroups.forEach((value,key)=>
  {
    tempArr.push(JSON.stringify([key,Array.from(value)]))
  })
  let strToDB=JSON.stringify(tempArr)
  updatedbGroups(qryname,strToDB)
  setGroups([{groups:strToDB}])
}

// adding/editing a group --------------------------------------------------------------------------------------------
const addGroup=()=>{
  let gstudents=new Set()
  if (groupTag.value!=='Identify this Group'&&groupTag.value!==''&&inGroup.options.length!==0 )
  {
    if (groupslist.options[groupslist.selectedIndex].value!=groupTag.value && groupslist.options[groupslist.selectedIndex].value!='--new group--')
    {
      alert("Can't change group name already defined, if you are trying to create a new group select '--new group--' from dropdown list")
      groupTag.value=groupslist.options[groupslist.selectedIndex].value
    }
    else
    {
      if(!mygroups.has(groupTag.value))
      {
        let option=document.createElement('option')
        option.text=groupTag.value
        groupslist.add(option)
        sortSelectContent(groupslist)
      }
      Object.values(inGroup.options).map((values)=>{
        gstudents.add(values.text)
      })
      mygroups.set(groupTag.value,gstudents)
      inGroup.innerHTML=''
      groupTag.value=''
      setNumIg(inGroup.options.length)
      groupslist.value="--new group--"
      groupTag.value='Identify this Group'
      setAddEditBtn('add group')
      setDelBtn(false)
    }
  }
  else{
    alert("Group must have an ID and at least 1 student")
  }
}

const delGroup=()=>{
  if(inGroup.options.length!=0)
  {
    moveStudent(inGroup,outGroup,true)
    inGroup.innerHTML=''
    setNumIg(inGroup.options.length)
    mygroups.delete(groupTag.value)
    groupslist.remove(groupslist.selectedIndex)
  }
}

  return (

      <div>
        <div><h2>{qryname!==null?qryname:"Loading..."} Groups</h2></div>
        <div className="groups-header">
          <div >
            <select name="" id="currentGroups" onChange={showSelGroup}>
              <option value="--new group--">--new group--</option>
            </select>
          </div>
          <div>
            <label htmlFor='groups-tag'>Group TAG</label>
            <input type="text" id='groups-tag' defaultValue="Identify this Group"></input>
            <button id="addEditBtn" onClick={addGroup} >{addEditBtn}</button>
            {delBtn?<button id='delBtn'onClick={delGroup}>delete group</button>:''}
          </div>
        </div>
        <div className="groups-layout">
          <div>
          <p><label>All students list ({numOg===null?students.length:numOg} students)</label></p>
            <select name='outGroup' id='outGroup' multiple size="20">
            </select>
          </div>
          <div className="groups-buttons">
            <div><button onClick={addStudent}>&gt;&gt;</button></div>
            <div><button onClick={removeStudent}>&lt;&lt;</button></div>
          </div>
          <div>
            <p><label>Students in group ({numIg} students)</label></p>
            <select name='inGroup' id='inGroup' size="20" multiple style={{minWidth: '200px'}}>
            </select>          
          </div>          
        </div>
        <button onClick={saveGroup}>Save Groups</button>
      </div>

  );
}
