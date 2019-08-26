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
    componentDidMount = async () => {
        const userName = localStorage.getItem("user")
        let data = await Axios.get(`http://localhost:8080/user/${userName}`)
        let user = data.data
        let trip = this.props.data
        user.Trips.push(trip)
        console.log(user.Trips);
        let a = await Axios.put(http://localhost:8080/addTrip/${userName}, user)
   return(a.data)
    }
    render() {
        return (
            <div className='all'>
                {this.props.data.top.map(d => <div>{d.name}</div>)}
            </div>
        );
    }
}
export default NavBarHotPlaces;