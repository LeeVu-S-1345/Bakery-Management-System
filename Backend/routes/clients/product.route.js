const express = require('express');
const router = express.Router();

const controller = require("../../controller/clients/product.controller");
const verifyToken = require('../../middleware/auth.middleware');
const { authorize } = require('../../middleware/authorize.middleware');

router.get("/", controller.getMenu);

module.exports = router;