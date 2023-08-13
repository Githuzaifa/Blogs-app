var express = require('express');
var router = express.Router();
const cors = require('cors');
router.use(cors());

const { connection } = require('../database/sql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/view', (req, res) => {
  // Function to retrieve all rows from the 'users' table

  function getAllUsers(callback) {
    const selectQuery = 'SELECT * FROM Users';

    connection.query(selectQuery, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        return callback(err, null);
      }

      // Process the results into a list of JavaScript objects
      const users = results.map((user) => ({
        id: user.id,
        email: user.email,
        password: user.password,
        role:user.role
      }));

      // Return the list of objects
      return callback(null, users);
    });
  }


  // Call the function to retrieve all users
  getAllUsers((err, users) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Error fetching users' });
    }

    res.json(users);
  });
});

router.post('/add', (req, res) => {

  const mail = req.body.mail;
  const pwd = req.body.pwd;
  const role = req.body.user;
  // Function to retrieve all rows from the 'users' table
  const insertQuery = 'INSERT INTO Users (email, password, role) VALUES (?, ?, ?)';

connection.query(insertQuery, [mail,pwd,role], (err, results) => {
    if (err) {
        console.error('Error inserting data:', err);
        return;
    }
    console.log('Data inserted successfully!');
    console.log('Inserted record ID:', results.role);
})
res.json({ message: 'Data inserted successfully!' });
}
);
module.exports = router;
