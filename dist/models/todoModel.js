"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TodoModel = new mongoose_1.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Todo', TodoModel);
