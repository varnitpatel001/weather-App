import React, { useState } from 'react';
import './style4.css'; 

const WeatherApp = () => {
  const [weatherdata, setweather] = useState('');
  const [error, seterror] = useState('');
  const [city, setcity] = useState('');

  const fetchdata = async () => {
    const key = '28cc66d072814af188c190229241909';
    if (city.trim()) {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`);
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();
        seterror(null);
        setweather(data);
      } catch (err) {
        seterror(err.message);
        setweather(null);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Weather App</h1>
      <input
        type="text"
        className="input"
        value={city}
        onChange={(e) => setcity(e.target.value)}
        placeholder="Enter city"
      />
      <button className="btn" onClick={fetchdata}>
        Submit
      </button>
      {error && <p className="error">{error}</p>}
      {weatherdata && (
        <div className="weather-details">
          <h3>{weatherdata.location.name}</h3>
          <p>Temperature: {weatherdata.current.temp_c}°C</p>
          <p>Condition: {weatherdata.current.condition.text}</p>
          <p>Humidity: {weatherdata.current.humidity}%</p>
          <p>Wind Speed: {weatherdata.current.wind_kph} kph</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
