class UserModel {
  async createUser(connection, userData) {
    const { FirstName, LastName, EMail, PassWords, Address, BithDate } = userData;

    try {
      const [results] = await connection.query(
        'INSERT INTO Users (FirstName, LastName, EMail, PassWords, Address, BithDate) VALUES (?, ?, ?, ?, ?, ?)',
        [FirstName, LastName, EMail, PassWords, Address, BithDate]
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

  async deleteUser(connection, userId) {
    try {
      await connection.query('DELETE FROM Users WHERE id_User = ?', [userId]);
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting user');
    }
  }
}

module.exports = new UserModel();