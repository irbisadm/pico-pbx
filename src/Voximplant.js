export default class Voximplant{
 static _instance;
 constructor(){
   if(Voximplant._instance){
     console.warn('You can\'t create new instance of the Voximplant integration object. Use Voximplant.get()')
   }else{
     Voximplant._instance = this;
   }
 }

 static get(){
   if(typeof Voximplant._instance === "undefined")
     Voximplant._instance = new Voximplant();
   return Voximplant._instance;
 }

 checkAuth(){
   return true;
 }

}
