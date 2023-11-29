const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// MySQL connection pool setup
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ECommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Middleware to handle MySQL connection
app.use((req, res, next) => {
  req.mysql = pool;
  next();
});

// Use product, user, and order routes
app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});