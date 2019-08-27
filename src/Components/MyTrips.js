

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles/MyTrips.css";
import Test from "./test";
import Axios from "axios";
import { observer, inject } from "mobx-react";
import Directions from "././Directions/DirectionsIndex";
import SearchAllPlaces from "./SearchAllPlaces"
const contries = require("../country-by-name");
@inject("user")
@observer
class MyTrips extends Component {
  constructor() {
    super();
    this.state = {
      trips: []
    };
  }
  async componentDidMount() {
    await this.props.user.fetchProjects();
    this.setState({ trips: this.props.user.user.Trips }, function () {
      //   console.log(this.state.trips);
    });
  }
  sliceType = async event => {
    const userName = localStorage.getItem("user");
    let index = event.target.getAttribute("index");
    let name = event.target.getAttribute("name");
    for (let m in this.props.user.user.Trips[index].type) {
      if (m == name) {
        let user = this.props.user.user;
        user.Trips[index].type[m] = false;
        let a = await Axios.put(
          `http://localhost:8080/addTrip/${userName}`,
          user
        );
        return a.data;
      }
    }
  };
  sliceTrip = async event => {
    const userName = localStorage.getItem("user");
    let index = event.target.getAttribute("index");
    let name = event.target.getAttribute("name");
    let t = this.props.user.user.Trips.filter(f => f.Tripnum != index)
    console.log(t);
    let user = this.props.user.user
    user.Trips = t
    let a = await Axios.put( `http://localhost:8080/addTrip/${userName}`, user
    );
    this.forceUpdate()
    this.setState({ }, function () {
       console.log("hi");
    })
    return a.data;
  }
  
sliceTop = async event => {
  const userName = localStorage.getItem("user");
  let index = event.target.getAttribute("index");
  let name = event.target.getAttribute("name");
  let t = this.props.user.user.Trips[index].top.filter(m => m["name"] !== name)
  let user = this.props.user.user;
  user.Trips[index].top = t;
  let a = await Axios.put(`http://localhost:8080/addTrip/${userName}`, user);
  return a.data;
};
type = obj => {
  let interest = [];
  for (const key in obj["type"]) {
    if (obj["type"][key]) {
      interest.push(
        <div>
          {key} <br></br>
          <i
            id="minus"
            name={key}
            index={obj["index"]}
            onClick={this.sliceType}
            class="fas fa-minus"
          ></i>
        </div>
      );
    }
  }
  return interest;
};
top = obj => {
  let Top = [];
  for (const key in obj["top"]) {
    if (obj["top"][key]) {
      Top.push(
        <div>
          {obj["top"][key]["name"]}{" "}
          <i
            name={obj["top"][key]["name"]}
            index={obj["index"]}
            onClick={this.sliceTop}
            class="fas fa-minus"
          ></i>
        </div>
      );
    }
  }
  return Top;
};
render() {
  let trip = this.state.trips;
  console.log(this.props.user.user);
  return (
    <div>
        <div className="titleMyTrip">
        Here You can manage all your trips and update:
        </div>
        <div className="tripTitle">
        <div className="Trips">
          {trip.map(m => (
              <div className="trip">
              <i id="X" index={m["Tripnum"]} name={m.address} onClick={this.sliceTrip} class="fas fa-times"></i>              
              <div id='countryTitle'>{m.address}</div>
                <span className="interest">  {this.type(m)}</span>
                 <div id="grid">
                 <div className='places'><div  id='myPlacesTitle'> My places</div>{this.top(m)}</div>
                <div id="directions">
                  <Directions data={m.top} center={m} />
                </div>
              </div>
              <div id="addInput">
                  <SearchAllPlaces />
                  <i onClick={this.addPlace} value={this.state.place} class="fas fa-plus"></i>
                </div>
                <a className='btnStart' className="waves-effect waves-light btn-small">

                <i  className="buttonGreen" class="fas fa-route"></i> Start Travel to {m.address}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
}
export default MyTrips;
