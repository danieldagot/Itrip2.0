import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import MapWrapped from './MapWrapped'
//import '../styles/Option.css'
import '../Styles/Home.css'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
class SearchAllPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      latLng: [],
      currentAddress: []
    }
  }
  handleChange = address => {
    this.setState({ address: address }, function () { })
  };
  handleSelect = address => {
    this.setState({ address: address }, function () { })
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        console.log(latlng);
      })
      .catch(error => console.error('Error', error))
    console.log(address);
    console.log(this.state.currentAddress)
  };
  theCountry = () => {
    console.log(this.state.address);
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
        {/* <button onClick={this.theCountry} className="addTrip">add!</button> */}
      </div>
    );
  }
}
export default SearchAllPlaces;