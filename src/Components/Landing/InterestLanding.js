import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//import Option from './Option'
import '../../Styles/InterestLanding.css'

import axios from "axios"
class InterestLanding extends Component {
    constructor() {
        super()
        this.state = {
            data: {
                Food: false,
                Extreme: false,
                Nature: false,
                Art: false,
                Night: false,
                Beauty: false,
            },
        }
    }



    cliced = (event) => {
        let url = event.target.getAttribute("val")
        let data2 = this.state
        data2[url] = !data2[url]

        this.setState({ data: data2 }, function () {
            //console.log(this.state.data);
        })
    }
    next = async () => {
        //let interest = this.state.map(f => f != false)
        console.log(this.state);
        const userName = localStorage.getItem("user")

        let data = await axios.get(`http://localhost:8080/user/${userName}`)
        let user = data.data
        console.log(this.state.data);
        let interest = []
        for (const key in this.state.data) {
            if (this.state.data[key] && key != "data") {

                interest.push(key)
            }
            
            user.Interest = interest
            let a = await axios.put(`http://localhost:8080/addIntrest/${userName}`,user)
            localStorage.setItem("loged", 2)
          
            window.location.pathname = '/Home'

        }
        // await axios.put("http://localhost:8080/addUser", client).then(function (res) {
        //     console.log(res)
        //     localStorage.setItem("loged", 2)
        //     localStorage.setItem("user", res.data.UserName)
        //     window.location.pathname = '/InterestLanding'
        // }
    }

    render() {
        return (
            <div>
                <div>
                    <div id='MainTitle'>Now , choose how your trip will look like :</div>
                    {/* <h2>The trip will include all the classic places by defult</h2> */}
                    <div className='All'> All </div>

                </div>
                <div className='allPlaces'>
                    <div onClick={this.cliced} val='Food' className='Food'> Food </div>
                    <div onClick={this.cliced} val='Extreme' className='Extreme'> Extreme </div>
                    <div onClick={this.cliced} val='Nature' className='Nature'> Nature </div>
                    <div onClick={this.cliced} val='Art' className='Art'> Art </div>
                    <div onClick={this.cliced} val='Night' className='Night'> Night Life </div>
                    <div onClick={this.cliced} val='Beauty' className='Beauty'> Beauty </div>
                </div>
                <button onClick={this.next} id= "Next" class="btn waves-effect waves-light" type="submit" name="action">Next
   <i class="material-icons right">send</i>
 </button>
            </div >
        );
    }
}

export default InterestLanding;