import React, { Component } from 'react';
import './App.css';
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Switch from './components/Switch';


const FIRST_API_KEY = "197bb3bc90d1a83fe282b5e8b3d6bb29";
const SECOND_API_KEY = "ace74d2f83d7499ebad97bbdc4f0a4d4";
const GEOLOCATION_KEY = "18101055-4c6d-4805-9ebc-acadca40ad98";


class App extends Component {
  state ={ 
    temperature: undefined,
    city: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  chooseAPI = (e) => {
    e.preventDefault();    
    const leftAPI=document.querySelector("#first");
    const rightAPI = document.querySelector("#second");

    if (leftAPI.checked) {
      this.getWeather();
    } else if (rightAPI.checked){
      this.getWeatherSecondAPI();
    }
  }

  getWeather = async () => {  
    const city = document.querySelector('.city').value;
    const country = document.querySelector('.country').value;

    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${FIRST_API_KEY}&units=metric`;
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

  getWeatherSecondAPI = async () => {
    let latitude;
    let longitude

    const secondUrlRequest = async () => {
      const city = document.querySelector('.city').value;
      const country = document.querySelector('.country').value;
      const Location_URL = `https://geocode-maps.yandex.ru/1.x/?apikey=${GEOLOCATION_KEY}&format=json&geocode=${city}+${country}`;
      const apiCall = await fetch(Location_URL);
      const data = await apiCall.json();

      latitude = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ")[1];
      longitude = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ")[0];

      secondGetWeather();
    }
  
    const secondGetWeather = async () => {
      const city = document.querySelector('.city').value;
      const country = document.querySelector('.country').value;
      const second_URL = `https://api.weatherbit.io/v2.0/current?&lat=${latitude}&lon=${longitude}&key=${SECOND_API_KEY}`;
      const second_api_call = await fetch(second_URL);
      const data = await second_api_call.json();

      if (city && country) {
        this.setState({
        temperature: data.data[0].app_temp,
        city: data.data[0].city_name,
        country: data.data[0].country_code,
        humidity: data.data[0].rh,
        description: data.data[0].weather.description,
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
    secondUrlRequest();
  }

  render() {
    return(
      <div>
        <Title />
        <Switch />
        <Form chooseAPI = {this.chooseAPI}/>
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
      const URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityInput.value},${countryInput.value}&appid=${FIRST_API_KEY}&units=metric`;
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
