import {Response } from 'express'
import jwt from 'jsonwebtoken'
export class Authentication{

    static Verify=(token:string,userId:string,res:Response)=>{
        let Userid
        jwt.verify(token!, process.env.SecretKey!, (err: any, decrypt: any) => {
            if (err) {
                console.log(err)
                return res.status(401).json({ data: null, message: `${err.message}` })
            } else {
                if (decrypt.id === userId) {
                    Userid = userId
                }
            }
        })
        return Userid
    }

}