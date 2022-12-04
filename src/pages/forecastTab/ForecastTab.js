import React, {useState, useEffect, useContext} from 'react';
import './ForecastTab.css';
import axios from "axios";
import createDateString from "../../helpers/createDateString";
import { TempContext } from "../../context/TempProvider";

function ForecastTab({coordinates}) {
  const [forecasts, setForecasts] = useState([]);
  const [error, toggleError] = useState(false);
  const [loading, toggleLoading] = useState(false);

  const { kelvinToMetric } = useContext(TempContext);

  useEffect(() => {
    async function fetchForecasts() {
      toggleLoading(true);
      try {
        toggleError(false);
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);
        console.log(result.data);
        const fiveDayForecast = result.data.list.filter((singleForecast) => {
          return singleForecast.dt_txt.includes("12:00:00");
        })
        setForecasts(fiveDayForecast);
      } catch (e) {
        console.error(e);
        toggleError(true);
      }
      toggleLoading(false);
    }

    if (coordinates) {
      fetchForecasts();
    }
  }, [coordinates])

  return (
    <div className="tab-wrapper">
      {loading && <span>Loading...</span>}
      {error && <span>Er is iets mis gegaan met het ophalen van de data</span>}
      {forecasts.length === 0 && !error &&
        <span className="no-forecast">Zoek eerst een locatie om het weer voor deze week te bekijken</span>
      }
      {forecasts.map((forecast) => {
        return (
          <article className="forecast-day" key={forecast.dt}>
            <p className="day-description">
              {createDateString(forecast.dt)}
            </p>

            <section className="forecast-weather">
            <span>
              {kelvinToMetric(forecast.main.temp)}
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
