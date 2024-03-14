const express = require("express");
const { request, response } = require("http");
const server = express();

const cors = require("cors");
require("dotenv/config");
const port = 3000;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// import dbConn from ('./conn')
<<<<<<< HEAD
const sql=require('./conn');
=======
const sql = require("./conn");
>>>>>>> c69ef8122e728178a9d67553df7e1a0d789cd230
const { abstractsqry } = require("./queries");
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

<<<<<<< HEAD



// ---------- LISTENING APP REQUESTS -----------------
server.listen(port, () => {
  console.log(`Listening on ${port}...\nConnected to DB`);
})
=======
// ---------- LISTENING APP REQUESTS -----------------
server.listen(port, () => {
  console.log(`Listening on ${port}...\nConnected to DB`);
});
>>>>>>> c69ef8122e728178a9d67553df7e1a0d789cd230

// ------------- NOTHING --------------------
server.get("/", (request, response) => {
  response.send("LIVE!");
});

//------------------ RETURNS USERNAMES FOR LOGIN
server.get("/users", async (request, response) => {
<<<<<<< HEAD
await sql.dbConn("select distinct codernumberdesc from i10_amcare_vr where codernumber='100719';","slcv3")
 .then((result)=>{
  console.log(result)
  response.send(result)
})
=======
  await sql
    .dbConn("select * from users;", "development_usercred")
    .then((result) => {
      console.log(result);
      response.send(result);
    });
>>>>>>> c69ef8122e728178a9d67553df7e1a0d789cd230
});

//--------------------- user registration post

server.post("/updatePassword", async (request, response) => {
<<<<<<< HEAD
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
=======
  await sql
    .dbConn(
      "update users set userPassword='" +
        generateHash(request.body.password) +
        "' where user=`{request.boy.username}`",
      "development_usercred"
    )
    .then((result) => {
      // const newUser = new User({
      //   username: request.body.username,
      // });
      // newUser.password = newUser.generateHash(request.body.password);
      // const saveUser = await newUser.save();
      result
        ? response.send("Password has been updated")
        : response.send("Failed to update password");
    });
>>>>>>> c69ef8122e728178a9d67553df7e1a0d789cd230
});

//--------------- USER VERIFICATION POST - login

server.post("/login", async (request, response) => {
  const { username, password } = request.body;
<<<<<<< HEAD
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

//------------------ get absctracts
//--- this route receives 2 args: 
// OWNER, which could be:
//--- teacher's name ( this will return all abstracts for specified teacher)
//--- all teachers (will return all tearcher's abstracts)
//--- teacher's name 
=======
  console.log(username);
  //const jwtToken = jwt.sign({id: username}, "token")
  await sql
    .dbConn(
      "select user,userpassword from users where username='" + username + "'",
      "development_usercred"
    )
    //await User.findOne({ username }).then((user) => {
    .then((user) => {
      //console.log(user)
      if (user.length !== 0) {
        // bcrypt.compare(password, user.password, (err, res) => {
        //   if (err) {
        //     response.send(err);
        //   }
        // if (res) {
        console.log(user);
        response.send({ message: "Successful Login", token: "jwtToken" });
        // } else {
        // response.send({message: "Bad username or password"});
        //   }
        // });
      } else {
        response.send({ message: "Username does not exist" });
      }
    });
});

