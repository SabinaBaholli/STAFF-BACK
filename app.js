
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
 
const dbConfig = require('./db-config.json');

var db = mysql.createConnection(dbConfig);
const app = express();
const {addUser, updateUser, deleteUser, getUsers, getUserById, getUserLeaves, addLeave} = require('./routes/index');
const port = 5000;

 db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});

global.db = db;

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('port', process.env.port || port);

app.route('/users')
  .get(getUsers)
  .post(addUser)

app.route('/users/:id')
  .get(getUserById)
  .delete(deleteUser)
  .put(updateUser)

app.route('/leaves/:id')
  .get(getUserLeaves)
  .post(addLeave)


