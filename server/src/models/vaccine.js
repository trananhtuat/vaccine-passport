const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
 
const vaccineShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, schemaOptions);

module.exports = mongoose.model('Vaccine', vaccineShema);