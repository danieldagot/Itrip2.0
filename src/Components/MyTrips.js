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
    this.setState({trips: this.props.user.user.Trips},function(){
        console.log(this.state.trips)
    })
    
    }

    type = (obj) => {
        let interest=[]
        for (const key in obj["type"]) {
            if (obj["type"][key]) {
              interest.push(<div>{key}  <br></br><i class="fas fa-plus"></i> <i class="fas fa-minus"></i></div>)
            }
       }
       return interest
    }

    top = (obj) => {
        let Top=[]
        for (const key in obj["top"]) {
            if (obj["top"][key]) {
               Top.push(<div>{(obj["top"][key]["name"])}  <br></br><i class="fas fa-plus"></i> <i class="fas fa-minus"></i></div>)
            }
       }
       return Top
    }

   render() {
       let trip = this .state.trips
       return (
          <div>
               <div className='titleMyTrip'>Here You can manage all your trips and update:</div>
                    <div className='tripTitle' >
                        <div  className='Trips'>
                    {trip.map(m=>
                      <div className='trip'>
                    <h4>{m.address}</h4>
                    <div id="grid">
                    <h5>Your interest</h5>
                    <h5>Your places</h5>
                    <div className="interest">{this.type(m)}</div>
                    <div className="places">{this.top(m)}</div>
                  

                    </div>
                    <a className="waves-effect waves-light btn-small"><i class="fas fa-route"></i>  Start Travel! to {m.address}</a>
                    </div>
                    )}
                    </div>
                    </div>
          </div>
       );
   }

}
export default MyTrips;
        
// [{name: 'Japan' , places: ['Tokyo Tower' , 'akibara'] , dates: '21.3'} ,
// {name: 'China' , places: ['Church' , 'akibara'] , dates: '21.4'}]

