var mysql = require("mysql");
const config = require("./config.json");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize({
//   // The "host" parameter is required for other databases.
//   // host: 'localhost'
//   dialect: 'mysql',
//   storage: 'rds-mysql-training.cqxztarevjfc.ap-south-1.rds.amazonaws.com'
// })

var pool = mysql.createPool({
  host: config.dbhost,
  user: config.dbuser,
  password: config.dbpassword,
  database: config.dbname,
});

// const sequelize = new Sequelize("rds-mysql-training.cqxztarevjfc.ap-south-1.rds.amazonaws.com")

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

pool.getConnection(function (err, connection) {
  if (err) throw err; // not connected!

  // Use the connection
  connection.query(
    "SELECT emp_name FROM Employee where emp_id=1",
    function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();

      // Handle error after the release.
      if (error) throw error;
      else console.log(results[0].emp_name);

      process.exit();

      // Don't use the connection here, it has been returned to the pool.
    }
  );
});
