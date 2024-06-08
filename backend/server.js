const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const dataRoutes = require('./routes/dataRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api', dataRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});