const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    }
});

module.exports = new mongoose.model("NativeUser", UserSchema);