const orderRoute = require("./order.route");
const stockRoute = require("./stock.route");
const authRoute = require("./auth.route");

module.exports = (app) => {
    //app.use('/', homeRoute);

    app.use('/employee/auth', authRoute);

    app.use("/employee/order", orderRoute);

    app.use("/employee/stock", stockRoute);
}