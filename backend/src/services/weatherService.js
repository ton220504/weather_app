const axios = require('axios');

exports.fetchWeather = async (input) => {
    // input can be a city string OR an object { lat, lon }
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) throw new Error('OpenWeather API key not set');

    let url;
    if (input && typeof input === 'object' && input.lat != null && input.lon != null) {
        const { lat, lon } = input;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(
            lat
        )}&lon=${encodeURIComponent(lon)}&appid=${apiKey}&lang=vi&units=metric`;
    } else {
        const city = input || '';
        url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
        )}&appid=${apiKey}&lang=vi&units=metric`;
    }

    try {
        const res = await axios.get(url);
        const d = res.data;
        return {
            name: d.name,
            weather: Array.isArray(d.weather) && d.weather[0] ? d.weather[0].description : undefined,
            icon: Array.isArray(d.weather) && d.weather[0] ? d.weather[0].icon : undefined,
            temp: d.main && d.main.temp,
            humidity: d.main && d.main.humidity,
            wind: d.wind && d.wind.speed,
        };
    } catch (err) {
        const e = new Error('Failed to fetch weather from OpenWeather');
        e.cause = err;
        e.remote = err.response && err.response.data;
        throw e;
    }
};
