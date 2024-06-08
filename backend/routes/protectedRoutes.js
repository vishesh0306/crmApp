const express = require('express');
const router = express.Router();
const protectedController = require('../controllers/protectedController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/working', authMiddleware.authenticateJWT, protectedController.working);

module.exports = router;