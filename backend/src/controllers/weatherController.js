const {fetchWeather} = require('../services/weatherService')

exports.getWeatherByCity = async(req, res)=>{
    try {
        const city = req.params.city;
        const weatherData = await fetchWeather(city);
        res.json(weatherData);
        
    } catch (error) {
        res.status(500).json({error: 'Weather fetch failed'});
    }
}