const express = require('express');
const router = express.Router();
const { publishEvent, getUserEvent  } = require('../controllers/eventController');

router.post('/publish', publishEvent);
router.get('/events/:userId', getUserEvent);
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'Event driven application is up and running!' });
  });

module.exports = router;
