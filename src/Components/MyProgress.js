import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//import Option from './Option'
import '../Styles/Myprogress.css'

class MyProgress extends Component {
    constructor() {
        super()
        this.state = {
            game: [0, 1, 2, 3, 4] , 
            placesNum: 0,
            tripCoins: 0 ,//every 7 places will be levelUp & 2 tripCoins
            latCurrentPlace: 31,
            lngCurrentPlace: 33,
            latNewPlace: 32,
            lngNewPlace: 34
        }
    }
     rad = (x) => {
        return x * Math.PI / 180;
      };
      
       getDistance = (p1, p2) => {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = rad(p2.lat() - p1.lat());
        var dLong = rad(p2.lng() - p1.lng());
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
          Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meter
      };

    render() {
        return (
            <div className='game'>
                <div className='userInfo'>
                    User Name: user
                    Your Pints: XP
                </div>
                <div className='game'>

                </div>
            </div>
        );
    }
}

export default MyProgress;