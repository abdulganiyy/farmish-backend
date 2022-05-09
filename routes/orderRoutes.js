const express = require("express");
const router = express.Router();

//const verifyUser = require("../middlewares/verifyUser");

const { createOrder, getOrders } = require("../controllers/orderControllers");

router.post("/", createOrder);

router.get("/:userId", getOrders);

module.exports = router;
