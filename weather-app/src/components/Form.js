import React, { Component } from "react";

export default class Form extends Component {
    render() {
        return(
            <form className="weather_form" onSubmit={ this.props.chooseAPI }>
                <input className="city" type="text" name="city" placeholder="City" />
                <input className="country" type="text" name="country" placeholder="Country" />
                <button className="get_weather_button">Get Weather</button>
            </form>
        );
    }
}