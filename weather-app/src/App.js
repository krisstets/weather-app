import React, { Component } from 'react';
import './App.css';
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";


const API_KEY = "197bb3bc90d1a83fe282b5e8b3d6bb29";
const GEOLOCATION_KEY = "18101055-4c6d-4805-9ebc-acadca40ad98";


class App extends Component {
  state ={ 
    temperature: undefined,
    city: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {  
    e.preventDefault();    
    const cityInput = document.querySelector('.city');
    const countryInput = document.querySelector('.country'); 
    const city = cityInput.value;
    const country = countryInput.value;

    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;
    const api_call = await fetch(URL);
    const data = await api_call.json();

    if (city && country) {
      this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value"
      });
    } 
  }

  render() {
    return(
      <div>
        <Title />
        <Form getWeather = {this.getWeather}/>
        <Weather
         temperature={this.state.temperature} 
         city={this.state.city}
         country={this.state.country}
         humidity={this.state.humidity}
         description={this.state.description}
         error={this.state.error}
         />
      </div>
    );
  };

 componentDidMount() {
   const cityInput = document.querySelector('.city');
   const countryInput = document.querySelector('.country'); 

    function showPosition(position) {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      urlRequest(long, lat);
    } 

    async function urlRequest(long, lat) {
      const Location_URL = `https://geocode-maps.yandex.ru/1.x/?apikey=${GEOLOCATION_KEY}&format=json&geocode=${long},${lat}`;
      const apiCall = await fetch(Location_URL);
      const data = await apiCall.json();

      cityInput.value = data.response.GeoObjectCollection.featureMember[3].GeoObject.name;
      countryInput.value = data.response.GeoObjectCollection.featureMember[3].GeoObject.description;

      weatherRequest();
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    
    const weatherRequest = async () => {
      const URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityInput.value},${countryInput.value}&appid=${API_KEY}&units=metric`;
      const api_call = await fetch(URL);
      const data = await api_call.json();

      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
        });
    }

  }

}

export default App;
