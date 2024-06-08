const pool = require('../config/db');

const User = {};

User.create = (userData, callback) => {
    const query = 'INSERT INTO users SET ?';
    pool.query(query, userData, callback);
};

User.findByEmail = (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    pool.query(query, [email], callback);
};

module.exports = User;