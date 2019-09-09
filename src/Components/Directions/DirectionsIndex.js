import React, { Component } from "react";
import { compose, withProps } from "recompose";
import DirectionRenderComponent from "./DirectionRenderComponent";
import { G_API_URL } from "../../utility/constants";
import DummyLocations from "../../utility/dummyLocations";
import axios from "axios"
import '../../Styles/MyTrips.css'
const URL_KEY=""
// const URL_KEY="http://localhost:8080"

const { withScriptjs, withGoogleMap, GoogleMap } = require("react-google-maps");


class Directions extends Component {
  createLatLngObject = latLng => {
    const latLngArray = latLng.split(",");
    return {
      lat: latLngArray[0],
      lng: latLngArray[1]
    };
  };


  state = {
    defaultZoom: 8,
    map: null,
    center: {},
    top: [],
    bool: false
  };

  start = () => {
    let lcation = []

    this.props.data.map(m => {
      let a = {}

      a = m.geometry.location
      // a = m.geometry.location.lat + "," + m.geometry.location.lng +"," + m.name


      lcation.push(a)

    })

    let dire = []
    let b = {}

    for (let index = 0; index < lcation.length - 2; index++) {
      b.from = lcation[index]

      b.to = lcation[index + 1]
      dire.push(b)
    }

    this.setState({ top: dire }, function () { })
    this.setState({ center: this.props.center.latLng }, function () { })
    this.setState({ bool: true }, function () {

    })
  }

  save = async () => {
    const userName = localStorage.getItem("user")

    let data = await axios.get(`${URL_KEY}/user/${userName}`)
    let user = data.data
    let trip = { direction: this.props.data, center: this.props.center }
    console.log(trip);
  
  }


  startTrip = async () => {
    const userName = localStorage.getItem("user")

    let data = await axios.get(`${URL_KEY}/user/${userName}`)
    let user = data.data
    let trip = this.props.center
    console.log(this.props.center);
    
     user.Trip = trip
     console.log(user.Trip);
    // console.log(userName);
    let a = await axios.put(`${URL_KEY}/addTrip/${userName}`, user)
    //window.location.pathname = '/Home'
    window.location.replace("http://localhost:3000/Home");
  }
  stopTrip = async () => {
    const userName = localStorage.getItem("user")

    let data = await axios.get(`${URL_KEY}/user/${userName}`)
    let user = data.data
    let trip = {}
    user.Trip = trip
    // console.log(userName);
    let a = await axios.put(`${URL_KEY}/addTrip/${userName}`, user)
    window.location.pathname = '/Home'
  }
  componentDidMount() {
    this.start()
  }
  //.mep( m => m )
  render() {
    return (
      <div>
        {this.state.bool ?
          <div>
            {/* <button onClick={this.save}>save trip</button>
          <button onClick={this.startTrip}>START!!!!</button>
          <button onClick={this.startTrip}>STOOP!!!!</button> */}
            <GoogleMap
              defaultZoom={this.state.defaultZoom}
              //  center={this.state.center}
              defaultCenter={new window.google.maps.LatLng(this.state.center.lat, this.state.center.lng)}
            >
              {this.state.top.map((elem, index = 0) => {
                return (

                  <DirectionRenderComponent
                    key={index}
                    index={index + 1}
                    //strokeColor={elem.strokeColor}
                    from={elem.from}
                    to={elem.to}
                  />
                );
              })}

            </GoogleMap>
            <a  className="startTrip" className="waves-effect waves-light btn-small">
              <i onClick={this.startTrip} class="fas fa-route"> Start Travel to { this.props.center.address}  </i>
            </a>
          </div>
          : null}
      </div>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: G_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%`}} />
  }), withScriptjs, withGoogleMap)(Directions);
