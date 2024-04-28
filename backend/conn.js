
const dbConn= (myQry, dbName)=>
{
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
      database:dbName,
      trustServerCertificate: true,
    }
  }

  const conn= new Connection(config);

  //-------------- CONNECTS AND EXECUTES SQL QUERY ----------------------
  var Request=require('tedious').Request;
  var TYPES=require('tedious').TYPES;
  console.log(myQry)
  return new Promise((jala, nojala)=>
  {
    conn.connect( (err)=>
    {
      if (err){nopo(err)}
      else 
      {
        var result=[]
          const request=new Request(myQry, (err) => {      if (err) { console.log(err);}       });
            request.on('row', function(columns)
            { 
              var entry={};
              columns.forEach((column=>
              {
                entry[column.metadata.colName]=column.value
              }))
              result.push(entry) ; 
            });
            request.on('error',error=>nojala(error));
            request.on('done', ()=>{jala(result);conn.close(); });
            request.on('requestCompleted', ()=>{jala(result);conn.close(); });
            conn.execSql(request);
      }
    })
  })
}
    module.exports = {dbConn}
