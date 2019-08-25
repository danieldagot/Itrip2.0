
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
 
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        address: '',
        latLng:[],
        currentAddress:[]
    }
  }
 
  handleChange = address => {
    this.setState({ address },function(){})
   
  };
  
  handleSelect  =  address => {
      geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latlng => 
        {
           console.log(latlng);
           
        })
      .catch(error => console.error('Error', error))
       console.log(address);
       
  };

//   getGeoLocation = () => {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             position => {
//                 let a={      
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude
//                 }
//                 // console.log(position.coords)
//                 this.setState ({
//                     currentAddress:a
//                   },function(){
//                     console.log(this.state.currentAddress)
//                      })
//             }
//         )} 
// }

// moveToComp=()=>{
//     console.log("here");
    
//     window.location.pathname = '/MyTrip'

// }
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
      <button onClick={this.moveToComp} className="addTrip">Add Trip</button>
      <div style={{ width: "100vw", height: "100vh" }}>
      </div>
      </div>
    );
  }
}





export default Test;

