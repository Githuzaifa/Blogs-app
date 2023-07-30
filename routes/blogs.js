var express = require('express');
var router = express.Router();
const multer = require('multer');
const cors = require('cors');
router.use(cors());

const { connection } = require('../database/sql');


const upload = multer({ dest: './public/images' });


router.post('/add', upload.single('blogImage'), function(req, res, next) {
    // Retrieve the data from the form
    const Content = req.query.data;
    // Get the file information if an image was uploaded
    const imageFile = req.file.filename;

    // Create the SQL query to insert data into the database, including the image file name
    const insertQuery = `INSERT INTO Blogs (content, image) VALUES (?, ?)`;

    // Execute the query with the form data as parameters, including the image file name
    connection.query(insertQuery, [Content, imageFile], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).send("Error inserting data into the database.");
        }

        // If the data was inserted successfully, you can redirect to another page or render a success message.
        console.log("Data inserted successfully:", result);
        res.render('index', { title: 'Express', successMessage: 'Data added successfully!' });
    });
});

router.get('/view', (req, res) => {
    // Function to retrieve all rows from the 'users' table
    function getAllBlogs(callback) {
      const selectQuery = 'SELECT * FROM Blogs';
  
      connection.query(selectQuery, (err, results) => {
        if (err) {
          console.error('Error fetching users:', err);
          return callback(err, null);
        }
  
        // Process the results into a list of JavaScript objects
        const blogs = results.map((blog) => ({
          id: blog.id,
          content: blog.content,
          image: blog.image,
        }));
  
        // Return the list of objects
        return callback(null, blogs);
      });
    }
  
    // Call the function to retrieve all users
    getAllBlogs((err, blogs) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ error: 'Error fetching users' });
      }
  
      res.json(blogs);
    });
  });

module.exports = router;
