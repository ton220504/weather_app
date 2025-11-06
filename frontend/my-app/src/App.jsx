import { useState, useEffect } from "react"
import { ThreeBackground } from "./components/ThreeBackground";

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)

  const fetchWeather = async (arg) => {
    try {
      let url;
      if (arg && typeof arg === 'object' && arg.lat != null && arg.lon != null) {
        url = `http://localhost:3005/api/weather?lat=${encodeURIComponent(arg.lat)}&lon=${encodeURIComponent(arg.lon)}`;
      } else {
        const cityParam = arg || city || '';
        url = `http://localhost:3005/api/weather/${encodeURIComponent(cityParam)}`;
      }

      const res = await fetch(url);
      const weatherData = await res.json();
      setWeather(weatherData);
    } catch (error) {
      console.log('Failed to fetch weather data', error);
      setWeather({ error: 'Không thể lấy dữ liệu thời tiết' });
    }
  }


  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        fetchWeather({ lat, lon });
        console.log(lat,lon);
      },
      (err) => {
        console.log('Geolocation failed or denied:', err.message);

      },
      { enableHighAccuracy: false, timeout: 5000 }
    );
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <ThreeBackground/>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white/10 rounded-lg shadow-lg border border-white/20">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Nhập tên thành phố:</label>
          <div className="flex">
            <input 
              className="flex-1 border-2 border-gray-300 text-white rounded-l px-4 py-2 focus:outline-none focus:border-blue-500" 
              type="text" 
              value={city} 
              onChange={(e)=>setCity(e.target.value)}
              placeholder="Ví dụ: Quy Nhơn"
            />
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r transition duration-200"
              onClick={()=>fetchWeather(city)}
            >
              Tìm
            </button>
          </div>
        </div>

        {weather && weather.error ? (
          <div className="text-red-500 mt-4">{weather.error}</div>
        ) : weather ? (
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-white mb-4">{weather.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 p-3 rounded">
                <p className="text-white">Nhiệt độ</p>
                <p className="text-xl font-semibold">{weather.temp}°C</p>
              </div>
              <div className="bg-white/50 p-3 rounded">
                <p className="text-white">Độ ẩm</p>
                <p className="text-xl font-semibold">{weather.humidity}%</p>
              </div>
              <div className="bg-white/50 p-3 rounded">
                <p className="text-white">Thời tiết</p>
                <p className="text-xl font-semibold">{weather.weather}</p>
              </div>
              <div className="bg-white/50 p-3 rounded">
                <p className="text-white">Tốc độ gió</p>
                <p className="text-xl font-semibold">{weather.wind} m/s</p>
              </div>
            </div>
            {weather.icon && (
              <img 
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="Weather icon"
                className="mx-auto mt-4"
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default App
