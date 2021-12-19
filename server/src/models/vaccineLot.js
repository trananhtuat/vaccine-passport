const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const Schema = mongoose.Schema;
 
const vaccineLotShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    },
    vaccinated: {
        type: Number,
        required: true,
        default: 0
    },
    vaccine: {
        type: Schema.Types.ObjectId,
        ref: 'Vaccine',
        required: true
    }
}, schemaOptions);

module.exports = mongoose.model('VaccineLot', vaccineLotShema);