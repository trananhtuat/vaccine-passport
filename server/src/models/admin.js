const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
 
const adminShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, schemaOptions);

module.exports = mongoose.model('Admin', adminShema);