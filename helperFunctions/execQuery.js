const connection = require('../models/connection');

module.exports = promisedQuery = (sqlString, queryInput=null) =>
new Promise((resolve, reject) => {
  connection.query(sqlString, queryInput, (error, result) => {
    if (error) {
      reject(error);
    }
    resolve(result);
  });
});
