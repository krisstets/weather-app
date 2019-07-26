import React, { Component } from "react";

export default class Weather extends Component {
    render() {
        return(
            <div>
              { this.props.city && this.props.country && <p className="location"> { this.props.city }, { this.props.country }</p> }
              { this.props.temperature && <p className="temperature"> { this.props.temperature }°C</p> } 
              { this.props.humidity && <p className="humidity"> { this.props.humidity }%</p> }
              { this.props.description && <p className="description">{  this.props.description }</p> }
              { this.props.error && <p>this.props.error</p> } 
            </div>
        );
    }
}