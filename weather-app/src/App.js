import React, { Component } from 'react';
import './App.css';
import Form from "./components/Form";
import Weather from "./components/Weather";
import Switch from './components/Switch';


const FIRST_API_KEY = "197bb3bc90d1a83fe282b5e8b3d6bb29";
const SECOND_API_KEY = "ace74d2f83d7499ebad97bbdc4f0a4d4";
const GEOLOCATION_KEY = "18101055-4c6d-4805-9ebc-acadca40ad98";
const storage = window.localStorage;

class App extends Component {
  state ={ 
    temperature: undefined,
    city: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  storageSave = (api) => {
    const cityInput = document.querySelector('.city').value;
    const countryInput = document.querySelector('.country').value;
    const time = new Date();
    const time_now = time.getTime();

    storage.setItem("API", api);
    storage.setItem("cityInput", cityInput);
    storage.setItem("countryInput", countryInput);
    storage.setItem("city", this.state.city);
    storage.setItem("country", this.state.country);
    storage.setItem("temperature", this.state.temperature);
    storage.setItem("humidity", this.state.humidity);
    storage.setItem("condition", this.state.description);
    storage.setItem("time", time_now);
  }

  chooseAPI = (e) => {
    e.preventDefault();    

    const leftAPI = document.querySelector("#first");
    const rightAPI = document.querySelector("#second");

    if (leftAPI.checked) {
      this.getWeatherFirstAPI();
    } else if (rightAPI.checked){
      this.getWeatherSecondAPI();
    }
  }

  getWeatherFirstAPI = async () => {  
    const city = document.querySelector('.city').value;
    const country = document.querySelector('.country').value;
    const firstAPI = 'firstAPI';
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${FIRST_API_KEY}&units=metric`;
    const api_call = await fetch(URL);
    const data = await api_call.json();

    if (city && country) {
      this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description.charAt(0).toUpperCase().concat(data.weather[0].description.slice(1)),
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
    this.storageSave(firstAPI); 
  }

  getWeatherSecondAPI = async () => {
    let latitude;
    let longitude

    const secondUrlRequest = async () => {
      const city = document.querySelector('.city').value;
      const country = document.querySelector('.country').value;
      const locationURL = `https://geocode-maps.yandex.ru/1.x/?apikey=${GEOLOCATION_KEY}&format=json&geocode=${city}+${country}`;
      const apiCall = await fetch(locationURL);
      const data = await apiCall.json();

      latitude = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ")[1];
      longitude = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ")[0];

      secondGetWeather();
    }
  
    const secondGetWeather = async () => {
      const city = document.querySelector('.city').value;
      const country = document.querySelector('.country').value;
      const secondURL = `https://api.weatherbit.io/v2.0/current?&lat=${latitude}&lon=${longitude}&key=${SECOND_API_KEY}`;
      const secondApiCall = await fetch(secondURL);
      const data = await secondApiCall.json();
      const secondAPI = "secondAPI";

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
      this.storageSave(secondAPI);
    }
    secondUrlRequest();
  }

  render() {
    return(
      <div className="App"> 
        <Switch />
        <Form chooseAPI={this.chooseAPI}/>
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
    const city = document.querySelector('.city');
    const country = document.querySelector('.country'); 
    const currentTime = new Date();
    const currentTimeNow = currentTime.getTime();
    const TWO_HOURS = 7200000;
    const firstAPI = document.querySelector("#first");
    const secondAPI = document.querySelector("#second");

    if (Number(currentTimeNow - storage.time_now) > TWO_HOURS) {
      storage.clear();
    }

    if (storage.length === 0) {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      }
    } else {
        this.setState({
          temperature: storage.temperature,
          city: storage.city,
          country: storage.country,
          humidity: storage.humidity,
          description: storage.condition,
          error: ""
        });

        city.value = storage.cityInput;
        country.value = storage.countryInput;

        if (storage.API === "firstAPI") {
          firstAPI.checked = true;
          secondAPI.checked = false;
        } else if (storage.API === "secondAPI") {
          secondAPI.checked = true;
          firstAPI.checked = false;
        }
      }


    function showPosition(position) {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;

      urlRequest(long, lat);
    } 

    async function urlRequest(long, lat) {
      const Location_URL = `https://geocode-maps.yandex.ru/1.x/?apikey=${GEOLOCATION_KEY}&format=json&geocode=${long},${lat}`;
      const apiCall = await fetch(Location_URL);
      const data = await apiCall.json();

      city.value = data.response.GeoObjectCollection.featureMember[3].GeoObject.name;
      country.value = data.response.GeoObjectCollection.featureMember[3].GeoObject.description;

      weatherRequest();
    }

    const weatherRequest = async () => {
      const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city.value},${country.value}&appid=${FIRST_API_KEY}&units=metric`;
      const api_call = await fetch(URL);
      const data = await api_call.json();

      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description.charAt(0).toUpperCase().concat(data.weather[0].description.slice(1)),
        error: ""
      });
    }
  }
}

export default App;
