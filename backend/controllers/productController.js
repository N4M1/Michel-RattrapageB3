const productModel = require('../models/productModel');

class ProductController {
  async createProduct(req, res) {
    const { body: productData } = req;
    const connection = await req.mysql.getConnection();

    try {
      const result = await productModel.createProduct(connection, productData);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      connection.release();
    }
  }

  async getProducts(req, res) {
    const connection = await req.mysql.getConnection();

    try {
      const results = await productModel.getProducts(connection);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      connection.release();
    }
  }

  async deleteProduct(req, res) {
    const productId = req.params.id;
    const connection = await req.mysql.getConnection();

    try {
      const result = await productModel.deleteProduct(connection, productId);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      connection.release();
    }
  }
}

module.exports = new ProductController();