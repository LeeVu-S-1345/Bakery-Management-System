const Order = require('../../model/order.model');

module.exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.getAllOrdersByDate(req.body.date);
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.getOrderDetail = async (req, res) => {
    try {
        const detail = await Order.getOrderDatail(req.body.orderId);
        res.json(detail);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Interal Server Error'});
    }
}