import React, { Component } from 'react';
import './App.css';
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";


const API_KEY = "197bb3bc90d1a83fe282b5e8b3d6bb29";
const GEOLOCATION_KEY = "AIzaSyDL12P-3ezGlsQXbZc4Jdap43Nbw50cUTg ";


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

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;
    const api_call = await fetch(URL);
    const data = await api_call.json();

    function showPosition(position) {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      urlRequest(long, lat);
      console.log(position);
    } 

   async function urlRequest(long, lat) {
    const Location_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GEOLOCATION_KEY}`;
    const apiCall = await fetch(Location_URL);
    const data = await apiCall.json();
    console.log(data);
   }

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
    

   
  

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
}

export default App;
