import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles/MyTrips.css";
import Test from "./test";
import Axios from "axios";
import { observer, inject } from "mobx-react";
import Directions from "././Directions/DirectionsIndex";
import SearchAllPlaces from "./SearchAllPlaces"
const URL_KEY=""
const contries = require("../country-by-name");
@inject("user")
@observer
class MyTrips extends Component {
  constructor() {
    super();
    this.state = {
      trips: [],
      test: true
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
          `${URL_KEY}/addTrip/${userName}`,
          user
        );
        return a.data;
      }
    }
    await this.props.user.fetchProjects();
    this.setState({ trips: this.props.user.user.Trips }, function () {
      //   console.log(this.state.trips);
    });
  };
  sliceTrip = async (event) => {
    const userName = localStorage.getItem("user");
    let index = event.target.getAttribute("index");
    let name = event.target.getAttribute("name");
    let t = this.props.user.user.Trips.filter(f => f.Tripnum != index)
    console.log(t);
    let user = this.props.user.user
    user.Trips = t
    let a = await Axios.put(`${URL_KEY}/addTrip/${userName}`, user
    );
    this.setState({ test: false }, function () {
      console.log("hi");
    })
    this.setState({ test: true }, function () {
      console.log("hi");
    })
    await this.props.user.fetchProjects();
    this.setState({ trips: this.props.user.user.Trips }, function () {
      //   console.log(this.state.trips);
    });
    return a.data;
  }
  sliceTop = async event => {
    const userName = localStorage.getItem("user");
    let index = event.target.getAttribute("index");
    let name = event.target.getAttribute("name");
    //console.log(this.props.user.user.Trips);
    let t = this.props.user.user.Trips[index].top.filter(m => m["name"] !== name)
    console.log(t);
    let user = this.props.user.user;
    user.Trips[index].top = t;

    console.log(user.Trips[index].top );
    
    let a = await Axios.put(`${URL_KEY}/addTrip/${userName}`, user);
    await this.props.user.fetchProjects();
    this.setState({ trips: this.props.user.user.Trips }, function () {
      //   console.log(this.state.trips);
    });
    return a.data;
  };
  startTrip = async event => {
    let data = event.target.getAttribute("data");
    console.log(data);
    // // console.log(userName);
    // let a = await axios.put(`http://localhost:8080/addTrip/${userName}`, user)
    // window.location.pathname = '/Home'
  }
  type = obj => {
    let interest = [];
    for (const key in obj["type"]) {
      if (obj["type"][key]) {
        interest.push(
          <div>
            {key} {" "}
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
            {obj["top"][key]["name"]} {" "}
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
      <div className="MyTripsContainer">
        <div className="titleMyTrip">
          Here You can manage all your trips and update:
        </div>
        <div className="tripTitle">
          <div className="Trips">
            {this.state.test ? trip.map(m => (
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
                <div className='addInput'>
                    <SearchAllPlaces data={m} />
                    {/* <i class="fas fa-plus" ></i> */}
                    </div>
                    {/* <a className='btnStart' className="waves-effect waves-light btn-small">
                      <i onClick={this.startTrip} data= {m}  class="fas fa-route"> Start Travel to {m.Tripnum} </i>
                    </a> */}
                  
               
              </div>
            )) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default MyTrips;


