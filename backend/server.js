const express = require("express")
const { request, response } = require("http")
const server = express()

const cors = require("cors")
require("dotenv/config")
const port = 3000
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const sql=require('./conn')
const { abstractsQry,studentsQry,usersQry,groupsQry } = require("./queries")
server.use(express.urlencoded({ extended: false }))
server.use(express.json())
server.use(cors())


// ---------- LISTENING APP REQUESTS -----------------
server.listen(port, () => {
  console.log(`Listening on ${port}...\nConnected to DB`)
})

// ------------- DEFAULT ROUTE, JUST TO CHECK API IS ALIVE --------------------
server.get("/", (request, response) => {
  response.send("LIVE!")
});

//------------------ USERS ROUTE (TEACHERS NAMES) ------------------------------
// right now I'm using this but we should change to get usernames from our db
server.get("/users", async (request, response) => {
  let {qry }=request.query
  let db=''
  if(qry==='1')
   {db="development_usercred"}
  if(qry==='2')
   {db="development_usercred"}
const result = await sql.dbConn(usersQry(qry),db)
.then((result)=>{
  console.log(result)
  response.send(result)
})
})

//------------------ GROUPS ROUTE -----------------------------------
server.get("/groups", async (request, response) => {
  const{teacher}=request.query
  console.log(teacher)
  await sql.dbConn(groupsQry(teacher,'1'),"development_usercred")
   .then((result)=>{
    console.log(result)
    response.send(result)
  })
  })

//--------------------- SAVE/UPDATE GROUPS ROUTE ----------------------------

server.post("/groups", async (request, response) => {
  console.log(request.body)
  const {teacher,option,grps}=request.body
  await sql.dbConn(groupsQry(teacher,option,grps),"development_usercred")
  .then((result)=>{
  console.log(result)
  response.send("Groups for "+teacher+" have been updated")
  })
})

//------------------ STUDENTS ROUTE -----------------------------------
server.get("/students", async (request, response) => {
  await sql.dbConn(studentsQry(),"slcv3")
   .then((result)=>{
    console.log(result)
    response.send(result)
  })
  })

//--------------------- UPDATE USER PASSWORD ----------------------------

server.post("/updatePassword", async (request, response) => {
  console.log(request.body)
  const {username,password}=request.body
  encPass=bcrypt.hashSync(password,10)
  if(username!==undefined&&password!==undefined)
  await sql.dbConn("update users set userPassword='"+(encPass)+"' where username='"+ username +"'","development_usercred")
  .then((result)=>{
  console.log(result)
  response.send("Password has been updated")
  })
})

//--------------- USER VERIFICATION POST - login

server.post("/login", async (request, response) => {
  const { username, password } = request.body
  console.log(username,password)
  await sql.dbConn("select username,qryname,userpassword from users where username='"+username+"'","development_usercred")
  .then((user)=>{
    if (user.length!==0) {
      if(user[0].userpassword!==null)
      {bcrypt.compare(password, user[0].userpassword, (err, res) => {
        if (err) {
          console.log(err)
          response.send(err)
        }
        else
        {
          if (res) {
          const jwtToken = jwt.sign({id: user[0].username}, "token")
          response.send({message: "Successful Login", token: jwtToken, qry:user[0].qryname})
        } else {
          response.send({message: "Bad username or password"})
        }}
      })}
      else { response.send({message:"Your password hasn't been set yet, contact Admin"})}

    }
    else {
      response.send({message: "Username does not exist"})
    }
  })
})


/*
  --------------------------- ABSTRACTS ROUTE -------------------------
receives up to 4 arguments:
  t 
  Values:
    <teacher's name>, will return abstracts belonging to that specific teacher
    if undefined or "" will return all teachers' abstracts
  p
  Values:
   <Pacient's name>, used to return abstracts for an specific pacient
   if undefined or "" will return all pacients' abstracts
  s
  Values:
    1, includes abstracts made by students
    <anything else>, returns abstracts only for teachers
  sN
  Values:
   <student's name> will return abstract for an specific student
   if undefined or "" will return all students' abstracts

  All of the above could be combine to refine the abstracts set returned.
  If called with no parameters, will return all abstracts created by teachers.
*/

