const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

  async getUserById(req, res) {
    const { id } = req.params;
    const connection = await req.mysql.getConnection();

    try {
      const user = await userModel.getUserById(connection, id);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(user);
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

  async loginUser(req, res) {
    const { EMail, PassWords } = req.body;

    const user = await userModel.getUserByEmail(req.mysql, EMail);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials mail' });
    }

    const passwordMatch = await bcrypt.compare(PassWords, user.PassWords);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials pass' });
    }

    const token = jwt.sign({ userId: user.id_User }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ token });
  }

}

module.exports = new UserController();