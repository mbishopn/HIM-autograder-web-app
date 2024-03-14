<<<<<<< Updated upstream
const Connection = require('tedious').Connection;

const config = {

    server: "med2020db001.sl.on.ca",    // server name
=======
const dbConn = (myQry, dbName) => {
  const Connection = require("tedious").Connection;
  const config = {
    server: "localhost", // server name
    trustServerCertificate: true,
>>>>>>> Stashed changes
    authentication: {
      trustServerCertificate: true,
      type: "ntlm", // if we use windows authentication on sql server u need this
      options: {
        trustServerCertificate: true,
        trustedConnection: true,
        encrypt: true,
        userName: "daksh",
        password: "1207",
        domain: "dax", //this should be changed to your laptop name while u r not on the slc domain
      },
    },
    options: {
<<<<<<< Updated upstream
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
=======
      database: dbName,
      trustServerCertificate: true,
      encrypt: true,
    },
  };

  const conn = new Connection(config);

  //-------------- CONNECTS AND EXECUTES SQL QUERY ----------------------
  var Request = require("tedious").Request;
  var TYPES = require("tedious").TYPES;
  console.log(myQry);

  return new Promise((jala, nojala) => {
    conn.connect((err) => {
      if (err) {
        nojala(err);
      } else {
        var result = [];
        const request = new Request(myQry, (err) => {
          if (err) {
            console.log(err);
          }
        });

        request.on("row", function (columns) {
          var entry = {};
          columns.forEach((column) => {
            entry[column.metadata.colName] = column.value;
          });
          result.push(entry);
        });
        request.on("error", (error) => nojala(error));
        request.on("done", () => {
          jala(result);
          conn.close();
        });
        request.on("requestCompleted", () => {
          jala(result);
          conn.close();
        });
        conn.execSql(request);
      }
    });
  });
};
module.exports = { dbConn };
>>>>>>> Stashed changes
