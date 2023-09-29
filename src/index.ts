import express from 'express'
import {config} from 'dotenv'
import { MongodbConnect } from './connections/MongoDbConnection'
import Router from './routes/router'
import cors from 'cors'
config()
const app=express()
app.use(cors())
app.use(express.json())

app.use('/',Router)

const startServer=()=>{
    MongodbConnect(process.env.MongoDbUrl!).then(()=>{
        app.listen(process.env.Port,()=>{
            console.log("server started")
        })
    })
}

startServer()