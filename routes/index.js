module.exports = {
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
            console.log('Inserted new user');
        });
                
    },

    editUser: (req, res) => {
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

    getUsers: (req, result) => {
        db.query("SELECT * FROM user", function (err, result) {
            if (err) throw err;
            console.log(result);
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

    getUserLeaves: (req, res) => {
        let userId = req.params.id;
        let query = "SELECT * FROM leaves WHERE userId = ?"
        db.query(query, userId, function (err, result) {
            if (err) throw err;
            console.log(result);
          });
    }

}