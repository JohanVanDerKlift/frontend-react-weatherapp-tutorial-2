import React, {useState, useEffect} from 'react';
import './App.css';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import axios from "axios";
import ForecastTab from "./pages/forecastTab/ForecastTab";
import {Routes, Route} from "react-router-dom";
import TodayTab from "./pages/todayTab/TodayTab";
import kelvinToCelsius from "./helpers/kelvinToCelsius";

const apiKey = '73c57ea6d7d190039dd9820a17d06ee1';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState("");
  const [error, toggleError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      toggleError(false);
      try {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${apiKey}&lang=nl`);
        console.log(result.data);
        setWeatherData(result.data);
      } catch (e) {
        console.error(e);
        toggleError(true);
      }
    }

    if (location){
      fetchData();
    }

  }, [location])

  return (
    <>
      <div className="weather-container">

        {/*HEADER -------------------- */}
        <div className="weather-header">
          <SearchBar setLocationHandler={setLocation}/>
          {error &&
            <span className="wrong wrong-location-error">Oeps! Deze locatie bestaat niet</span>
          }

          <span className="location-details">
            {Object.keys(weatherData).length > 0 &&
              <>
                <h2>{weatherData.weather[0].description}</h2>
                <h3>{weatherData.name}</h3>
                <h1>{kelvinToCelsius(weatherData.main.temp)}</h1>
              </>
            }
          </span>
        </div>

        {/*CONTENT ------------------ */}
        <div className="weather-content">
          <TabBarMenu/>
          <div className="tab-wrapper">
            <Routes>
              <Route path="komende-week" element={<ForecastTab coordinates={weatherData.coord}/>}/>
              <Route path="/" element={<TodayTab coordinates={weatherData.coord}/>}/>
            </Routes>
          </div>

        </div>
        <MetricSlider/>
      </div>
    </>
  );
}

export default App;
