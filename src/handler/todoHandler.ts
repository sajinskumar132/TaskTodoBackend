import { RequestHandler } from "express";
import User from "../models/userModel"
import Todo from '../models/todoModel'
import { Authentication } from "../authentication/Authentication";

export const GetTodos:RequestHandler=async(req,res,next)=>{
    try {
        const { userId } = req.params
        const extractedToken = req.headers.authorization?.split(" ")[1]
        if (!extractedToken && extractedToken?.trim() === "") return res.status(401).json({ message: "Token not found" })
        const token: string | undefined = extractedToken
        let Userid=Authentication.Verify(token!,userId,res)
        if (Userid) {
            let existingUser = await User.findById(userId)
            if (!existingUser) return res.status(400).json({ data: null, message: "User not found" })
            const Todos=await Todo.find({userId})
            if(Todos){
                return res.status(200).json({ data: Todos, message: `Successfully got Todos.` })
            }else{
                return res.status(400).json({ data: Todos, message: `Failed to get todos` })
            }
        }
    } catch (error) {
        next(error)
    }
}
export const CreateNewTodo: RequestHandler = async (req, res, next) => {
    try {
        const { title, content } = req.body
        const { userId } = req.params
        const extractedToken = req.headers.authorization?.split(" ")[1]
        if (!extractedToken && extractedToken?.trim() === "") return res.status(401).json({ message: "Token not found" })
        const token: string | undefined = extractedToken
        let Userid=Authentication.Verify(token!,userId,res)
        if (Userid) {
            let existingUser = await User.findById(userId)
            if (!existingUser) return res.status(400).json({ data: null, message: "User not found" })
            const newTodo = new Todo({ userId, title, content })
            await newTodo.save()
            return res.status(201).json({ data: newTodo, message: `Successfully Created.` })
        }
    } catch (error) {
        next(error)
    }
}

export const UpdateTodo:RequestHandler=async(req,res,next)=>{
    try {
        const { title, content } = req.body
        const { userId,todoId } = req.params
        const extractedToken = req.headers.authorization?.split(" ")[1]
        if (!extractedToken && extractedToken?.trim() === "") return res.status(401).json({ message: "Token not found" })
        const token: string | undefined = extractedToken
        let Userid=Authentication.Verify(token!,userId,res)
        if (Userid) {
            let existingUser = await User.findById(userId)
            if (!existingUser) return res.status(400).json({ data: null, message: "User not found" })
            const updateTodo= await Todo.findByIdAndUpdate(todoId,{title, content},{new:true})
            if(updateTodo){
                return res.status(200).json({ data: updateTodo, message: `Updated Successfully.` })
            }else{
                return res.status(400).json({ data: null, message: `Update failed.` })
            }
        }
    } catch (error) {
        next(error)
    }
}

export const DeleteTodo:RequestHandler=async(req,res,next)=>{
    try {
        const { userId,todoId } = req.params
        const extractedToken = req.headers.authorization?.split(" ")[1]
        if (!extractedToken && extractedToken?.trim() === "") return res.status(401).json({ message: "Token not found" })
        const token: string | undefined = extractedToken
        let Userid=Authentication.Verify(token!,userId,res)
        if (Userid) {
            let existingUser = await User.findById(userId)
            if (!existingUser) return res.status(400).json({ data: null, message: "User not found" })
            const deleteTodo=await Todo.findByIdAndDelete(todoId)
            if(deleteTodo){
                return res.status(200).json({ data: null, message: `Deleted Successfully.` })
            }else{
                return res.status(400).json({ data: null, message: `Deletion failed` })
            }
        }
    } catch (error) {
        next(error)
    }
}