/* 
  dbConn needs 2 arguments:
  - the sql query
  - db name ( added because we're working with 2 different db's
              SCLV3 - the one containing data from med2020
              DEVELOPMENT_USERCRED - to store app usercreds and
                                     groups created by teachers )

  
*/
const dbConn = (myQry, dbName) => {
  const Connection = require("tedious").Connection;
  const config = {
    // server: "192.168.110.128",    // server ip
    server: "localhost", // server name
    authentication: {
      type: "default", // if we use windows authentication on sql server u need this
      options: {
        userName: "dax",
        password: "123",
        //domain: "desktop-nk9iigj", //this should be changed to your laptop name while u r not on the slc domain
      },
    },
    options: {
      database: dbName,
      trustServerCertificate: true,
      port: 1433,
    },
  };

  /***************************************************************************************
   * If any issues connecting to sql server using windows authentication,
   * this is the alternative to go, you just need to make sure that:
   *
   *      - you enable SQL authentication in your sql server instance.
   *      - have created a user/password on sql server
   *      - grant that user rights to access the database you're working with
   *      - enable tcp/ip protocol to allow connections ( use sqls config manager)
   *
   * *************************************************************************************/
  /*

  const config = {
    server: "<your local sql server name>",    // server name
    authentication: {
      type: "default",                      // when using sql authentication this is the good one
      options: {
        userName: "<your sql username>",
        password: "<your sql password>",
        domain: "<your computer domain>"    //this should be changed to your laptop name while u r not on the slc domain

      }
    },
    options:{
      database: dbName,
      trustServerCertificate: true,
      port:1433                             // if using sql authentication u'll need to specify the port
        }
  }
 *******************************************************************************************/

  const conn = new Connection(config);

  //-------------- CONNECTS AND EXECUTES SQL QUERY ----------------------
  var Request = require("tedious").Request;
  var TYPES = require("tedious").TYPES;
  //console.log(myQry)
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
