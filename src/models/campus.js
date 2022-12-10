const mongoose = require('mongoose');

const campusSchema = new mongoose.Schema({
    name: { type: String },
    location: { type: String },
    address: { type: String },
    image: { type: String },
}, {
    collection: 'campus'
});

module.exports = mongoose.model('campus', campusSchema);