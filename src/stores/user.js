import { observable, computed, action } from 'mobx'
import axios from "axios"
export default class User {
  @observable user = {}
  @action loadUser = async () => {
    const userName = localStorage.getItem("user")
    let data = await axios.get(`http://localhost:8080/user/${userName}`)
    let user = data.data
    this.user = user
  }
}