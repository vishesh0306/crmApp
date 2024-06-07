const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000; // Change this to your desired port number

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

// Define the data you want to insert
const newData = {
  name: 'John Doe',
  email: 'john@example.com'
};

// API endpoint to execute the insertion
app.get('/insertData', (req, res) => {
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

// API endpoint to check database connection status
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

// Close the connection to the MySQL server when the application exits
process.on('exit', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing MySQL connection: ' + err.stack);
      return;
    }

    console.log('Connection to MySQL server closed');
  });
});
