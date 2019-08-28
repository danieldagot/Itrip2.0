import React, { Component } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import MapWrapped from '../MapWrapped'
import MapPlaces from '../MapPlaces'
//import '../styles/Option.css'
import '../../Styles/Home.css'
import Directions from "../Directions/DirectionsIndex";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import AddTrip from './AddTrip'
import MyTrips from '../MyTrips';
import { KeyObject } from 'crypto';
import Landing from "../Landing/Landing"
import Axios from 'axios';
import NavBarHotPlaces from "../NavBarHotPlaces"
import { observer,inject } from 'mobx-react'
@observer
@inject("user")
class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      address: '',
      latLng: [],
      types: '',
      currentAddress: [],
      type: {
        Food: false,
        Extreme: false,
        Nature: false,
        Art: false,
        Night: false,
        Beauty: false
      },
      popup: false,
      top: [],
      click: false , 
      user : {} 
    }
    
  }
  popup = () => {
    this.setState({ popup: !this.state.popup })
  }
  changeType = (interest) => {
    for (let i in this.state.type) {
      if (i == interest) {
          this.state.type[i] = true
        console.log(this.state.type)
      }
    }
  }
  handleChange = address => {
    this.setState({ address }, function () { console.log(this.state.address)})
  }
  handleSelect = address => {
    geocodeByAddress(address).then(results => {
        console.log(results[0].types[0]);
        this.setState({ types: results[0].types[0]})
        return getLatLng(results[0]);
      }).then(latlng => {
        this.setState({ latLng: latlng }, function() {
          console.log(this.state);
        });
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
          }, function () {})
        }
      )
    }
  }
  moveToComp = () => {
    console.log("here");
    window.location.pathname = '/MyTrip'
  }
  getNav = async () => {
    console.log(this.state);
    let a = await Axios.put("http://localhost:8080/GooglePlaces", this.state)
    console.log(a.data);
    this.setState({ top: a.data, click: !this.state.click }, function () {
      console.log(this.state.top);
      this.props.user.setTop(this.state.top)
    })
  }
  async componentDidMount() {
    await  this.props.user.fetchProjects()
    console.log(this.props.user.user);
    this.setState({user : this.props.user.user } , function(){console.log(this.state.user.trip)
    })
    
    }
  render() {
    this.getGeoLocation()
    return (
      <div id="all" >
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div >
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <a
          onClick={this.popup}
          id="ADD"
          class="btn-floating btn-large waves-effect waves-light green"
        >
          <i class="material-icons">add</i>
        </a>
        {this.state.popup ? (
          <AddTrip
            changeType={this.changeType}
            handleChange={this.handleChange}
            handleSelect={this.handleSelect}
          />
        ) : null}
        <div id={this.state.click ? "mapW" : "mapW2"}>
          <span>
            {" "}
          {this.state.user.Trip ? <Directions data={this.state.user.Trip.top} center={this.state.user.Trip} /> : <MapWrapped state={this.state} />  }
          {/* / <MapWrapped state={this.state} /> */}
            <a
              onClick={this.getNav}
              id="navBar"
              className="btn-floating grey lighten-1 all2">
              <i className="material-icons">format_align_right</i>
            </a>
            {this.state.click ? (
              <NavBarHotPlaces data={this.state} />
            ) : null}
          </span>
        </div>
      </div>
    );
  }
}
export default Home;




