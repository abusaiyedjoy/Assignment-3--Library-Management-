"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Book_Controller_1 = require("./app/controller/Book.Controller");
const Borrow_Controller_1 = require("./app/controller/Borrow.Controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/books', Book_Controller_1.router);
app.use('/api/borrow', Borrow_Controller_1.borrowRouter);
app.get("/", (req, res) => {
    res.send("Hello World");
});
exports.default = app;
