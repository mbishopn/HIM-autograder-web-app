const dbConn = (myQry, dbName) => {
  const Connection = require("tedious").Connection;
  const config = {
    server: "localhost", // server name
    authentication: {
      type: "default", // when using sql authentication this is the good one
      options: {
        userName: "zewais",
        password: "database123",
        // domain: "<your computer domain>", //this should be changed to your laptop name while u r not on the slc domain
      },
    },
    options: {
      database: dbName,
      trustServerCertificate: true,
      port: 1433, // if using sql authentication u'll need to specify the port
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
        nopo(err);
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
