import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../Styles/MyTrips.css'
import Test from "./test"
import { observer,inject } from 'mobx-react'
const contries = require("../country-by-name")

@inject("user")
@observer
class MyTrips extends Component {

   constructor() {
       super()
       this.state=  {
           trips: []
       }
   }

   async componentDidMount() {
    await  this.props.user.fetchProjects()
    this.setState({trips: this.props.user.user},function(){
        console.log(this.state.trips)
    })
    
    }
  

   render() {
       let trip = this .state.trips
       return (
          <div>
               <div className='titleMyTrip'>Here You can manage all your trips and update:</div>
               <div  className='Trips'>
               <div className='trip'>
                    <div className='tripTitle' >{trip.Country}</div>
                    {/* <div>{trip.Interest.map(m=><div>{m}</div>)} </div> */}
             {/* <h2 className='infoPlaces'>places : {trip.places.map(place => <span>{place} , </span>)}</h2> */}
             {/* <div>Date you choose to trvel: {trip.dates}</div> */}
             <a class="waves-effect waves-light btn-small"><i class="fas fa-route"></i>  Start Travel!</a>
             </div>
               </div>
          </div>
       );
   }

}
export default MyTrips;
        
// [{name: 'Japan' , places: ['Tokyo Tower' , 'akibara'] , dates: '21.3'} ,
// {name: 'China' , places: ['Church' , 'akibara'] , dates: '21.4'}]

