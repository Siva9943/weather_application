import sun from './assets/sun.avif'
import rain from './assets/rain1.png'
import wind from './assets/wind.avif'
import cloud from './assets/cloud.png'
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from 'react';

export default function WeatherCard() {
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [inValue, setInValue] = useState("chennai");
    const [loading, setLoading] = useState(false);

    const weatherCall = () => {
        setLoading(true);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inValue}&appid=62dd3fb371467f901378f3b99974ce8d`)
            .then((res) => res.json())
            .then((weatherdata) => {
                console.log(weatherdata)
                setWeatherInfo(weatherdata);
                setLoading(false);
            })
            .catch(() => {
                setWeatherInfo(null);
                setLoading(false);
            });
    };

    useEffect(() => {
        weatherCall();
    }, []);

    let weatherIcon = sun; // default
    if (weatherInfo?.weather && weatherInfo.weather[0]) {
        const mainWeather = weatherInfo.weather[0].main.toLowerCase();
        if (mainWeather.includes("rain")) {
            weatherIcon = rain;
        } else if (mainWeather.includes("cloud")) {
            weatherIcon = cloud;
        } else if (mainWeather.includes("wind")) {
            weatherIcon = wind;
        }
    }

    return (
        <div className="box">
            <div className='input-box'>
                <input
                    type="text"
                    onChange={(e) => setInValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            weatherCall();
                        }
                    }}
                    placeholder='Search your city'
                />

                <CiSearch className='i' onClick={() => weatherCall()} />
            </div>

            {loading ? (
                <h2>Loading weather data...</h2>
            ) : weatherInfo && weatherInfo.cod === 200 ? (
                <div className="card">
                    <h1 className="head">{weatherInfo.name}</h1>
                    <p className='date'>{new Date().toLocaleString()}</p>

                    <div className="box1">
                        <h1 className="celcius">
                            {Math.round(weatherInfo.main.temp - 273.15)}<sup>o</sup><span>c</span>
                        </h1>
                        <img src={weatherIcon} alt="weather icon" />
                    </div>

                    <div className="box2">
                        <div className="card">
                            <img src={rain} alt="Humidity icon" />
                            <p>{weatherInfo.main.humidity}% Precipitation</p>
                        </div>
                        <div className="card">
                            <img src={wind} alt="Wind icon" />
                            <p>{weatherInfo.wind.speed} km/h Winds</p>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Invalid City Name</h1>
            )}
        </div>
    );
}
