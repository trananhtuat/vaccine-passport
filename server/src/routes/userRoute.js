const express = require('express');
const router = express.Router();
const tokenHandler = require('../handlers/tokenHandler');
const { userController } = require('../controllers');

router.post(
    '/',
    tokenHandler.verifyAdminToken,
    userController.create
);

router.get(
    '/',
    tokenHandler.verifyAdminToken,
    userController.getAll
);

router.get(
    '/:id',
    tokenHandler.verifyAdminToken,
    userController.getOne
);

router.put(
    '/:id',
    tokenHandler.verifyAdminToken,
    userController.update
);

router.delete(
    '/:id',
    tokenHandler.verifyAdminToken,
    userController.delete
);

// add vaccinated to user

router.post(
    '/vaccinated',
    tokenHandler.verifyAdminToken,
    userController.vaccinated
)

router.get(
    '/:userId/place',
    tokenHandler.verifyToken,
    userController.getAllPlace
);

router.post(
    '/checkin-place',
    tokenHandler.verifyToken,
    userController.checkinPlace
);

// place that user visited
router.get(
    '/:userId/place-visited',
    tokenHandler.verifyToken,
    userController.placeVisited
);

module.exports = router;
