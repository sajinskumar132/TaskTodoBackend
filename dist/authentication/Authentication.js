"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authentication {
}
exports.Authentication = Authentication;
Authentication.Verify = (token, userId, res) => {
    let Userid;
    jsonwebtoken_1.default.verify(token, process.env.SecretKey, (err, decrypt) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ data: null, message: `${err.message}` });
        }
        else {
            if (decrypt.id === userId) {
                Userid = userId;
            }
        }
    });
    return Userid;
};
