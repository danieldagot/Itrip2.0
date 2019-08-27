
import React, { Component } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import MapWrapped from './MapWrapped'
import MapPlaces from './MapPlaces'
//import '../styles/Option.css'
import axios from "axios"
import "../Styles/Home.css"
import Directions from "././Directions/DirectionsIndex";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import AddTrip from './Home/AddTrip';
import MyTrip from './MyTrips';
import { KeyObject } from 'crypto';

import Axios from 'axios';
import NavBarHotPlaces from "./NavBarHotPlaces"
import { observer, inject } from 'mobx-react'


@observer
@inject("user")
class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      bool: false
    }
  }


  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        // let data = [...this.state.latLng]
        // data.push(latlng)
        this.setState({ latLng: latlng }, function () {
          //   console.log(this.state)

        })
        //  console.log('Success', latlng)
      })
      .catch(error => console.error('Error', error))
  }

  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          let a = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.setState({
            currentAddress: a
          }, function () {
            //     console.log(this.state.currentAddress)
          })
        }
      )
    }
  }


  async componentDidUpdate() {
    console.log(this.props.user.user)
    let Test = this.props.user.user
    console.log(Test);


  }

  moveToComp = () => {
    console.log("here");

    window.location.pathname = '/MyTrip'

  }
  getNav = async () => {
    console.log(this.state);
    let a = await Axios.put("http://localhost:8080/GooglePlaces", this.state)
    console.log(a.data);

    this.setState({ top: a.data }, function () {
      console.log(this.state.top);

    })
    this.setState({ popup2: !this.state.popup2 }, function () { })


  }
  async componentDidMount() {
    //this.getUser()
    await this.props.user.fetchProjects()
    this.setState({ user: this.props.user.user }, function () {
      //  console.log(this.state.user);
      //  console.log(this.state.user.Trips[3].latLng);
    })
    this.setState({ bool: true }, function () {
      //  console.log(this.state.user);

    })
  }
  render() {
    this.getGeoLocation()


    return (
      <div id="all" >

        {this.state.bool ? <Directions data={this.state.user.Trips[2].top} center={this.state.user.Trips[2]} /> : null}
      </div>
    );
  }
}
//data = {this.state.top}



export default Test;

// {this.state.bool ? this.state.user.Trip ? this.state.user.Trip.map(t => {
//   console.log('ani daniel ve ani efes')
//   return <Directions data={t.top} />
// }) : null : null}