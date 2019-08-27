import React, { Component } from "react";

import './Styles/app.css';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import axios from "axios"
import MapPlaces from './Components/MapPlaces'

import InterestLanding from './Components/Landing/InterestLanding'
import Home from "./Components/Home/Home"
import Landing from './Components/Landing/Landing'
import MyTrips from './Components/MyTrips'
import DiscoverPlaces from './Components/DiscoverPlaces'
import MyProgress from './Components/MyProgress'
import AddTrip from './Components/Home/AddTrip'
import { observer,inject } from 'mobx-react'
import Test from "./Components/test";

var dotenv = require('dotenv')
@inject("user")
@observer




class App extends Component {

  constructor() {
    super()
    this.state = {
      popup: false
    }
  }

  popup = () => {
    this.setState({ popup: !this.popup })
  }
  async componentDidMount() {
  await  this.props.user.fetchProjects()
  }

  render() {
    console.log(localStorage.getItem("loged"));

    return (<Router>
      <div>
        <nav>
          <div className="nav-wrapper">

            <a href="#" className="brand-logo right"><img src='https://media.giphy.com/media/XBFhuEE9yZBXRdxwis/giphy.gif' width='150px' height='70px'></img></a>

            <ul id="nav-mobile" className="left hide-on-med-and-down">
              <li> <Link to="/">Home</Link></li>
              <li><Link to="/MyTrips">My Trips</Link></li>
              <li><Link to="/DiscoverPlaces">Discover Places</Link></li>
              <li><Link to="/MyProgress">My Progress</Link></li>
              <li><Link to="/Landing">Landing</Link></li>
              <li><Link to="/InterestLanding">InterestLanding</Link></li>

            </ul>
          </div>
        </nav>


        <div className="App">

          {localStorage.getItem("loged") == null ? <Route path="/" exact render={() => (<Redirect to="/Landing" />)} /> : localStorage.getItem("loged") != 2 ? <Route path="/" exact render={() => (<Redirect to="/InterestLanding" />)} /> : <Route path="/" exact render={() => (<Redirect to="/Home" />)} />}
          <Route path="/test" exact render={() => <Test />} />
          <Route path="/MyTrips" exact render={() => <MyTrips />} />
          <Route path="/DiscoverPlaces" exact render={() => <DiscoverPlaces />} />
          <Route path="/MyProgress" exact render={() => <MyProgress />} />
          <Route path="/Landing" exact render={() => <Landing />} />
          <Route path="/InterestLanding" exact render={() => <InterestLanding />} />
          <Route path="/Home" exact render={() => <Home />} />

        </div>

      </div>
    </Router>
    );
  }

}

export default App
