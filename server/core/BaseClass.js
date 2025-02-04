export default class BaseClass {



   json = {
     
   }

   getCharge(cost) {
      return cost * this.json.mod
   }

   getJson() {
      return this.json;
   }

   setJson(obj) {
      this.json = obj
   }

   updateJson(obj) {
      this.json = { ...this.json, ...obj, }
   }

   

}