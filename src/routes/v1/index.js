const express = require("express");

const router = express.Router();

// router.post("/booking", BookingC)
const { BookingController } = require("../../controllers/index");

router.post("/booking", BookingController.create);

module.exports = router;
