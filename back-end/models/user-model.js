const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tricks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trick"
    }]
});

module.exports = mongoose.model("User", UserSchema);