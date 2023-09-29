import express from "express";
import { Login, SignUp } from "../handler/userHandler";
import { CreateNewTodo, DeleteTodo, GetTodos, UpdateTodo } from "../handler/todoHandler";

const Router=express.Router()

Router.post("/signup",SignUp)
Router.post("/login",Login)

Router.get('/:userId/todos',GetTodos)
Router.post('/:userId/createNewTodo',CreateNewTodo)
Router.put('/:userId/:todoId/updateTodo',UpdateTodo)
Router.delete(`/:userId/:todoId/deleteTodo`, DeleteTodo)

export default Router