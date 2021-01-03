const mongoose = require('mongoose');

const TrialSchema = new mongoose.Schema({
    trial: {type: [Boolean]},
    time: {type: Date},
    trick: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trick",
        required: true
    }
});

module.exports = mongoose.model("Trial", TrialSchema);