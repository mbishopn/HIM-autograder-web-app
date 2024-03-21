const express = require("express");
const { request, response } = require("http");
const server = express();

const cors = require("cors");
require("dotenv/config");
const port = 3000;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// import dbConn from ('./conn')
const sql=require('./conn');
const { abstractsQry,studentsQry,usersQry } = require("./queries");
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());




// ---------- LISTENING APP REQUESTS -----------------
server.listen(port, () => {
  console.log(`Listening on ${port}...\nConnected to DB`);
})

// ------------- DEFAULT ROUTE, JUST TO CHECK API IS ALIVE --------------------
server.get("/", (request, response) => {
  response.send("LIVE!");
});

//------------------ USERS ROUTE (TEACHERS NAMES) ------------------------------
// right now I'm using this but we should change to get usernames from our db
server.get("/users", async (request, response) => {
const result = await sql.dbConn(usersQry(),"slcv3")
.then((result)=>{
  console.log(result)
  response.send(result)
})
});

//------------------ STUDENTS ROUTE -----------------------------------
server.get("/students", async (request, response) => {
  await sql.dbConn(studentsQry(),"slcv3")
   .then((result)=>{
    console.log("caquita")
    console.log(result)
    response.send(result)
  })
  });

//--------------------- user registration post

server.post("/updatePassword", async (request, response) => {
  await sql.dbConn("update users set userPassword='"+generateHash(request.body.password)+"' where user=`{request.boy.username}`","development_usercred")
  .then((result)=>{
  // const newUser = new User({
  //   username: request.body.username,
  // });
  // newUser.password = newUser.generateHash(request.body.password);
  // const saveUser = await newUser.save();
   result
    ? response.send("Password has been updated")
    : response.send("Failed to update password");
  })
});

//--------------- USER VERIFICATION POST - login

server.post("/login", async (request, response) => {
  const { username, password } = request.body;
  console.log(username)
  //const jwtToken = jwt.sign({id: username}, "token")
  await sql.dbConn("select user,userpassword from users where username='"+username+"'","development_usercred")
  //await User.findOne({ username }).then((user) => {
  .then((user)=>{
    
    //console.log(user)
    if (user.length!==0) {
      // bcrypt.compare(password, user.password, (err, res) => {
      //   if (err) {
      //     response.send(err);
      //   }
        // if (res) {
        console.log(user)
         response.send({message: "Successful Login", token: "jwtToken"});
        // } else {
          // response.send({message: "Bad username or password"});
      //   }
      // });

    }
    else {
      response.send({message: "Username does not exist"})
    }
  })
});


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
            {       // save any occurrences in subsections objects
              // if(!crep && cOcc!==null)
              // {consult[cOcc]=cons;cons=new Object;cOcc=null}
              // if(!prep && pOcc!==null)
              // {provider[pOcc]=prov;prov=new Object;pOcc=null}
              // if(!drep && dOcc!==null)
              // {diagnosis[dOcc]=diag;diag=new Object;dOcc=null}
              // if(!irep && iOcc!==null)
              // {intervention[iOcc]=interv;interv=new Object;iOcc=null}
              first=true
            }
          }
        })
        // if(Object.keys(consult).length>0){ab['Consult']=consult}
        // if(Object.keys(provider).length>0){ab['Provider']=provider}
        // if(Object.keys(diagnosis).length>0){ab['Diagnosis']=diagnosis}
        // if(Object.keys(intervention).length>0){ab['Intervention']=intervention}
        abs.push(ab)  // last record from query is saved
         console.log(abs)
        response.send(abs) // API sends abstracts
  })
});

server.post("/submitProduct", async (request, response) => {
  const productData = ({ id, productName, brand, quantity, image, price } =
    request.body);
  const newProduct = new Product(productData)
  const saveProduct = await newProduct.save()
  if (saveProduct) {
    response.send("Product successfully Added")
    console.log("Product succesfully added...")
  } else {
    response.send("Failed!!!")
    console.log("Addition failed!!")
  }
});

server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  const deleteProduct = await Product.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  }); //change the id from string to object id to be used by mongoDB
  deleteProduct ? response.send("Product Deleted") : response.send("FAILED!!");
});

server.patch("/products/:_id", async (request, response) => {
  const { _id } = request.params;
  const product = request.body;
  console.log(product)
 // console.log(id)
  console.log(_id)
  const patchProduct = await Product.updateOne(
    { _id: new mongoose.Types.ObjectId(_id) },
    { $set: product }
  );
  patchProduct
    ? response.send(`${product.productName} product is edited`)
    : response.send("Failed to edit");
});


