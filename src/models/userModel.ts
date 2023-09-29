import { Schema, model } from "mongoose";

const UserModel=new Schema({
    userName:{type:String,required:true},
    emailId:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6}
},{timestamps:true})

export default model("User",UserModel)