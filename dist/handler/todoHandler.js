"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTodo = exports.UpdateTodo = exports.CreateNewTodo = exports.GetTodos = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const todoModel_1 = __importDefault(require("../models/todoModel"));
const Authentication_1 = require("../authentication/Authentication");
const GetTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params;
        const extractedToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!extractedToken && (extractedToken === null || extractedToken === void 0 ? void 0 : extractedToken.trim()) === "")
            return res.status(401).json({ message: "Token not found" });
        const token = extractedToken;
        let Userid = Authentication_1.Authentication.Verify(token, userId, res);
        if (Userid) {
            let existingUser = yield userModel_1.default.findById(userId);
            if (!existingUser)
                return res.status(400).json({ data: null, message: "User not found" });
            const Todos = yield todoModel_1.default.find({ userId });
            if (Todos) {
                return res.status(200).json({ data: Todos, message: `Successfully got Todos.` });
            }
            else {
                return res.status(400).json({ data: Todos, message: `Failed to get todos` });
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.GetTodos = GetTodos;
const CreateNewTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { title, content } = req.body;
        const { userId } = req.params;
        const extractedToken = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
        if (!extractedToken && (extractedToken === null || extractedToken === void 0 ? void 0 : extractedToken.trim()) === "")
            return res.status(401).json({ message: "Token not found" });
        const token = extractedToken;
        let Userid = Authentication_1.Authentication.Verify(token, userId, res);
        if (Userid) {
            let existingUser = yield userModel_1.default.findById(userId);
            if (!existingUser)
                return res.status(400).json({ data: null, message: "User not found" });
            const newTodo = new todoModel_1.default({ userId, title, content });
            yield newTodo.save();
            return res.status(201).json({ data: newTodo, message: `Successfully Created.` });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.CreateNewTodo = CreateNewTodo;
const UpdateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { title, content } = req.body;
        const { userId, todoId } = req.params;
        const extractedToken = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1];
        if (!extractedToken && (extractedToken === null || extractedToken === void 0 ? void 0 : extractedToken.trim()) === "")
            return res.status(401).json({ message: "Token not found" });
        const token = extractedToken;
        let Userid = Authentication_1.Authentication.Verify(token, userId, res);
        if (Userid) {
            let existingUser = yield userModel_1.default.findById(userId);
            if (!existingUser)
                return res.status(400).json({ data: null, message: "User not found" });
            const updateTodo = yield todoModel_1.default.findByIdAndUpdate(todoId, { title, content }, { new: true });
            if (updateTodo) {
                return res.status(200).json({ data: updateTodo, message: `Updated Successfully.` });
            }
            else {
                return res.status(400).json({ data: null, message: `Update failed.` });
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.UpdateTodo = UpdateTodo;
const DeleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { userId, todoId } = req.params;
        const extractedToken = (_d = req.headers.authorization) === null || _d === void 0 ? void 0 : _d.split(" ")[1];
        if (!extractedToken && (extractedToken === null || extractedToken === void 0 ? void 0 : extractedToken.trim()) === "")
            return res.status(401).json({ message: "Token not found" });
        const token = extractedToken;
        let Userid = Authentication_1.Authentication.Verify(token, userId, res);
        if (Userid) {
            let existingUser = yield userModel_1.default.findById(userId);
            if (!existingUser)
                return res.status(400).json({ data: null, message: "User not found" });
            const deleteTodo = yield todoModel_1.default.findByIdAndDelete(todoId);
            if (deleteTodo) {
                return res.status(200).json({ data: null, message: `Deleted Successfully.` });
            }
            else {
                return res.status(400).json({ data: null, message: `Deletion failed` });
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.DeleteTodo = DeleteTodo;