//------------------ get absctracts
//--- this route receives 2 args:
// OWNER, which could be:
//--- teacher's name ( this will return all abstracts for specified teacher)
//--- all teachers (will return all tearcher's abstracts)
//--- teacher's name
>>>>>>> c69ef8122e728178a9d67553df7e1a0d789cd230
// ISTU, which could be:
//--- true, to include all teacher's students abstracts. ( for auto-grader feature)
//--- false, only teacher's abstracts ( for modifying marking )
server.get("/abstracts", async (request, response) => {
<<<<<<< HEAD

  await sql.dbConn(abstractsqry("","kirk, paula",false))
  .then((result)=>
  {
    //console.log(result)
    abs=[]
    ab= {}
    provArr=[]
    prov= {}
    diagArr= []
    diag= {}
    intervArr=[]
    interv={}
    result.forEach(e=>{

      for (prop in e)
      {
         //if(prop==='zzAbstractLink'&&ab[prop]!==e[prop])
=======
  await sql.dbConn(abstractsqry("", "kirk, paula", false)).then((result) => {
    //console.log(result)
    abs = [];
    ab = {};
    provArr = [];
    prov = {};
    diagArr = [];
    diag = {};
    intervArr = [];
    interv = {};
    result.forEach((e) => {
      for (prop in e) {
        //if(prop==='zzAbstractLink'&&ab[prop]!==e[prop])
>>>>>>> c69ef8122e728178a9d67553df7e1a0d789cd230
        // {
        //     ab[prop]=e[prop]
        // }
        // else
        // {
<<<<<<< HEAD
        switch (true)
        {
          case (prop.startsWith('Provider')===true):
            prov[prop]=e[prop]
            // console.log("prov")
            break
          case ((prop.startsWith('diagnos')===true || prop.startsWith('Diagnos'===true))):
              diag[prop]=e[prop]
            //console.log("diag")

            // ab['Diagnosis']
            break
          case (prop.startsWith('Interv')===true):
            interv[prop]=e[prop]
            console.log("interv")
            // ab['Intervention']
            break
          default:
            // if(ab[prop]===e[prop])
            //   {
                ab[prop]=e[prop]
=======
        switch (true) {
          case prop.startsWith("Provider") === true:
            prov[prop] = e[prop];
            // console.log("prov")
            break;
          case prop.startsWith("diagnos") === true ||
            prop.startsWith("Diagnos" === true):
            diag[prop] = e[prop];
            //console.log("diag")

            // ab['Diagnosis']
            break;
          case prop.startsWith("Interv") === true:
            interv[prop] = e[prop];
            console.log("interv");
            // ab['Intervention']
            break;
          default:
            // if(ab[prop]===e[prop])
            //   {
            ab[prop] = e[prop];
>>>>>>> c69ef8122e728178a9d67553df7e1a0d789cd230
            //   }
            // else
            // {
            //   abs.push(ab)
            //   prov={}
            //   provArr=[]
            //   ab={}
            // }
<<<<<<< HEAD
          break 
        }
        if(prop==='AnestheticTechniqueDesc')
        {

          provArr.push(prov)
          diagArr.push(diag)
          intervArr.push(interv)
          ab['prov']=provArr
          ab['diag']=diagArr
          ab['interv']=intervArr
          abs.push(ab)
          prov={}
          diag={}
          interv={}
=======
            break;
        }
        if (prop === "AnestheticTechniqueDesc") {
          provArr.push(prov);
          diagArr.push(diag);
          intervArr.push(interv);
          ab["prov"] = provArr;
          ab["diag"] = diagArr;
          ab["interv"] = intervArr;
          abs.push(ab);
          prov = {};
          diag = {};
          interv = {};
>>>>>>> c69ef8122e728178a9d67553df7e1a0d789cd230
        }
        // }
      }

<<<<<<< HEAD
          // conArr.push(ob)
        //  abs.push(ab)
      })
 
      console.log(abs)
      response.send(abs)
  })

=======
      // conArr.push(ob)
      //  abs.push(ab)
    });

    console.log(abs);
    response.send(abs);
  });
>>>>>>> c69ef8122e728178a9d67553df7e1a0d789cd230
});

server.post("/submitProduct", async (request, response) => {
  const productData = ({ id, productName, brand, quantity, image, price } =
    request.body);
<<<<<<< HEAD
  const newProduct = new Product(productData)
  const saveProduct = await newProduct.save()
  if (saveProduct) {
    response.send("Product successfully Added")
    console.log("Product succesfully added...")
  } else {
    response.send("Failed!!!")
    console.log("Addition failed!!")
=======
  const newProduct = new Product(productData);
  const saveProduct = await newProduct.save();
  if (saveProduct) {
    response.send("Product successfully Added");
    console.log("Product succesfully added...");
  } else {
    response.send("Failed!!!");
    console.log("Addition failed!!");
>>>>>>> c69ef8122e728178a9d67553df7e1a0d789cd230
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
<<<<<<< HEAD
  console.log(product)
 // console.log(id)
  console.log(_id)
=======
  console.log(product);
  // console.log(id)
  console.log(_id);
>>>>>>> c69ef8122e728178a9d67553df7e1a0d789cd230
  const patchProduct = await Product.updateOne(
    { _id: new mongoose.Types.ObjectId(_id) },
    { $set: product }
  );
  patchProduct
    ? response.send(`${product.productName} product is edited`)
    : response.send("Failed to edit");
});
<<<<<<< HEAD


=======
>>>>>>> c69ef8122e728178a9d67553df7e1a0d789cd230
