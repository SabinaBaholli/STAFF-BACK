
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs')
const expressJwt = require('express-jwt');

var publicKEY  = fs.readFileSync('./public.key', 'utf8');  


const checkIfAuthenticated = expressJwt({
    secret: publicKEY
}); 


const dbConfig = require('./db-config.json');

var db = mysql.createConnection(dbConfig);
const app = express();
const {addUser, updateUser, deleteUser, getUsers, getUserById, getUserLeaves, updateLeave, addLeave,getLeaveRequests, deleteLeave, login} = require('./routes/index');
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
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.set('port', process.env.port || port);

app.route('/users')
  .get(checkIfAuthenticated, getUsers)
  .post(addUser)
  .put(updateUser)

app.route('/users/:id')
  .get(getUserById)
  .delete(checkIfAuthenticated, deleteUser)

app.route('/leaves/:id')
  .get(checkIfAuthenticated, getUserLeaves)
  .delete(checkIfAuthenticated, deleteLeave)
  
app.route('/leaves')
  .post(addLeave)
  .put(updateLeave)

app.route('/leaveRequests')
  .get(getLeaveRequests)

app.post('/login',login)

