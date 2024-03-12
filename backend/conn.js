
const dbConn = (myQry, dbName) => {
  const Connection = require('tedious').Connection;
  const config = {
    server: "DGEBU",    // server name
    authentication: {
      type: "default",         // if we use windows authentication on sql server u need this
      //--port:1433
      options: {
        userName: "dgebu",
        password: "123",
        domain: "WORKGROUP"    //this should be changed to your laptop name while u r not on the slc domain

      }
    },
    options:{
      database: dbName,
      trustServerCertificate: true,
      port:1433
        }
  }

  const conn = new Connection(config);

  //-------------- CONNECTS AND EXECUTES SQL QUERY ----------------------
  var Request = require('tedious').Request;
  var TYPES = require('tedious').TYPES;
  console.log(myQry)
  return new Promise((worked, didnotwork) => {
    conn.connect((err) => {
      if (err) { didnotwork(err) }
      else {
        var result = []
        const request = new Request(myQry, (err) => { if (err) { console.log(err); } });


        request.on('row', function (columns) {
          var entry = {};
          columns.forEach((column => {
            entry[column.metadata.colName] = column.value
          }))
          result.push(entry);
        });
        request.on('error', error => didnotwork(error));
        request.on('done', () => { worked(result); conn.close(); });
        request.on('requestCompleted', () => { worked(result); conn.close(); });
        conn.execSql(request);

      }
    })
  })
}
module.exports = { dbConn }
