import React, { Component } from "react";

export default class Form extends Component {
    render() {
        return(
            <form onSubmit = {this.props.getWeather}>
                <input className="city" type="text" name="city" placeholder="City"/>
                <input className="country" type="text" name="country" placeholder="Country"/>
                <button>Get Weather</button>
            </form>
        );
    }
}