const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/auth.middleware');

const controller = require("../../controller/employee/order.controller");
const { authorize } = require('../../middleware/authorize.middleware');

router.post("/", verifyToken, authorize(2), controller.getAllOrders);

router.post("/detail", verifyToken, authorize(2), controller.getOrderDetail);

module.exports = router;