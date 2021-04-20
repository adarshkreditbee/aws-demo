var mysql = require("mysql");
const config = require("./config.json");

var pool = mysql.createPool({
  host: config.dbhost,
  user: config.dbuser,
  password: config.dbpassword,
  database: config.dbname,
});

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!

    // Use the connection
    connection.query(
      "SELECT emp_name FROM Employee where emp_id=1",
      function (error, results, fields) {
        // When done with the connection, release it.
        connection.release();

        // Handle error after the release.
        if (error) callback(error);
        else callback(null, results[0].emp_name);

        // Don't use the connection here, it has been returned to the pool.
      }
    );
  });
};
