import { Schema, model } from "mongoose";

const TodoModel=new Schema({
    userId:{type:String,required:true},
    title:{type:String,required:true},
    content:{type:String,required:true}
},{timestamps:true})

export default model('Todo',TodoModel)