import React, { Component } from 'react';
import './App.css';
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";

class App extends Component {
  render() {
    return(
      <div>
        <Title />
        <Form />
        <Weather />
      </div>
    );
  };
}

export default App;
