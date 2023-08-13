var express = require('express');
var router = express.Router();
const cors = require('cors');
router.use(cors());
const multer = require('multer');
const upload = multer({ dest: './public/images' });
const nodemailer = require('nodemailer');


router.get('/approve/:id', (req, res) => {
  
  const bookingId = req.params.id;


const newValue = '1'; 

// Define your SQL query to update the row
const query = `UPDATE Bookings SET approved = ? WHERE id = ?`;

// Execute the query
connection.query(query, [newValue, bookingId], (error, results) => {
  if (error) {
    console.error('Error:', error);
  } else {
    if (results.affectedRows > 0) {
      console.log(`Row with ID ${bookingId} updated successfully.`);
    } else {
      console.log(`No rows were updated for the given ID.`);
    }
  }

  const q = `SELECT * FROM Bookings WHERE id = ?`;

  var email = "";
  var room = "";
// Execute the query
connection.query(q, [bookingId], (error, results) => {
  if (error) {
    console.error('Error:', error);
  } else {
    if (results.length > 0) {
      email = results[0].email;
      room = results[0].room;
      console.log(`Row value for ID ${bookingId}: ${email}`);
    } else {
      console.log(`No data found for the given ID.`);
    }
  }

  // Create a transporter using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can change this to your email provider
  auth: {
    user: 'huzaifamajeed56@gmail.com',
    pass: 'yrjbzyreufssgniy',
    

  },
});

// Define email data
const mailOptions = {
  from: 'huzaifamajeed56@gmail.com',
  to: email,
  subject: 'Booking Approved!',
  text: `Your Booking request for Room number ${room} has been approved!`,
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});


  res.send(`Booking with ID ${bookingId} and email: ${email} has been approved.`);
})
})
});
router.get('/disapprove/:id', (req, res) => {
  const bookingId = req.params.id;


  const newValue = '0'; 
  
  // Define your SQL query to update the row
  const query = `UPDATE Bookings SET approved = ? WHERE id = ?`;
  
  // Execute the query
  connection.query(query, [newValue, bookingId], (error, results) => {
    if (error) {
      console.error('Error:', error);
    } else {
      if (results.affectedRows > 0) {
        console.log(`Row with ID ${bookingId} updated successfully.`);
      } else {
        console.log(`No rows were updated for the given ID.`);
      }
    }
  
    const q = `SELECT * FROM Bookings WHERE id = ?`;
  
    var email = "";
    var room = "";
  // Execute the query
  connection.query(q, [bookingId], (error, results) => {
    if (error) {
      console.error('Error:', error);
    } else {
      if (results.length > 0) {
        email = results[0].email;
        room = results[0].room;
        console.log(`Row value for ID ${bookingId}: ${email}`);
      } else {
        console.log(`No data found for the given ID.`);
      }
    }
  
    // Create a transporter using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can change this to your email provider
    auth: {
      user: 'huzaifamajeed56@gmail.com',
      pass: 'yrjbzyreufssgniy',
      
  
    },
  });
  
  // Define email data
  const mailOptions = {
    from: 'huzaifamajeed56@gmail.com',
    to: email,
    subject: 'Booking Disapproved',
    text: `Your Booking request for Room number ${room} has been disapproved due to unavailability of the room`,
  };
  
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
  })
  })
  

  res.send(`Booking with ID ${bookingId} has been disapproved.`);
});

const { connection } = require('../database/sql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/dashboard', (req, res) => {
    const queries = [
      'SELECT count(*) FROM Rooms',
      'SELECT count(*) from Rooms where availability = 0',
      'SELECT count(*) from Rooms where availability = 1',
      'SELECT count(*) from Bookings',
      'SELECT count(*) from Bookings where approved = 1',
      'SELECT count(*) from Bookings where approved = 0',
      'SELECT sum(price * DATEDIFF(departure, arrival)) from Rooms r join Bookings b on r.id = b.room'
    ];
  
    const fetchDataPromises = queries.map(query => {
      return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
          if (err) {
            reject(err);
          } else {
            const value = results[0][Object.keys(results[0])[0]];
            resolve(value);
          }
        });
      });
    });
  
    Promise.all(fetchDataPromises)
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
      });
  });
  

router.post('/addroom', upload.single('image'), function(req, res, next) {

    const type = req.body.type;
    const Servantname = req.body.name;
    const Servantcontact = req.body.contact;
    const price = req.body.price;
    const image = req.file.filename;
    const description = req.body.description;
    const availability = req.body.availability;
    // Function to retrieve all rows from the 'users' table
    const insertQuery = 'INSERT INTO Rooms (type, servant, servantContact, price, image, availability, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  connection.query(insertQuery, [type,Servantname,Servantcontact,price,image,availability,description], (err, results) => {
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
  router.get('/bookings', (req, res) => {
    // Function to retrieve all rows from the 'users' table
    function getAllBookings(callback) {
      const selectQuery = 'SELECT * FROM Bookings';
  
      connection.query(selectQuery, (err, results) => {
        if (err) {
          console.error('Error fetching users:', err);
          return callback(err, null);
        }
  
        // Process the results into a list of JavaScript objects
        const bookings = results.map((booking) => ({
          id: booking.id,
          room: booking.room,
          arrival: booking.arrival,
          departure:booking.departure,
          person:booking.person,
          email:booking.email,
          contact:booking.contact,
          children:booking.children,
          adults:booking.adults,
          approved:booking.approved
        }));
  
        // Return the list of objects
        return callback(null, bookings);
      });
    }
  
    // Call the function to retrieve all users
    getAllBookings((err, bookings) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ error: 'Error fetching users' });
      }
  
      res.json(bookings);
    });
  });
module.exports = router;
