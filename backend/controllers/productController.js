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

  async getProductById(req, res) {
    const { id } = req.params;
    const connection = await req.mysql.getConnection();

    try {
      const product = await productModel.getProductById(connection, id);

      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json(product);
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