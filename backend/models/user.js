const mongoose = require("mongoose");

//Importing Mongoose unique Validator
const uniqueValidator = require("mongoose-unique-validator");

//Creating User Schema
const userSchema = mongoose.Schema({
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

//Exporting the Module
module.exports = mongoose.model("User", userSchema);
