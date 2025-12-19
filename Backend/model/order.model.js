const pool = require('../config/pool');

class Order {
    static async createOrder(data) {
        try {
            const query = `INSERT INTO orders
                        (id, orderdate, customer_id, total_amount, payment, receive_time, receive_date, note, receive_address, receiver, receive_phone)
                        VALUES ($1, CURRENT_DATE, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`;
            const values = [data.id, data.cus_id, data.prices.total, data.payment, data.time.slot, data.time.date, data.customer.note, data.address, data.receiver.name, data.receiver.phone];
            const res = await pool.query(query, values);
            
            for(let item of data.items){
                let queryItem = `INSERT INTO orderline(order_id, prod_id, quantity, orderdate)
                                VALUES ($1, $2, $3, CURRENT_DATE)`;
                let valuesItem = [data.id, item.id, item.qty];
                await pool.query(queryItem, valuesItem);
            }
            return res.rows[0];
        } catch (error){
            console.error(error);
            throw error;
        }
    }

    static async getOrder(userId){
        try {
            const query = `SELECT id, orderdate, status, total_amount FROM orders WHERE customer_id = $1 ORDER BY orderdate DESC`;
            const values = [userId];
            const res = await pool.query(query, values);
            const result = [];
            for (let order of res.rows){
                const orderquery = `SELECT p.name as name, o.quantity as qty, p.price as price FROM orderline o
                                    JOIN product p ON o.prod_id = p.id
                                    WHERE o.order_id = $1`;
                const ans = await pool.query(orderquery, [order.id]);
                order.items = ans.rows;
                result.push(order);
            }
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async findOrder(orderId) {
        try {
            const query = `SELECT * FROM orders WHERE id = $1`;
            const values = [orderId];
            const res = await pool.query(query, values);
            return res.rows[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getAllOrdersByDate(data){
        try {
            const query = `SELECT orders.id, fullname, receive_phone, ordertime, total_amount, orders.status,
                            receive_date, receive_time, receive_address, receiver, phone FROM orders
                           JOIN customer ON orders.customer_id = customer.user_id
                           JOIN useraccount ON customer.user_id = useraccount.id
                           WHERE orderdate = $1
                           ORDER BY ordertime;`
            const value = [data]
            const res = await pool.query(query, value);
            return res.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getOrderDatail(orderId) {
        try {
            const query = `SELECT prod_id, quantity, p.price FROM orderline o
                           JOIN product p ON o.prod_id = p.id
                           WHERE o.order_id = $1;`
            const values = [orderId];
            const res = await pool.query(query, values);
            return res.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = Order;