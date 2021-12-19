const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
 
const userShema = new mongoose.Schema({
    idNumber: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String
    }
}, schemaOptions);

module.exports = mongoose.model('User', userShema);