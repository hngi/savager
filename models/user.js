const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema({
    local: {
        first_name: { type: String },
        last_name: { type: String },
        user_name: { type: String, required: true, default: "Not set" },
        email: { type: String, required: true, unique: true },
        is_active: { type: Boolean, default: 0 },
        password: { type: String },
        country: {type: String}
    },
    google: {
        first_name: { type: String },
        last_name: { type: String },
        email: { type: String },
        googleId: { type: String },
        picture: { type: String }
    },
    resetPasswordToken: {
        type: String,
        required: false,
    },
    resetPasswordExpires: {
        type: Date,
        required: false,
    },
    points:{type: Number}
},{ timestamps: true }
)


module.exports = mongoose.model("User", userSchema);