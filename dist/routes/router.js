"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userHandler_1 = require("../handler/userHandler");
const todoHandler_1 = require("../handler/todoHandler");
const Router = express_1.default.Router();
Router.post("/signup", userHandler_1.SignUp);
Router.post("/login", userHandler_1.Login);
Router.get('/:userId/todos', todoHandler_1.GetTodos);
Router.post('/:userId/createNewTodo', todoHandler_1.CreateNewTodo);
Router.put('/:userId/:todoId/updateTodo', todoHandler_1.UpdateTodo);
Router.delete(`/:userId/:todoId/deleteTodo`, todoHandler_1.DeleteTodo);
exports.default = Router;
