
import { observable, computed, action, runInAction } from 'mobx'
import axios from "axios"
export class User {
  @observable user
  @observable top

  @action
  async fetchProjects() {
    this.githubProjects = []
    this.state = "pending"
    try {
      const userName = localStorage.getItem("user")
      let data = await axios.get(`/user/${userName}`)
      // after await, modifying state again, needs an actions:
      runInAction(() => {
        this.state = "done"
        // console.log(data.data);
        this.user = data.data
        // console.log(this.user.Age);

      })
    } catch (error) {
      runInAction(() => {
        this.state = "error"
      })
    }

  }
  @action setTop = (data) => {
    this.top = data
    console.log(this.top);


  }

  @action getTop = () => {
    return this.top
  }

}
