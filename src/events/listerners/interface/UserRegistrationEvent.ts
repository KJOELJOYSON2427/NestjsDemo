export default interface UserRegisteredEventInterface{
    user:{
        id:number;
        email:string;
        name:string;
        password:string;
    }
}