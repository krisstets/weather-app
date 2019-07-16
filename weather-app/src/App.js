import React, { Component } from 'react';
import './App.css';
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "197bb3bc90d1a83fe282b5e8b3d6bb29";


class App extends Component {
  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    const api_call = await fetch(URL);
    const data = await api_call.json();

    console.log(data);
  }
  render() {
    return(
      <div>
        <Title />
        <Form getWeather = {this.getWeather}/>
        <Weather />
      </div>
    );
  };
}

export default App;
