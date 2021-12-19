const jwt = require('jsonwebtoken');
const { User, UserVaccine, UserPlace, VaccineLot, Vaccine, Place } = require('../models');

exports.create = async (req, res) => {
    const {
        phoneNumber,
        idNumber,
    } = req.body;
    try {
        let user = await User.findOne({phoneNumber: phoneNumber});
        if (user) return res.status(403).json('Phone number already registered for another account');

        user = await User.findOne({idNumber: idNumber});
        if (user) return res.status(403).json('Id number already registered for another account');

        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        const token = jwt.sign({
            id: savedUser._id
        }, process.env.TOKEN_SECRET_KEY);

        res.status(201).json({
            user: savedUser,
            token
        });
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await User.find({}).sort('-createdAt');
        for (const user of list) {
            const vaccine = await UserVaccine.find({
                user: user._id
            }).sort('-createdAt');
            user._doc.vaccine = vaccine;
        }
        res.status(200).json(list)
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const userVaccine = await UserVaccine.find({
            user: req.params.id
        }).populate('vaccine').populate('vaccineLot').sort('-createdAt');
        const userPlaceVisit = await UserPlace.find({
            user: req.params.id
        }).populate('place').sort('-createdAt');

        user._doc.vaccinated = userVaccine;
        user._doc.placeVisited = userPlaceVisit;

        res.status(200).json(user);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.update = async (req, res) => {
    const {
        phoneNumber,
        idNumber,
    } = req.body;
    try {
        let user = await User.findOne({phoneNumber: phoneNumber});
        if (user && user._id.toString() !== req.params.id) return res.status(403).json('Phone number already registered for another account');

        user = await User.findOne({idNumber: idNumber});
        if (user && user._id.toString() !== req.params.id) return res.status(403).json('Id number already registered for another account');

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        );
        res.status(200).json(updateUser);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await UserVaccine.deleteMany({user: id});
        await UserPlace.deleteMany({user: id});
        await User.findByIdAndDelete(id);
        res.status(200).json('Deleted');
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// add vaccinated to user

exports.vaccinated = async (req, res) => {
    try {
        const {
            userId,
            vaccineId,
            vaccineLotId
        } = req.body;
        const newVaccine = new UserVaccine({
            user: userId,
            vaccine: vaccineId,
            vaccineLot: vaccineLotId
        });
        const savedUserVaccine = await newVaccine.save();
        await VaccineLot.findOneAndUpdate({
            _id: vaccineLotId
        },{
            $inc: { vaccinated: +1 }
        });

        savedUserVaccine._doc.vaccine = await Vaccine.findById(vaccineId);
        savedUserVaccine._doc.vaccineLot = await VaccineLot.findById(vaccineLotId);
        res.status(201).json(savedUserVaccine);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// get places of user

exports.getAllPlace = async (req, res) => {
    try {
        const list = await Place.find({
            creator: req.params.userId
        });
        res.status(200).json(list);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// user check in place

exports.checkinPlace = async (req, res) => {
    try {
        const newVisit = new UserPlace({
            user: req.user._id,
            place: req.body.placeId
        });
        const savedUserPlace = await newVisit.save();
        res.status(201).json(savedUserPlace);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

// get place that user checked in

exports.placeVisited = async (req, res) => {
    try {
        const list = await UserPlace.find({user: req.params.userId}).populate('place');
        res.status(200).json(list);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}