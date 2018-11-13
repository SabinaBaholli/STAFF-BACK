var jwt = require('../jwt.js');
var fs = require('fs');

module.exports = {

    getUsers: (req, res) => {
        let query = "SELECT * FROM user"
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(result);
          });
    },

    getUserById: (req, res) => {
        let userId = req.params.id;
        let query = "SELECT * FROM user WHERE id = ?"
        db.query(query, userId, function (err, result) {
            if (err) throw err;
            console.log(result);
          });
    },

    addUser: (req, res) => {

        let username = req.body.username;
        let password = req.body.password;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let left_leaves = req.body.left_leaves;
        let role = req.body.role;
        let is_active = req.body.is_active;



        // send the player's details to the database
        let query = "INSERT INTO `user` (username, password, firstName, lastName, left_leaves, role, is_active) VALUES ('" +
        username + "', '" + password + "', '" + firstName + "', '" + lastName + "', '" + left_leaves + "', '" + role + "', '" + is_active + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.send(result);
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
            console.log('Updated');
        });
    },

    deleteUser: (req, res) => {
        let userId = req.params.id;
        let deleteUserQuery = 'DELETE FROM user WHERE id = "' + userId + '"';
        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log('User Deleted');
        });
    },

    getUserLeaves: (req, res) => {
        let userId = req.params.id;
        let query = "SELECT * FROM leaves WHERE userId = ?"
        db.query(query, userId, function (err, result) {
            if (err) throw err;
            res.send(result);
          });
    },

    addLeave: (req, res) => {

        let userId = req.body.userId;
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;

        // send the player's details to the database
        let query = "INSERT INTO `leaves` (userId, startDate, endDate) VALUES ('" +
        userId + "', '" + startDate + "', '" + endDate + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log('Inserted new leave');
        });
                
    },

    login: (req, res) => {
        let username= req.body.username;
        let password = req.body.password;
        let query = "SELECT * FROM user WHERE username = ?";
        db.query(query, username, (err, result) => {
            if (err){
                return res.status(500).send(err);
            }
            else if (result.length > 0) {
                if(result[0].password == password){
                    var payload = {
                        username: result[0].username,
                        password: result[0].password
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
            }
            else{
                res.send({
                    "code":204,
                    "success":"Email does not exits"
                });
            }
        })
    }

}