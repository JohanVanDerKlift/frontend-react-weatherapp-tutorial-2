import React, {useEffect, useState} from 'react';
import './TodayTab.css';
import WeatherDetail from "../../components/weatherDetail/WeatherDetail";
import axios from "axios";
import createTimeString from "../../helpers/createTimeString";
import kelvinToCelsius from "../../helpers/kelvinToCelsius";

const apiKey = '73c57ea6d7d190039dd9820a17d06ee1';

function TodayTab({coordinates}) {
	const [forecasts, setForecasts] = useState([]);
	const [error, toggleError] = useState(false);
	const [loading, toggleLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			toggleLoading(true);
			try {
				toggleError(false);
				const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,daily&appid=${apiKey}`);
				console.log(result.data);
				setForecasts([
					result.data.hourly[3],
					result.data.hourly[5],
					result.data.hourly[7],
				]);
			} catch (e) {
				toggleError(true);
				console.error(e);
			}
			toggleLoading(false);
		}

		if (coordinates) {
			fetchData();
		}
	}, [coordinates])

	return(
		<div className="tab-wrapper">
			<div className="chart">
				{forecasts.map((forecast) => (
					<WeatherDetail temp={forecast.temp} type={forecast.weather[0].main} description={forecast.weather[0].description} key={forecast.dt}/>
				))}
			</div>
			<div className="legend">
				{forecasts.map((forecast) => {
					return <span key={`${forecast.dt}-timestamp`}>{createTimeString(forecast.dt)}</span>
				})}
			</div>
			{loading && <span>Loading...</span>}
			{error && <span>Er is iets mis gegaan met het ophalen van de data</span>}
		</div>
  );
}

export default TodayTab;
