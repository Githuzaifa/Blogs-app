var express = require('express');
var router = express.Router();
const cors = require('cors');
router.use(cors());
const multer = require('multer');
const upload = multer({ dest: './public/images' });
const {stripe}  = require('./stripe');

const { connection } = require('../database/sql');

router.get('/viewrooms', (req, res) => {
    // Function to retrieve all rows from the 'users' table
    function getAllRooms(callback) {
      const selectQuery = 'SELECT * FROM Rooms';
  
      connection.query(selectQuery, (err, results) => {
        if (err) {
          console.error('Error fetching users:', err);
          return callback(err, null);
        }
  
        // Process the results into a list of JavaScript objects
        const rooms = results.map((room) => ({
          id: room.id,
          type: room.type,
          servantName: room.servant,
          servantContact:room.servantContact,
          price:room.price,
          image:room.image,
          availability:room.availability,
          description:room.description
        }));
  
        // Return the list of objects
        return callback(null, rooms);
      });
    }
  
    // Call the function to retrieve all users
    getAllRooms((err, rooms) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ error: 'Error fetching users' });
      }
  
      res.json(rooms);
    });
  });

  router.post('/bookroom', async function(req, res, next) {

    const room = req.query.room;
    const PersonName = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const arrival = req.body.arrival;
    const departure = req.body.departure;
    const children = req.body.children;
    const adults = req.body.adults;
    // Function to retrieve all rows from the 'users' table
    const insertQuery = 'INSERT INTO Bookings (room, arrival, departure, person, email, contact, children,adults) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
  
  connection.query(insertQuery, [room,arrival,departure,PersonName,email,contact,children,adults], (err, results) => {
      if (err) {
          console.error('Error inserting data:', err);
          return;
      }
      console.log('Data inserted successfully!');
      console.log('Inserted record ID:', results.role);
  })
  res.json({ message: 'Booking Request has been sent!' });
  try {
    const paymentIntent = await stripeIntegration.createPaymentIntent(1000, 'usd'); // Amount in cents
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    
  }
  }
  );

  module.exports = router;
