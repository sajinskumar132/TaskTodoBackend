import { connect } from "mongoose"

export const MongodbConnect=async(url:string)=>{
    try{
        await connect(url).then(()=>{
            console.log("MongoDbConnected")
        })
    }catch(error){
        console.log(error)
    }
}