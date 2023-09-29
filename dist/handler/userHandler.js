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
exports.Login = exports.SignUp = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, emailId, password } = req.body;
        const error = [];
        if (!userName) {
            error.push('Username is required.');
        }
        if (!emailId) {
            error.push('Email ID is required.');
        }
        if (!password) {
            error.push('Password is required.');
        }
        else if (password.length < 6) {
            error.push('Password should be at least 6 characters.');
        }
        if (error.length > 0)
            return res.status(400).json({ data: null, message: error.toString() });
        const CheckIsExists = yield userModel_1.default.findOne({ emailId });
        if (CheckIsExists)
            return res.status(400).json({ data: null, message: "User already exists" });
        const encryptPassword = (0, bcryptjs_1.hashSync)(password);
        const newUser = new userModel_1.default({ userName, emailId, password: encryptPassword });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.SecretKey, { expiresIn: '7D' });
        const responseData = {
            id: newUser._id,
            userName: newUser.userName,
            emailId: newUser.emailId,
            token: token,
        };
        return res.status(201).json({ data: responseData, message: "Sign up successfully." });
    }
    catch (error) {
        next(error);
    }
});
exports.SignUp = SignUp;
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { emailId, password } = req.body;
        const existingUser = yield userModel_1.default.findOne({ emailId });
        if (!existingUser)
            return res.status(400).json({ data: null, message: `User with this ${emailId} not found` });
        const PasswordCompare = (0, bcryptjs_1.compareSync)(password, existingUser.password);
        if (!PasswordCompare)
            res.status(400).json({ data: null, message: "Incorrect Password." });
        const token = jsonwebtoken_1.default.sign({ id: existingUser.id }, process.env.SecretKey, { expiresIn: '7D' });
        const responseData = {
            id: existingUser._id,
            userName: existingUser.userName,
            emailId: existingUser.emailId,
            token: token,
        };
        return res.status(200).json({ data: responseData, message: "login successfully." });
    }
    catch (error) {
        next(error);
    }
});
exports.Login = Login;
