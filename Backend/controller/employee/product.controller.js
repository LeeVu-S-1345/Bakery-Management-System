const Product = require("../../model/product.model");

module.exports.getStock = async (req, res) => {
    try {
        const stock = await Product.getStock();
        res.json(stock);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}