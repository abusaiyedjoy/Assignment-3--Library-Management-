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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const Book_Model_1 = require("./../Model/Book.Model");
const ZodValidation_1 = require("../validation/ZodValidation");
exports.router = express_1.default.Router();
// Add a new Book
exports.router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = yield ZodValidation_1.bookZodSchema.parseAsync(req.body);
        const book = yield Book_Model_1.Book.create(body);
        const _a = book.toObject(), { _id } = _a, data = __rest(_a, ["_id"]);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: Object.assign({ _id }, data),
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create book",
            error: error,
        });
    }
}));
// Get all books
exports.router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterByGenre = req.query.filter;
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sortOrder || "desc";
        const limit = parseInt(req.query.limit) || 10;
        const filter = {};
        if (filterByGenre) {
            filter.genre = filterByGenre;
        }
        if (filter) {
            const books = yield Book_Model_1.Book.find(filter)
                .limit(limit)
                .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 });
            res.status(200).json({
                success: true,
                message: "Books retrieved successfully",
                data: books,
            });
        }
        else {
            const books = yield Book_Model_1.Book.find();
            res.status(200).json({
                success: true,
                message: "Books retrieved successfully",
                data: books,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error: error,
        });
    }
}));
// Get a single book
exports.router.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const book = yield Book_Model_1.Book.findById(id);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve book",
            error: error,
        });
    }
}));
// Update a book
exports.router.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const body = req.body;
        const book = yield Book_Model_1.Book.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update book",
            error: error,
        });
    }
}));
// Delete a book
exports.router.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        yield Book_Model_1.Book.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete book",
            error: error,
        });
    }
}));
