import React, { Component } from 'react';

export default class Switch extends Component {
    render() {
        return(
           <form className="radio-group">
               <label className="radio" htmlFor="first" >OpenWeather
               <input className="switch" type="radio" id="first" value="first" name="api" defaultChecked /></label>
               <label className="radio" htmlFor="second" >Weatherbit
               <input className="switch" type="radio" id="second" value="second" name="api" /></label>
           </form>
        );
    }
}