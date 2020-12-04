const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    available: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("books", booksSchema);
