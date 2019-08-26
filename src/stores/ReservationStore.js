import { observable} from  'mobx'


export class Reservation {
    @observable name
    @observable id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10) 
    //giving a random short string ID
    @observable numPeople
    @observable completed = false
    @observable seated = false
    constructor(name, numPeople) {
        this.name = name
        this.numPeople = numPeople
    }
}