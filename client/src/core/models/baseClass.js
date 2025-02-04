import APIService from '../../services/APIService.js';
import IdService from './../../services/idService.js';


export default class BaseClass {
    constructor() {
        //lets just make a service for this
        // this.json.customId = IdService.createId();
    }

    json = {
        ...this.json,
        // customId:""
    }

    getJson() {
        return this.json
    }

    setJson(obj) {
        this.json = obj
    }

    updateJson(obj, updateBackend) {
        this.json = { ...this.json, ...obj, }

        if (updateBackend){
            APIService.updateDuck(this.json._id, this.json)
        }
    }

    remove() {
        
        // this could call ApiService.js to remove this object from the db/backend
        // but for now, lets follow the pdf:


        //. Implement logical deletion, meaning the database record is not deleted, only the
        // Deleted value is set to true.
        this.json = {...this.json, deleted:true}
    }


}
