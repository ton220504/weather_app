const express = require('express');
const router = express.Router();
const { getWeatherByCity } = require('../controllers/weatherController');

// Support both query-based coords and param-based city
router.get('/', getWeatherByCity);
router.get('/:city', getWeatherByCity);

module.exports = router;
