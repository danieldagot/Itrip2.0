import React, { Component } from 'react';
import '../../Styles/Landing.css'
import axios from "axios"
// import Options from './Options'
const contries = require("../../country-by-name")
class Landing extends Component {
   constructor() {
       super()
       this.state = {
           User: "",
           Age: 0,
           Country: "",
           Gender: "",
           interested: [],
           finishedDetails: 0
       }
   }
   addNewInput = (event) => {
       let nameVal = event.target.value
       let input = event.target.name
       this.setState({ [input]: nameVal })
   }
   // updateInput = (event) => { //update the input in the state
   //     let nameVal = event.target.value //the value of the current input
   //     let input = event.target.name //email/sold/owner
   //     input === "client" ?
   //         this.setState({ name: nameVal }) :
   //         this.setState({ category: input, value: nameVal }, function () { console.log(input + nameVal) })
   // }
   addClient = async () => {
       let client = {
           "UserName": this.state.Name,
           "Country": this.state.Country,
           "Gender": this.state.Gender,
           'Age': this.state.Age
       }
       await axios.post("http://localhost:8080/addUser", client).then(function (res) {
           console.log(res)
           localStorage.setItem("loged", 1)
           localStorage.setItem("user", res.data.UserName)
           window.location.pathname = '/InterestLanding'
       })
   }
   render() {
       return(
        <div className='container'>
           <div id="MainTitle">
               Hey There, Welcome to<br></br><img src = 'https://media.giphy.com/media/h81EQBKGXH8L5i3nv3/giphy.gif' ></img>
           </div>
           <div className="add">
               <div className="input">Full Name:
                <input  name="Name" onChange={this.addNewInput} placeholder="Your Name" />
               </div>
               <div className="input">age :
                <input  name="Age" onChange={this.addNewInput} placeholder="Your Age" />
               </div>
               <div className="input">Country :
                <input  name="Country" list="options" onChange={this.addNewInput} placeholder="Your Country" />
                   <datalist id="options">
                       {contries.map(country => < option value={country.country} placeholder={country.country} />)}
                   </datalist>
               </div>
               <div  className="input">Gender :
               <input name="Gender" onChange={this.addNewInput} placeholder="Your Gender" />
               </div>
               {/* <button onClick={this.addClient}>Continue!</button> */}
               <a onClick={this.addClient} id="Continue" class="waves-effect waves-light btn-large"><i class="material-icons right">flight_takeoff</i>Continue!</a>
           </div>
       </div>
        ) }
}
export default Landing;