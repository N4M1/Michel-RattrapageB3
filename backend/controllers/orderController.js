const orderModel = require('../models/orderModel');

class OrderController {
  async createOrder(req, res) {
    const { body: orderData } = req;
    const connection = await req.mysql.getConnection();

    try {
      const result = await orderModel.createOrder(connection, orderData);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      connection.release();
    }
  }

  async getOrders(req, res) {
    const connection = await req.mysql.getConnection();

    try {
      const results = await orderModel.getOrders(connection);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      connection.release();
    }
  }

  async getOrderById(req, res) {
    const { orderId } = req.params;
    const connection = await req.mysql.getConnection();
    console.log(req.params)

    try {
      console.log(`Attempting to retrieve order with ID: ${orderId}`);
      const result = await orderModel.getOrderById(connection, orderId);
      console.log('Result:', result);

      if (result === null) {
        // Order not found
        res.status(404).json({ error: 'Order not found' });
      } else {
        // Order found
        res.json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      connection.release();
    }
  }

  async deleteOrder(req, res) {
    const orderId = req.params.id;
    const connection = await req.mysql.getConnection();

    try {
      const result = await orderModel.deleteOrder(connection, orderId);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      connection.release();
    }
  }
}

module.exports = new OrderController();