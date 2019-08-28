import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Axios from "axios";
import MapWrapped from './MapWrapped'
//import '../styles/Option.css'
import '../Styles/Home.css'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { observer, inject } from "mobx-react";
@inject("user")
@observer
class SearchAllPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      latLng: {},
      currentAddress: []
    }
  }
  handleChange = address => {
    console.log(this.props.data)
    this.setState({ address: address }, function () { })
  };
  handleSelect = address => {
    this.setState({ address: address }, function () { })
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({ latLng: latlng }, function () {
          console.log(latlng);
        })
      })
      .catch(error => console.error('Error', error))
    console.log(address);
    console.log(this.state.currentAddress)
  };
   theCountry = async () => {
    console.log(this.state.address);
    console.log(this.state.latLng);
    let add = { name: this.state.address, geometry: {location : this.state.latLng} }
    console.log(this.props.data);
    let user = this.props.user.user
    user.Trips.forEach(element => {
      if(element.Tripnum == this.props.data.Tripnum)
      { element.top.push(add)
        console.log(this.props.user.user.Trips)
      }
     
      
    });
    const userName = localStorage.getItem("user");
    let a = await Axios.put(`http://localhost:8080/addTrip/${userName}`, user);
    await this.props.user.fetchProjects();
    
  }
  render() {
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
                  // inline style for demonstration purpose
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
        <br></br>
        <i onClick={this.theCountry} className="addTrip" class="fas fa-plus" ></i>

        {/* <button onClick={this.theCountry} className="addTrip">add!</button> */}
      </div>
    );
  }
}
export default SearchAllPlaces;








