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
const { abstractsqry } = require("./queries");
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());




// ---------- LISTENING APP REQUESTS -----------------
server.listen(port, () => {
  console.log(`Listening on ${port}...\nConnected to DB`);
})

// ------------- NOTHING --------------------
server.get("/", (request, response) => {
  response.send("LIVE!");
});

//------------------ RETURNS USERNAMES FOR LOGIN
server.get("/users", async (request, response) => {
await sql.dbConn("select distinct codernumberdesc from i10_amcare_vr where codernumber='100719';","slcv3")
 .then((result)=>{
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

//------------------ get absctracts
//--- this route receives 2 args: 
// OWNER, which could be:
//--- teacher's name ( this will return all abstracts for specified teacher)
//--- all teachers (will return all tearcher's abstracts)
//--- teacher's name 
// ISTU, which could be:
//--- true, to include all teacher's students abstracts. ( for auto-grader feature)
//--- false, only teacher's abstracts ( for modifying marking )
server.get("/abstracts", async (request, response) => {

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
        // {
        //     ab[prop]=e[prop]
        // }
        // else
        // {
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
            //   }
            // else
            // {
            //   abs.push(ab)
            //   prov={}
            //   provArr=[]
            //   ab={}
            // }
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
        }
        // }
      }

          // conArr.push(ob)
        //  abs.push(ab)
      })
 
      console.log(abs)
      response.send(abs)
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


