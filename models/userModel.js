const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Schema for a user
let userSchema = new mongoose.Schema({
    username: { type: String, required: [true, "username required"] },
    password: { type: String, required: [true, "password required"] },
    email: { type: String, required: [true, "email required"] }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

let User = mongoose.model("User", userSchema);

module.exports = User;
