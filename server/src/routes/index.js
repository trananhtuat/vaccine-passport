const router = require('express').Router();

router.use('/admin', require('./adminRoute'));
router.use('/user', require('./userRoute'));
router.use('/place', require('./placeRoute'));
router.use('/vaccine', require('./vaccineRoute'));

module.exports = router;
