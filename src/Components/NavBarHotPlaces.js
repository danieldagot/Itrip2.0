import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../Styles/NavBarHotPlaces.css'
class NavBarHotPlaces extends Component { //now will be the navBar
   constructor() {
       super()
       this.state = {
       }
   }
   render() {
       return (
           <div className='all'>
            {this.props.data.map(d =>  <div>{d.name}</div>)}
           </div>
       );
   }
}
export default NavBarHotPlaces;