import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../Styles/MyTrips.css'
import Test from "./test"
const contries = require("../country-by-name")
class MyTrips extends Component {

   constructor() {
       super()
       this.state=  {
           trips: [{name: 'Japan' , places: ['Tokyo Tower' , 'akibara'] , dates: '21.3'} ,
                   {name: 'China' , places: ['Church' , 'akibara'] , dates: '21.4'}]
       }
   }
   render() {
       return (
          <div className='Trips'>
             <h1 id="h1">Here You can manage all your trips and update:</h1>
             {this.state.trips.map(trip =>
             <div className='trip'>
             <h1>{trip.name}</h1>
             <h2>places : {trip.places.map(place => <div>{place}</div>)}</h2>
             <div>Date you choose to trvel: {trip.dates}</div>
             </div>
               )}
          </div>
       );
   }

// <<<<<<< HEAD
//                     {this.state.trips.map(trip =>
//                         <div className='trip'>
//                             <div className='tripTitle'>{trip.name}</div>
//                             <h2 className='infoPlaces'>places : {trip.places.map(place => <span>{place} , </span>)}</h2>
//                             <div>Date you choose to trvel: {trip.dates}</div>
//                             <a class="waves-effect waves-light btn-small"><i class="fas fa-route"></i>  Start Travel!</a>

//                         </div>
//                     )}
//                 </div>
//             </div>
//         );
//     }
// =======
// >>>>>>> master
}
export default MyTrips;