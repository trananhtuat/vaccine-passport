const { Place, UserPlace } = require('../models');
const userPlace = require('../models/userPlace');

exports.create = async (req, res) => {
    try {
        const newPlace = new Place({
            ...req.body,
            creator: req.user._id
        });
        const savedPlace = await newPlace.save();
        res.status(201).json(savedPlace);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getAll = async (req, res) => {
    try {
        const list = await Place.find({}).populate('creator').sort('-createdAt');
        for (const place of list) {
            const userVisitLast24h = await UserPlace.find({
                place: place._id,
                createdAt: {
                    $gt: new Date(Date.now() - 24*60*60*1000)
                }
            });
            place._doc.userVisitLast24h = userVisitLast24h;
        }
        res.status(200).json(list);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.getOne = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id).populate('creator');
        const userVisitLast24h = await UserPlace.find({
            place: place._id,
            createdAt: {
                $gt: new Date(Date.now() - 24*60*60*1000)
            }
        }).populate('user');
        place._doc.userVisitLast24h = userVisitLast24h;
        res.status(200).json(place);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.update = async (req, res) => {
    try {
        const place = await Place.findOneAndUpdate(
            {
                _id: req.params.id,
                creator: req.user._id
            },
            {
                $set: req.body
            }
        );
        res.status(200).json(place);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.delete = async (req, res) => {
    try {
        await UserPlace.deleteMany({place: req.params.id});
        await Place.findOneAndDelete({
            _id: req.params.id,
            creator: req.user._id
        });
        res.status(200).json('Deleted');
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}