const {fetchWeather} = require('../services/weatherService')

exports.getWeatherByCity = async(req, res)=>{
    try {
        // support either /api/weather/:city  OR /api/weather?lat=..&lon=..
        if (req.query.lat && req.query.lon) {
            const lat = req.query.lat;
            const lon = req.query.lon;
            const weatherData = await fetchWeather({lat, lon});
            return res.json(weatherData);
        }

        const city = req.params.city;
        const weatherData = await fetchWeather(city);
        res.json(weatherData);

    } catch (error) {
        console.error('Error in getWeatherByCity:', error.message || error, error.remote || error.cause || '');
        res.status(500).json({error: 'Weather fetch failed'});
    }
}