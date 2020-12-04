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

exports.show = async (req, res) => {
    try {
        let book = req.params.book;
        checkBook = await Book.findOne({ id: book });
        if(!checkBook) return errorJson(res, 'Book not found!', 404);

        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const total = await Hadit.find({ book }).countDocuments();
        const hadits = await Hadit.find({ book }).select({"_id": 0, "arab": 1, "id": 1, "number": 1})
            .skip(skip)
            .limit(parseInt(limit))
            .sort([['number', 1]])
            .exec();

        if(total === 0) return errorJson(res, `Hadith not found`, 404);

        return json(res, {
            page: parseInt(page),
            limit: parseInt(limit),
            last_page: Math.ceil(total / limit),
            hadits
        });
    } catch (error) {
        return errorJson(res, error);
    }
};

exports.detail = (req, res) => {
    res.json({
        message: "detail here",
    });
};
