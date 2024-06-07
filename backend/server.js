const express = require('express');
const bodyParser = require('body-parser'); // Import body-parser module
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL server: ' + err.stack);
    return;
  }

  console.log('Connected to MySQL server');
});

// API endpoint to execute the insertion
app.post('/insertData', (req, res) => {
  // Receive data from the request body
  const newData = req.body;

  // Insert data into a table
  connection.query('INSERT INTO your_table_name SET ?', newData, (err, results) => {
    if (err) {
      console.error('Error inserting data: ' + err.stack);
      res.status(500).send('Error inserting data');
      return;
    }

    console.log('Inserted data successfully');
    res.send('Inserted data successfully');
  });
});

app.get('/dbStatus', (req, res) => {
  if (connection.state === 'authenticated') {
    res.send('Database connection is active');
  } else {
    res.status(500).send('Database connection is not active');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
