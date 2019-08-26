import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../Styles/NavBarHotPlaces.css'
import Axios from 'axios';
class NavBarHotPlaces extends Component { //now will be the navBar
   constructor() {
       super()
       this.state = {
       }
   }
   componentDidUpdate = async () => {
        const userName = localStorage.getItem("user")
        let data = await Axios.get(`http://localhost:8080/user/${userName}`)
        const user =   JSON.parse(data.data)
        const trip = { direction: this.props.data, center: this.props.center }
         //user.Trip = trip
        let a = await Axios.put(`http://localhost:8080/addTrip/${userName}`, user)
      }
   
   render() {
       console.log('onnnn')
       return (
           <div className='all'>
            {this.props.data.top.map(d =>  <div>{d.name}</div>)}
           </div>
       );
   }
}
export default NavBarHotPlaces;