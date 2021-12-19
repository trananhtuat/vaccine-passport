const { Vaccine, VaccineLot, UserVaccine } = require('../models');

exports.create = async (req, res) => {
    try {
        const newVaccineLot = new VaccineLot({
            name: req.body.name,
            quantity: req.body.quantity,
            vaccinated: 0,
            vaccine: req.body.vaccineId
        });
        const savedLot = await newVaccineLot.save();
        res.status(201).json(savedLot);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await VaccineLot.find({}).populate('vaccine').sort('-createdAt');
        res.status(200).json(list);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getOne = async (req, res) => {
    try {
        const vaccineLot = await VaccineLot.findById(req.params.id).populate('vaccine');
        res.status(200).json(vaccineLot);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.update = async (req, res) => {
    try {
        const vaccineLot = await VaccineLot.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }
        );
        res.status(200).json(vaccineLot);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.delete = async (req, res) => {
    try {
        await UserVaccine.deleteMany({vaccineLot: req.params.id});
        await VaccineLot.findByIdAndDelete(req.params.id);
        res.status(200).json('Deleted');
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}