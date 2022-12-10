const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    password: { type: String },
    permissionlevel: [{ type: String }]
}, {
    collation: 'users'
})

module.exports = mongoose.model('user', userSchema)