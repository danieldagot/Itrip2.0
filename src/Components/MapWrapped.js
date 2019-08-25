import React, { Component,useState, useEffect } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
  import mapStyles from "../mapStyles";


  class mapWrapped extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    
     Map=()=> {
        const [selectedPark, setSelectedPark] = useState(null);
        useEffect(() => {
          const listener = e => {
            if (e.key === "Escape") {
              setSelectedPark(null);
            }
          };
          window.addEventListener("keydown", listener);
      
          return () => {
            window.removeEventListener("keydown", listener);
          };
        }, []);

        return (
          <GoogleMap
            defaultZoom={this.props.state.types === 'country' ? 9 : 17}
            defaultCenter={{ lat:this.props.state.latLng.lat?this.props.state.latLng.lat:this.props.state.currentAddress.lat, lng:this.props.state.latLng.lng?this.props.state.latLng.lng:this.props.state.currentAddress.lng}}
            defaultOptions={{ styles: mapStyles }}
            >

              {this.props.state.top !== undefined?  this.props.state.top.map(place => (
              <Marker
                position={{
                  lat: place.lat,
                  lng: place.lng
                }}
                onClick={() => {
                  setSelectedPark(place);
                }}
                icon={{
                  url: `/skateboarding.svg`,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
              />
            )):null}
      
            {selectedPark && (
              <InfoWindow
                onCloseClick={() => {
                  setSelectedPark(null);
                }}
                position={{
                  lat: this.props.state.latLng.lat,
                  lng: this.props.state.latLng.lng
                }}
              >
                <div>
                  <h2>{this.props.state.address}</h2>
                  {/* <p>{selectedPark.properties.DESCRIPTIO}</p> */}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        );
      }
      
    
    render() {        
        const MapWrapped = withScriptjs(withGoogleMap(this.Map));
        return (
            <MapWrapped
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD94wCOjw_YQ9j4jKr3cMUCxcjGUHfimWo`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
      
          />
        )
    }

    testChange( param1, param2 ) {
      console.log( param1, param2 )
    }
}

export default mapWrapped;
