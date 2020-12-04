const Book = require("../models/Books");
const Hadit = require("../models/Hadits");
const { json, errorJson } = require('../utils/response');

exports.index = async (req, res) => {
    try {
        let books = await Book.find({}).select({ "id": 1, "available": 1, "name": 1, "_id": 0});
        return json(res, books);
    } catch (error) {
        return errorJson(res, error);
    }
};

exports.show = (req, res) => {
    res.json({
        message: "show here",
    });
};

exports.detail = (req, res) => {
    res.json({
        message: "detail here",
    });
};
