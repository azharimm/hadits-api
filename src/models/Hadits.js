const mongoose = require("mongoose");

const haditsSchema = mongoose.Schema({
    number: {
        type: Number,
    },
    arab: {
        type: String,
    },
    id: {
        type: String,
    },
    book: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("hadits", haditsSchema);
