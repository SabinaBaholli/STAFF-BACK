var jwt = require('../jwt.js');
var bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {



    getUserById: (req, res) => {
        let userId = req.params.id;
        let query = "SELECT * FROM user WHERE id = ?"
        db.query(query, userId, function (err, result) {
            if (err) throw err;
            res.send(result);
          });
    },  
    
    getUsers: (req, res) => {
        console.log('Requesting users');
        let query = "SELECT * FROM `user`";
        db.query(query, (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send(result);
          });
    },

    addUser: (req, res) => {
        let username = req.body.username;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let left_leaves = req.body.left_leaves;
        let role = req.body.role;
        let is_active = req.body.is_active;
 
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
             let query = "INSERT INTO `user` (username, password, firstName, lastName, left_leaves, role, is_active) VALUES ('" +
             username + "', '" + hash + "', '" + firstName + "', '" + lastName + "', '" + left_leaves + "', '" + role + "', '" + is_active + "')";
             db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.send(result);
            });
          });
       
    },

    updateUser: (req, res) => {
        let userId = req.params.id;
        let username = req.body.first_name;
        let password = req.body.last_name;
        let firstName = req.body.position;
        let lastName = req.body.number;
        let left_leaves = req.body.left_leaves;
        let role = req.body.left_leaves;
        let is_active = req.body.is_active;

        let query = "UPDATE `players` SET `username` = '" + username + "', `password` = '" + password + "', `firstName` = '" + firstName + "', `lastName` = '" + lastName + "', `left_leaves` ='" + left_leaves + "',  `is_active` = '" + is_active + "',  `role` = '" + role + "'  WHERE `players`.`id` = '" + userId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(result);
        });
    },

    deleteUser: (req, res) => {
        let userId = req.params.id;
        let deleteUserQuery = 'DELETE FROM user WHERE id = "' + userId + '"';
        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send({status: 200})
        });
    },

    getUserLeaves: (req, res) => {
        let userId = req.params.id;
        let query = "SELECT * FROM `leaves` WHERE userId = ?"
        db.query(query, userId,  (err, result) => {
            if (err) throw err;
            res.send(result);
          });
    },

    addLeave: (req, res) => {
        console.log(req.body)
        let userId = req.body.userId;
        let type = req.body.type;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;

        // send the player's details to the database
        let query = "INSERT INTO `leaves` (type, userId, startDate, endDate) VALUES ('" +
        type + "','" + userId + "', '" + startDate + "', '" + endDate + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(result);
        });
                
    },

    deleteLeave: (req, res) => {
        leaveId = req.params.id;
        let deleteLeaveQuery = 'DELETE FROM leaves WHERE id = "' + leaveId + '"';
        db.query(deleteLeaveQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send({status: 200})
        });
    },

    login: (req, res) => {
        let username= req.body.username;

        let query = "SELECT * FROM user WHERE username = ?";
        db.query(query, username, (err, result) => {
            if (err){
                return res.status(500).send(err);
            }
            else if (result.length > 0) {
                if (err) { throw (err); }
                bcrypt.compare(req.body.password, result[0].password, (err, same) => {
                    if(same){
                        var payload = {
                            username: result[0].username
                        }
                        $Options = {
                            subject: JSON.stringify(result[0].id)
                        }
                        var token = jwt.sign(payload, $Options);
                        res.status(200).json({
                            idToken: token, 
                            expiresIn: '2h',
                            user: result[0]
                        });
                    }
                    else{
                        return res.status(403).send(err);
                    }
            }
                
                );
            }
            else {
                return res.status(404).send(err);
            } 
        })
    }

}