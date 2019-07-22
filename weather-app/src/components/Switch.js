import React, { Component } from 'react';

export default class Switch extends Component {
    render() {
        return(
           <form>
               <label htmlFor="first">1</label>
               <input type="radio" id="first" value="first" name="api" defaultChecked></input>
               <label htmlFor="second">2</label>
               <input type="radio" id="second" value="second" name="api"></input>
           </form>
        );
    }
}