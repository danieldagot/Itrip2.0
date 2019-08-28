import React, { Component,useState, useEffect } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
  import mapStyles from "../mapStyles";
  import "../Styles/Home.css";
  import axios from 'axios';



  class mapWrapped extends Component {
    constructor() {
        super()
        this.state = {
          latInfo:0,
          lngInfo:0,
          nameInfo:'',
          name:''
        }
    }
    
//  disc = (p) => {
//   let p2 = p.replace(" " ,"_")
//   console.log(p2)
//   let data = axios.get(`/wikipedia/${p2}`)
//   data.then(d => {
//     this.state.name=d.data.short
//     debugger
//     console.log( this.state.name)
//   })
// }

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
              {this.props.state.top !== undefined?  this.props.state.top.map(place => 
           
              (
              <Marker
                position={{
                  lat: place.geometry.location.lat,
                  lng: place.geometry.location.lng
                }}
                onClick={() => {
                  setSelectedPark(place);

                }}
                icon={{
                  url: `/skateboarding.svg`,
                  scaledSize: new window.google.maps.Size(25, 25)
                }}
                
              />
            )
            ):null}
            {/* {selectedPark ? this.disc(selectedPark.name) : null} */}
           {selectedPark ? 
           <InfoWindow
              onClick={this.openWindow}
                onCloseClick={() => {
                  setSelectedPark(null);
                }}
                position={{
                  lat: selectedPark.geometry.location.lat,
                  lng: selectedPark.geometry.location.lng
                }}
              >
                <div>
                  <h2 id="infoWindow">{selectedPark.name}</h2>
                  {/* <div>{this.state.name}</div> */}
                </div>
              </InfoWindow>: null
             }
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
