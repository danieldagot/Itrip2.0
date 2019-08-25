import { observable, computed, action , runInAction } from 'mobx'
import axios from "axios"
export class User {
  @observable user
  // @computed user2 = this.loadUser()
  // @action loadUser = async () => {
  //   const userName = localStorage.getItem("user")
  //   let data = await axios.get(`http://localhost:8080/user/${userName}`)
  //   this.user.set(data.data)



  //   console.log(this.user);


  // }
  // @action getUser = () => {
  //   return this.user
  // }


  @action
  async fetchProjects() {
    this.githubProjects = []
    this.state = "pending"
    try {
      const userName = localStorage.getItem("user")
      let data = await axios.get(`http://localhost:8080/user/${userName}`)
      // after await, modifying state again, needs an actions:
      runInAction(() => {
        this.state = "done"
        console.log(data.data);
        this.user =  data.data
        console.log(this.user.Age);
        
      })
    } catch (error) {
      runInAction(() => {
        this.state = "error"
      })
    }
  }

}