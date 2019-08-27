import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//import Option from './Option'
import '../Styles/Myprogress.css'
import { observer, inject } from 'mobx-react'
const { withScriptjs, withGoogleMap, GoogleMap,geometry } = require("react-google-maps");
@observer

@inject("user")

class MyProgress extends Component {
    constructor() {
        super()
        this.state = {
            game: ['player', 1, 2, 3, 4],
            placesNum: 0,
            tripCoins: 0,//every 7 places will be levelUp & 2 tripCoins
            user: {},
            currentLating: {} , 
            PlaceLating: {}

        }
    }
    // checkPlaceOfPlayer = () => { //checking where the player is
    //     if (placesNum % 7 == 0){
    //         for(let i=0 ; i < 5 ; i++) {
    //             // this.state.
    //         }
    //     }
    // }

    checkIfIsInPlace = () => {
        // if(this.getDistance(this.state.currentLating , this.state.PlaceLating) ){ 

        //     let numOfPlaces = this.state.placesNum + 1
        //     this.setState({ placesNum: numOfPlaces })
        //     this.checkPlaceOfPlayer()
        // }
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        
      console.log(this.getDistance(this.state.user.Trips[1].latLng , this.state.user.Trips[1].top[1].geometry.location ));
      geometry.spherical.computeDistanceBetween(this.state.user.Trips[1].latLng,this.state.user.Trips[1].top[1].geometry.location)
    }


    async componentDidMount() {
        await this.props.user.fetchProjects()
        console.log(this.props.user.user);

        console.log(this.props.user.user.Trips);
        
        this.setState({ user: this.props.user.user }, function (
    ) { console.log(
        this.state.user.Trips[1].latLng,
        this.state.user.Trips[1].top[1].geometry.location

    );})
    this.checkIfIsInPlace()
    }




    rad = (x) => {
        return x * Math.PI / 180;
    };

    getDistance = (p1, p2) => {
        console.log(p1,p2);
        
        var R = 6378137; // Earth’s mean this.radius in meter
        var dLat = this.rad(p2.lat - p1.lat);
        var dLong = this.rad(p2.lng - p1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meter
    };

    render() {
       // console.log( this.getDistance(this.state.user.Trips[1].latLng, this.state.user.Trips[1].top[1].geometry) )
        // await this.props.user.fetchProjects()
       
        return (
            <div className='game'>
                <div className='userInfo'>
                    <div>User Name: {this.state.user ? this.state.user.UserName : null}</div>
                    <div>Your Points: XP: {this.state.user ? this.state.user.Xp : null}</div>

                </div>
                <div className='game'>

                </div>
            </div>
        );
    }
}

export default MyProgress;