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

exports.range = async (req, res) => {
    try {
        let book = req.params.book;
        checkBook = await Book.findOne({ id: book });
        if(!checkBook) return errorJson(res, 'Book not found!', 404);

        const range = req.query.range || "1-10";
        const startRange = parseInt(range.split('-')[0]);
        const endRange = parseInt(range.split('-')[1]);

        if(!startRange || !endRange) {
            return errorJson(res, 'Range must be numbers', 400);
        }

        if(endRange - startRange < 0) {
            return errorJson(res, `Range format is invalid, try ${endRange}-${startRange}`, 400);
        }

        
        const query = { 
            book,
            number: {$gte: startRange, $lte: endRange},
        }
        
        const total = await Hadit.find(query).countDocuments();
        if(total > 150) {
            return errorJson(res, `Range format is invalid, Max range 150 number`, 400);
        }
        const hadits = await Hadit.find(query)
        .select({"_id": 0, "arab": 1, "id": 1, "number": 1})
        .sort([['number', 1]])
        .exec()

        if(total === 0) return errorJson(res, `Hadith not found`, 404);

        return json(res, {
            start: startRange,
            end: endRange,
            total,
            book,
            hadits
        });
    } catch (error) {
        return errorJson(res, error);
    }
};

exports.detail = async (req, res) => {
    try {
        let book = req.params.book;
        let number = req.params.number;
        checkBook = await Book.findOne({ id: book });
        if(!checkBook) return errorJson(res, 'Book not found!', 404);
        const hadith = await Hadit.findOne({ book, number }).select({"_id": 0, "arab": 1, "id": 1, "number": 1})
        return json(res, {
            hadith
        });
    } catch (error) {
        return errorJson(res, error);
    }
};
