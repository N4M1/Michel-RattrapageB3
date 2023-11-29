const userModel = require('../models/userModel');

class UserController {
  async createUser(req, res) {
    const { body: userData } = req;
    const connection = await req.mysql.getConnection();

    try {
      const result = await userModel.createUser(connection, userData);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      connection.release();
    }
  }

  async getUsers(req, res) {
    const connection = await req.mysql.getConnection();

    try {
      const results = await userModel.getUsers(connection);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      connection.release();
    }
  }

  async deleteUser(req, res) {
    const userId = req.params.id;
    const connection = await req.mysql.getConnection();

    try {
      const result = await userModel.deleteUser(connection, userId);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      connection.release();
    }
  }
}

module.exports = new UserController();