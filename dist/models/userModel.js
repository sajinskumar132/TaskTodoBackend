"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserModel = new mongoose_1.Schema({
    userName: { type: String, required: true },
    emailId: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", UserModel);
