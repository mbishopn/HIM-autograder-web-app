const Connection = require('tedious').Connection;

const config = {

    server: "med2020db001.sl.on.ca",    // server name
    authentication: {
      type: "ntlm",         // if we use windows authentication on sql server u need this
      options: {
        userName: "admin",
        password:"123",
        domain:"desktop-nk9iigj"    //this should be changed to your laptop name while u r not on the slc domain
      }
    },
    options: {
      database:"SLCV3",
      trustServerCertificate: true,
    }
}

const connection= new Connection(config);


connection.on('connect',(err)=>{
if(err){
    console.log("valio chorizo")
    console.log(err)
}
else{executeStatement();}
})

connection.connect();

var Request=require('tedious').Request;
var TYPES=require('tedious').TYPES;

function executeStatement(){
    console.log("conectado")
    var request = new Request("SELECT top(10) * from v_userprofile ;", (err) => {  
      if (err) {  
          console.log(err);}  
      });  
      var result = "";  
      request.on('row', (columns) => {  
          columns.forEach((column)=> {  
            if (column.value === null) {  
              console.log('NULL');  
            } else {  
              result+= column.value + " ";  
            }  
          });  
          console.log(result);  
          result ="";  
      });  

      request.on('done', function(rowCount, more) {  
      console.log(rowCount + ' rows returned');  
      });  
      
      // Close the connection after the final event emitted by the request, after the callback passes
      request.on("requestCompleted", (rowCount, more)=> {
          connection.close();
      });
      connection.execSql(request);
}