import React, {useState, useEffect} from 'react';
import './ForecastTab.css';
import axios from "axios";

const apiKey = '73c57ea6d7d190039dd9820a17d06ee1';

function createDateString(timestamp) {
  const day = new Date(timestamp * 1000);
  return day.toLocaleDateString('nl-NL', { weekday: 'long' });
}

function ForecastTab({coordinates}) {
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    async function fetchForecasts() {
      try {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&lang=nl`);
        console.log(result.data);
        const fiveDayForecast = result.data.list.filter((singleForecast) => {
          return singleForecast.dt_txt.includes("12:00:00");
        })
        setForecasts(fiveDayForecast);
      } catch (e) {
        console.error(e);
      }
    }

    if (coordinates) {
      fetchForecasts();
    }
  }, [coordinates])

  return (
    <div className="tab-wrapper">
      {forecasts.map((forecast) => {
        return (
          <article className="forecast-day" key={forecast.dt}>
            <p className="day-description">
              {createDateString(forecast.dt)}
            </p>

            <section className="forecast-weather">
            <span>
              {forecast.main.temp}&deg; C
            </span>
              <span className="weather-description">
              {forecast.weather[0].description}
            </span>
            </section>
          </article>
        )
      })}
    </div>
  );
}

export default ForecastTab;
