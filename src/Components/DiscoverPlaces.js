import React, { Component } from 'react';
import '../Styles/DiscoverPlaces.css'
import axios from "axios"
// import '../Styles/Home.css'
import PlacesAutocomplete, {
 geocodeByAddress,
 getLatLng,
} from 'react-places-autocomplete';
class DiscoverPlaces extends Component {
 constructor() {
     super()
     this.state= {
      address: '',
      data: "",
      dataArray:[]
     }
 }
  getData = async () => {
     let country = this.state.address
     console.log(this.state.address)
     let response= await axios.get(`http://localhost:8080/wikipedia/${country}`)
      let data =JSON.stringify(response.data[2])
       let array = data.split('.').slice(10).join('')
      this.setState({ data: array }, function () {
      // console.log(this.state.data)
  })
   }
  handleChange = address => {
      this.setState({ address },function(){console.log(this.state.address)})
    };
    addItem = (e) => {
      if (e.key === 'Enter') {
        this.getData()
      }
    }
 render() {
     return (
        <div className='container'>
        <div id='title'>Here you can search , get information and add to your trip places in the world</div>
        <div id="all" >
       <PlacesAutocomplete
         value={this.state.address}
         onChange={this.handleChange}
          onSelect={this.handleChange}
          onKeyDown={this.addItem}
        >
         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
           <div >
             <input
               {...getInputProps({
                 placeholder: 'Search Places ...',
                 className: 'location-search-input',
               })}
             />
             <div className="autocomplete-dropdown-container">
               {loading && <div>Loading...</div>}
               {suggestions.map(suggestion => {
                 const className = suggestion.active
                   ? 'suggestion-item--active'
                   : 'suggestion-item';
                 // inline style for demonstration purpose
                 const style = suggestion.active
                   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                   : { backgroundColor: '#ffffff', cursor: 'pointer' };
                 return (
                   <div
                     {...getSuggestionItemProps(suggestion, {
                       className,
                       style,
                     })}
                   >
                     <span>{suggestion.description}</span>
                   </div>
                 );
               })}
             </div>
           </div>
         )}
       </PlacesAutocomplete>
       {/* <button onClick={this.getData} class="btn waves-effect waves-light" type="submit" name="action">Search
   <i class="material-icons right">send</i>
 </button> */}
 <a  onClick={this.getData} type="submit" name="action" class="waves-effect waves-light btn-small"><i class='serchA' class="fas fa-search-location"></i>  Start !</a>

    <span id="box">
       <div id="text">{this.state.data}</div>
      </span>
      </div>
         </div>
     );
 }
}
export default DiscoverPlaces;