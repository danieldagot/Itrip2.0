import { observable, computed, action } from 'mobx'
import axios from "axios"
export class Item {
  @observable user = {}

  @action loadUser = async () => {
    let data = await axios.get(`http://localhost:8080/user/${userName}`)
    let user = data.data
    this.user = user
  }

}