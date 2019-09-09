import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//import Option from './Option'
import '../../Styles/InterestLanding.css'

import axios from "axios"
const URL_KEY=""

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
        

        this.setState({ data: data2 })
      
    }
    next = async () => {
        //let interest = this.state.map(f => f != false)
        console.log(this.state);
        const userName = localStorage.getItem("user")

        let data = await axios.get(`${URL_KEY}/user/${userName}`)
        let user = data.data
        console.log(this.state.data);
        let interest = []
        for (const key in this.state.data) {
            if (this.state.data[key] && key != "data") {

                interest.push(key)
            }
            
            user.Interest = interest
            let a = await axios.put(`${URL_KEY}/addIntrest/${userName}`,user)
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
                    <div onClick={this.cliced} val='Food' className={this.state.data.Food?'Food2':'Food'}> Food </div>
                    <div onClick={this.cliced} val='Extreme' className={this.state.data.Extreme?'Extreme2':'Extreme'}> Extreme </div>
                    <div onClick={this.cliced} val='Nature' className={this.state.data.Nature?'Nature2':'Nature'}> Nature </div>
                    <div onClick={this.cliced} val='Art' className={this.state.data.Art?'Art2':'Art'}> Art </div>
                    <div onClick={this.cliced} val='Night' className={this.state.data.Night?'Night2':'Night'}> Night Life </div>
                    <div onClick={this.cliced} val='Beauty' className={this.state.data.Beauty?'Beauty2':'Beauty'}> Beauty </div>
                </div>
                <button onClick={this.next} id= "Next" class="btn waves-effect waves-light" type="submit" name="action">Next
   <i class="material-icons right">send</i>
 </button>
            </div >
        );
    }
}

export default InterestLanding;