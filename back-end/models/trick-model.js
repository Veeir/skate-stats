const mongoose = require('mongoose');

const TrickSchema = new mongoose.Schema({
    name: { type: String, required: true },
    attempts: {type: Number, required: true, default: 0},
    successes: {type: Number, required: true, default: 0},
    failures: {type: Number, required: true, default: 0},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    trials: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trial"
    }]
});

module.exports = mongoose.model("Trick", TrickSchema);