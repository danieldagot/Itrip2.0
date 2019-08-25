import { observable, computed, action } from 'mobx'
import axios from "axios"
export  class User {
  @observable user = {}
  // @computed user2 = this.loadUser()
  @action loadUser = async () => {
    const userName = localStorage.getItem("user")
    let data = await axios.get(`http://localhost:8080/user/${userName}`)
    let user = data.data
    console.log(user);
    
    this.user  =  user
    console.log(this.user);
    
  }
}