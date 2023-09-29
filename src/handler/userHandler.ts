import { RequestHandler } from "express";
import User from '../models/userModel'
import { compareSync, hashSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const SignUp: RequestHandler = async (req, res, next) => {
    try {
        const { userName, emailId, password } = req.body
        const error = []
        if (!userName) {
            error.push('Username is required.')
        }
        if (!emailId) {
            error.push('Email ID is required.')
        }
        if (!password) {
            error.push('Password is required.')
        } else if (password.length < 6) {
            error.push('Password should be at least 6 characters.')
        }
        if (error.length > 0) return res.status(400).json({ data: null, message: error.toString() })
        const CheckIsExists = await User.findOne({ emailId })
        if (CheckIsExists) return res.status(400).json({ data: null, message: "User already exists" })
        const encryptPassword = hashSync(password)
        const newUser = new User({ userName, emailId, password: encryptPassword })
        await newUser.save()
        const token=jwt.sign({id:newUser.id},process.env.SecretKey!,{expiresIn:'7D'})
        const responseData = {
            id: newUser._id,
            userName: newUser.userName,
            emailId: newUser.emailId,
            token: token,
          };
        return res.status(201).json({ data: responseData, message: "Sign up successfully." })
    } catch (error) {
        next(error)
    }
}

export const Login: RequestHandler = async (req, res, next) => {
    try {
        const { emailId, password } = req.body
        const existingUser = await User.findOne({ emailId })
        if (!existingUser) return res.status(400).json({ data: null, message: `User with this ${emailId} not found` })
        const PasswordCompare = compareSync(password, existingUser.password)
        if(!PasswordCompare) res.status(400).json({ data: null, message: "Incorrect Password." })
        const token=jwt.sign({id:existingUser.id},process.env.SecretKey!,{expiresIn:'7D'})
        const responseData = {
            id: existingUser._id,
            userName: existingUser.userName,
            emailId: existingUser.emailId,
            token: token,
          };
        return res.status(200).json({ data:responseData, message: "login successfully." })
    } catch (error) {
        next(error)
    }

}