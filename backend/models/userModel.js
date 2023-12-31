const bcrypt = require('bcrypt');

class UserModel {
  async createUser(connection, userData) {
    const { FirstName, LastName, EMail, PassWords, Address, BithDate } = userData;

    try {
      // Check if the email already exists
      const [existingUsers] = await connection.query('SELECT * FROM Users WHERE EMail = ?', [EMail]);

      if (existingUsers.length > 0) {
        // Email already exists, return an error
        return { error: 'Email already exists' };
      }
      const hashedPassword = await bcrypt.hash(PassWords, 10);

      const [results] = await connection.query(
        'INSERT INTO Users (FirstName, LastName, EMail, PassWords, Address, BithDate) VALUES (?, ?, ?, ?, ?, ?)',
        [FirstName, LastName, EMail, hashedPassword, Address, BithDate]
      );

      const userId = results.insertId;
      return { id: userId, message: 'User created successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Error creating user');
    }
  }

  async getUsers(connection) {
    try {
      const [results] = await connection.query('SELECT * FROM Users');
      return results;
    } catch (error) {
      console.error(error);
      throw new Error('Error getting users');
    }
  }

  async getUserById(connection, userId) {
    try {
      const [results] = await connection.query('SELECT * FROM Users WHERE id_User = ?', [userId]);

      if (results.length === 0) {
        return null;
      }

      return results[0];
    } catch (error) {
      console.error(error);
      throw new Error('Error getting user by ID');
    }
  }

  async deleteUser(connection, userId) {
    try {
      await connection.query('DELETE FROM Users WHERE id_User = ?', [userId]);
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting user');
    }
  }

  async getUserByEmail(connection, email) {
    try {
      const [results] = await connection.query('SELECT * FROM Users WHERE EMail = ?', [email]);

      if (results.length === 0) {
        return null;
      }

      return results[0];
    } catch (error) {
      console.error(error);
      throw new Error('Error getting user by email');
    }
  }

}

module.exports = new UserModel();