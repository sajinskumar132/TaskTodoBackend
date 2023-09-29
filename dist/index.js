"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const MongoDbConnection_1 = require("./connections/MongoDbConnection");
const router_1 = __importDefault(require("./routes/router"));
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', router_1.default);
const startServer = () => {
    (0, MongoDbConnection_1.MongodbConnect)(process.env.MongoDbUrl).then(() => {
        app.listen(process.env.Port, () => {
            console.log("server started");
        });
    });
};
startServer();
