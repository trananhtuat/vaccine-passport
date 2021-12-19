const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const Schema = mongoose.Schema;
 
const userVaccineShema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vaccine: {
        type: Schema.Types.ObjectId,
        ref: 'Vaccine',
        required: true
    },
    vaccineLot: {
        type: Schema.Types.ObjectId,
        ref: 'VaccineLot',
        required: true
    }
}, schemaOptions);

module.exports = mongoose.model('UserVaccine', userVaccineShema);