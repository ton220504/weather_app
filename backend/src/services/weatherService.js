const axios = require('axios');

exports.fetchWeather = async (city) => {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=vi&units=metric`;

    const res = await axios.get(url);
    return res.data;
    
};
