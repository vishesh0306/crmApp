const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a connection pool to the MySQL database
const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Vishesh@2003',
  database: 'crmdatabase'
});

// Listen for the 'connection' event to check if the connection is successful
pool.on('connection', () => {
  console.log('Connected to MySQL server');
});

// Listen for the 'error' event to handle connection errors
pool.on('error', (err) => {
  console.error('Error connecting to MySQL server:', err);
});

// API endpoint to execute the insertion
app.post('/insertData', (req, res) => {
  const newData = req.body;

  pool.query('INSERT INTO dummydata SET ?', newData, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }

    console.log('Inserted data successfully');
    res.send('Inserted data successfully');
  });
});

// API endpoint to check database connection status
app.get('/dbStatus', (req, res) => {
  if (pool._closed === false) {
    res.status(200).send('Database connection pool is active');
  } else {
    res.status(500).send('Database connection pool is not active');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
