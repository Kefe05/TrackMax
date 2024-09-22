const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const bcryptjs = require('bcryptjs');

const app = express();

app.use(express.static(path.join(__dirname, "src")));
app.use(cors());
app.use(express.json());

const port = 5000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: "root",
  password: "$Kingswrld05",
  database: "TrackMax"
});

app.get('/', (req, res) => {
  const query = 'SELECT username FROM TrackMax.users';

  connection.query(query, (err, result) => {
    if (err) {
      return res.json({ message: 'Something unexpected has occurred: ' + err });
    }
    return res.json(result);
  });
});
app.get('/productivity-tracker', (req, res) => {
  const query = 'SELECT * FROM TrackMax.task';

  connection.query(query, (err, result) => {
    if (err) {
      return res.json({ message: 'Something unexpected has occurred: ' + err });
    }
    return res.json(result);
  });
});

app.delete('/deleteTask/:id', (req, res) => {
  const sql = 'DELETE FROM TrackMax.task WHERE id = ?'; // Remove `*` from DELETE
  const value = [req.params.id]; // Extract id from URL parameters

  connection.query(sql, value, (err, result) => {
    if (err) return res.json({ message: 'Something unexpected has occurred: ' + err });
    
    return res.json({ success: "User Task Deleted Successfully" });  
  });
});



app.post('/login', (req, res) => {
  const sql = "SELECT * FROM TrackMax.users WHERE username = ? AND userPassword = ?"
  
  const hashedPassword = bcryptjs.hashSync(req.body.password, 8);

  const values = [
    req.body.username,
    hashedPassword
  ]

  connection.query(sql, values, (err, result) => {
    if (err) return res.json({ message: 'Something unexpected has occurred: ' + err });
    
    return res.json({ success: "User added successfully" });  
  });


})
app.get('/', (req, res) => {
  const sql = 'SELECT username FROM TrackMax.users';
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Something unexpected has occurred: ' + err.message });
    }
    res.json(result);
  });
});


app.post('/register', (req, res) => { // Corrected order: (req, res)
   const sql = "INSERT INTO TrackMax.users(name, username, email, UserPassword) VALUES (?, ?, ?, ?)"; // Adjust query for multiple values
   
   // Hash the password before inserting it into the database
   const hashedPassword = bcryptjs.hashSync(req.body.password, 8); // Synchronous password hashing with bcryptjs

   const values = [
     req.body.name,
     req.body.username,
     req.body.email,
     hashedPassword, // Save the hashed password instead of plain text
   ];

   connection.query(sql, values, (err, result) => {
     if (err) return res.json({ message: 'Something unexpected has occurred: ' + err });
     return res.json({ success: "User added successfully" });  
   });
   
});

app.post('/addTask', (req, res) => { // Corrected order: (req, res)
  const sql = "INSERT INTO TrackMax.task(name, details, dueDate) VALUES (?, ?, ?)"; // Adjust query for multiple values
 
  const values = [
    req.body.name,
    req.body.details,
    req.body.dueDate,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) return res.json({ message: 'Something unexpected has occurred: ' + err });
    return res.json({ success: "New Task added successfully" });  
  });
  
});

app.post('/', (req, res) => { // Corrected order: (req, res)
  const sql = "INSERT INTO TrackMax.task(name, details, dueDate) VALUES (?, ?, ?)"; // Adjust query for multiple values
 
  const values = [
    req.body.name,
    req.body.details,
    req.body.dueDate,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) return res.json({ message: 'Something unexpected has occurred: ' + err });
    return res.json({ success: "New Task added successfully" });  
  });
  
});

connection.connect((err) => {
  if (err) console.log(err);
  console.log('Connected Successfully');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
