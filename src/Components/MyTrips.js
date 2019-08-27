import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles/MyTrips.css";
import Test from "./test";
import Axios from "axios";
import { observer, inject } from "mobx-react";
import Directions from "././Directions/DirectionsIndex";
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
    this.setState({ trips: this.props.user.user.Trips }, function() {
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

//   sliceTrip=async event =>{
//     const userName = localStorage.getItem("user");
//     let index = event.target.getAttribute("index");
//     let name = event.target.getAttribute("name");

//     console.log(this.props.user.user.Trips[index].address)
//     for (let m in this.props.user.user.Trips[index].address) {
//         if (m !== name) {
//             consol
//               let user = this.props.user.user;
//               user.Trips[index].address=m;
//           let a = await Axios.put(
//             `http://localhost:8080/addTrip/${userName}`,
//             user
//           );
//           return a.data;
//           }}
//   }

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
            {obj["top"][key]["name"]} <br></br>{" "}
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
    return (
      <div>
        <div className="titleMyTrip">
          Here You can manage all your trips and update:
        </div>
        <div className="tripTitle">
          <div className="Trips">
            {trip.map(m => (
              <div className="trip">
                <i id="X" index={m["index"]} name={m}  class="fas fa-times"></i>
                <h4>{m.address}</h4>
                <div id="grid">
                  <h5> My interest</h5>
                  <h5> My places</h5>
                  <div className="interest">{this.type(m)}</div>
                  <div className="places">{this.top(m)}</div>
                  <div>
                    <input placeholder="Add place"></input>
                    <i class="fas fa-plus"></i>
                  </div>
                  <div id="directions">
                    <Directions data={m.top} center={m} />
                  </div>
                </div>
                <a className="waves-effect waves-light btn-small">
                  <i class="fas fa-route"></i> Start Travel to {m.address}
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
