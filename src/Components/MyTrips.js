import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../Styles/MyTrips.css'
import Test from "./test"
const contries = require("../country-by-name")

class MyTrips extends Component {
  

    render() {
        return (
           <div className='addTrip'>
              
               

               {/* <span className='addTrip'> <a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>Add Trip</span>
               <div className="add">
                
            
                <div className="input">Country :
                 <input name="Country" list="options" onChange={this.addNewInput} placeholder="Your Country" />
                    <datalist id="options">
                       { contries.map(country => < option value={country.country} placeholder = {country.country} />)}
                    </datalist>
                </div>
                
            </div> */}

           </div>
        );
    }
}

export default MyTrips;