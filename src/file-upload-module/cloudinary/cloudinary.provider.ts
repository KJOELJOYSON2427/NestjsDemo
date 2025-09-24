
import {ConfigOptions, v2} from "cloudinary";
//factory Provider

export const CLOUDINARY={
    name:"cloudinary"
}

export const CloudinaryProvider={
    provide: CLOUDINARY.name,
    useFactory:function():typeof v2{
         v2.config({
              cloud_name:process.env.cloud_name,
              api_key:process.env.api_key,
              api_secret:process.env.api_secret
        })
        return v2;
    }
}