server.get("/abstracts", async (request, response) => 
{
  let {t, p, s, sn }=request.query
  console.log("me pidieron esto") 
  console.log(request.query)
   console.log(t+"-"+p+"-"+s+"-"+sn)
  if(t===undefined)t=""
  if(p===undefined)p=""
  if(s!=='1')s=0;
  if(sn===undefined)sn=""
  console.log(t+"-"+p+"-"+s+"-"+sn)
  await sql.dbConn(abstractsQry(t,p,s===0?false:true,sn),"slcv3") //call dbConn() to execute query using query and db passed
  .then((result)=>{
        abs=[]      // array holding all abstracts returned
        ab= {}      // obj to hold an abstract data
        consult={}  // obj to accummulate consultation occurrences
        cons={}     // stores data fields for each consultation occurrence
        provider={} // obj to accummulate provider occurrences
        prov= {}    // stores data fields for each provider occurrence
        diagnosis={}// obj to accummulate diagnosis occurrences
        diag= {}    // stores data fields for each diagnosis occurrence
        intervention={} // obj to accummulate intervention occurrences
        interv={}   // stores data fields for each intervention occurrence
        cOcc=null   // used to write number of consultation occurrence
        pOcc=null   // used to write number of provider occurrence
        dOcc=null   // used to write number of diagnosis occurrence
        iOcc=null   // used to write number of intervention occurrence
        first=false // flag to know if first record belonging to a unique abstract has been completely read

        result.forEach(e=>  // loop through all records (rows) returned by sql query
        {
          abrep=false // flag for records containing repeated abstract data
          crep=false  // flag for records containing repeated consult data
          prep=false  // flag for records containing repeated provider data
          drep=false  // flag for records containing repeated diagnosis data
          irep=false  // flat for records containing repeated intervention data

          for (prop in e)   // loop through all fields (columns) returned by sql query
          {
            if(ab['zzAbstractLink']!=='' && first)
              if(ab['zzAbstractLink']===e['zzAbstractLink']) // is this record related to previous one?
                abrep=true
              else      // this record belongs to a different abstract
                {
                  if(Object.keys(consult).length>0){ab['Consult']=consult}
                  if(Object.keys(provider).length>0){ab['Provider']=provider}
                  if(Object.keys(diagnosis).length>0){ab['Diagnosis']=diagnosis}
                  if(Object.keys(intervention).length>0){ab['Intervention']=intervention}
                  abs.push(ab)    // insert the previous abstract into the final array to be returned
                                  // and reset all objects to build next abstract
                  ab=new Object
                  consult=new Object
                  provider=new Object
                  diagnosis=new Object
                  intervention=new Object
                  abrep=false
                  first=false             
                }
            // ----------- dealing with dates ---------------
            // can't understand yet why if I use field as date type I get 1 day before
            // instead dates are handled as strings
       
            if(prop.includes('Date') && e[prop]!==null)
            {
               e[prop]=e[prop].toISOString()
              if(prop.includes('Birth'))
              {
                e[prop]=e[prop].substring(0,10).replaceAll('-','/')
              }
              else
              {
                e[prop]=e[prop].substring(5,10).replaceAll('-','/')
              }
            }


            switch (true)   // store the subsection data in the right place
            {
              case (prop.startsWith('Consult')===true):
                if(prop==='ConsultOccurrence'&& e[prop] in consult)
                  crep=true
                if(!crep && e[prop]!==null)
                  prop==='ConsultOccurrence'? cOcc=e[prop]: ab[prop+"-"+cOcc]=e[prop]              
              break
              case (prop.startsWith('Provider')===true):
                if(prop==='ProviderOccurrence'&& e[prop] in provider)
                  prep=true
                if(!prep && e[prop]!==null)
                    prop==='ProviderOccurrence'? pOcc=e[prop]: ab[prop+"-"+pOcc]=e[prop]           
              break
              case (prop.startsWith('Diagnosis')===true||prop.startsWith('diagnosis')===true):
                if(prop==='DiagnosisOccurrence'&& e[prop] in diagnosis)
                  drep=true
                if(!drep && e[prop]!==null)
                  prop==='DiagnosisOccurrence'? dOcc=e[prop]: ab[prop+"-"+dOcc]=e[prop]
                break
              case (prop.startsWith('Interv')===true):
                if(prop==='InterventionOccurrence'&& e[prop] in intervention)
                  irep=true
                if(!irep && e[prop]!==null)
                 prop==='InterventionOccurrence'? iOcc=e[prop] : ab[prop+"-"+iOcc]=e[prop]
                break
              default:
                if(!abrep && e[prop]!==null)
                  ab[prop]=e[prop]
              break 
            }
            if(prop==='AnestheticTechniqueDesc')    // finish reading the whole record?
            {
              first=true
            }
          }
        })
        abs.push(ab)  // last record from query is saved
         console.log(abs)
        response.send(abs) // API sends abstracts
  })
})