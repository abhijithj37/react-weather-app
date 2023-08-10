import { useState } from 'react';
import './App.css';
import Search from './Components/Search/search';
import { WEATHER_API_KEY, WEATHER_API_URL } from './Components/apis';
import CurrentWeather from './Components/current-weather/current-weather';
import Forecast from './Components/forecast/forecast';
import { useEffect } from 'react';

function App() {
  const [currentWeather,setCurrentWeather]=useState(null)
  const [forecast,setForecast]=useState(null)
  


 
  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log("Latitude:", lat);
          console.log("Longitude:", lon);
          const currentWeatherFetch = fetch(
            `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
          );
          const forecastFetch = fetch(
            `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
          );
           Promise.all([currentWeatherFetch, forecastFetch])
            .then(async (response) => {
              const weatherResponse = await response[0].json();
              const forcastResponse = await response[1].json();
         
              setCurrentWeather({ city: weatherResponse.name, ...weatherResponse });
              setForecast({  ...forcastResponse });
            })
            .catch(console.log);
         
        },
        (error) => {
          console.log("Error:", error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    
  },[])



 const handleOnSearchChange=(data)=>{
  const [lat,lon]=data.value.split(' ')
  const currentWeatherFetch = fetch(
    `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  );
  const forecastFetch = fetch(
    `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  );
   Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();
      const forcastResponse = await response[1].json();
 
      setCurrentWeather({ city: data.label, ...weatherResponse });
      setForecast({ city: data.label, ...forcastResponse });
    })
    .catch(console.log);

 
 }
  return (
    <div className="App">
       <Search onSearchChange={handleOnSearchChange}/>
       {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
