class OrderModel {
  async createOrder(connection, orderData) {
    const { id_User, OrderedDate, orderedProducts } = orderData;

    try {
      // Start a transaction
      await connection.beginTransaction();

      // Insert into Orders table
      const [orderResult] = await connection.query(
        'INSERT INTO Orders (id_User, OrderedDate) VALUES (?, ?)',
        [id_User, OrderedDate]
      );

      const orderId = orderResult.insertId;

      // Calculate total by summing the prices of ordered products
      const total = await orderedProducts.reduce(async (accPromise, { id_Product, quantity }) => {
        const acc = await accPromise;

        // Fetch the price of the product from the database
        const [productResult] = await connection.query('SELECT Price FROM Products WHERE id_Product = ?', [id_Product]);
        const productPrice = productResult[0].Price;

        // Add the product price multiplied by quantity to the accumulator
        return acc + productPrice * quantity;
      }, Promise.resolve(0));

      // Update the total in the Orders table
      await connection.query('UPDATE Orders SET Total = ? WHERE id_Order = ?', [total, orderId]);

      // Insert into OrderedProducts table for each ordered product
      for (const { id_Product, quantity } of orderedProducts) {
        await connection.query(
          'INSERT INTO OrderedProducts (id_Product, id_Order, Quantity) VALUES (?, ?, ?)',
          [id_Product, orderId, quantity]
        );
      }

      // Commit the transaction
      await connection.commit();

      return { id: orderId, message: 'Order created successfully' };
    } catch (error) {
      // Rollback the transaction in case of an error
      await connection.rollback();
      console.error(error);
      throw new Error('Error creating order');
    }
  }



  async getOrders(connection) {
    try {
      const [results] = await connection.query(`
        SELECT O.*, 
               OP.id_OrdProd,
               OP.id_Product,
               OP.Quantity,
               P.AlbumName,
               P.ArtistName,
               P.Price
        FROM Orders O
        LEFT JOIN OrderedProducts OP ON O.id_Order = OP.id_Order
        LEFT JOIN Products P ON OP.id_Product = P.id_Product
      `);

      const ordersMap = new Map();

      results.forEach((result) => {
        const orderId = result.id_Order;

        if (!ordersMap.has(orderId)) {
          // Create a new order object if not exists
          ordersMap.set(orderId, {
            id_Order: orderId,
            id_User: result.id_User,
            Total: result.Total,
            OrderedDate: result.OrderedDate,
            orderedProducts: [],
          });
        }

        const order = ordersMap.get(orderId);

        if (result.id_OrdProd) {
          // If there is a linked ordered product, add it to the orderedProducts array
          const orderedProduct = {
            id_OrdProd: result.id_OrdProd,
            id_Product: result.id_Product,
            Quantity: result.Quantity,
            AlbumName: result.AlbumName,
            ArtistName: result.ArtistName,
            Price: result.Price,
          };

          order.orderedProducts.push(orderedProduct);
        }
      });

      return Array.from(ordersMap.values());
    } catch (error) {
      console.error(error);
      throw new Error('Error getting orders');
    }
  }

  async getOrderById(connection, orderId) {
    try {
      const [results] = await connection.query(`
        SELECT O.*, 
               OP.id_OrdProd,
               OP.id_Product,
               OP.Quantity,
               P.AlbumName,
               P.ArtistName,
               P.Price
        FROM Orders O
        LEFT JOIN OrderedProducts OP ON O.id_Order = OP.id_Order
        LEFT JOIN Products P ON OP.id_Product = P.id_Product
        WHERE O.id_Order = ?
      `, [orderId]);

      if (results.length === 0) {
        // No order found with the specified ID
        return null;
      }

      // Extract order information
      const order = {
        id_Order: results[0].id_Order,
        id_User: results[0].id_User,
        Total: results[0].Total,
        OrderedDate: results[0].OrderedDate,
        orderedProducts: [],
      };

      // Extract ordered product information
      results.forEach(result => {
        if (result.id_OrdProd) {
          const orderedProduct = {
            id_OrdProd: result.id_OrdProd,
            id_Product: result.id_Product,
            Quantity: result.Quantity,
            AlbumName: result.AlbumName,
            ArtistName: result.ArtistName,
            Price: result.Price,
          };

          order.orderedProducts.push(orderedProduct);
        }
      });

      return order;
    } catch (error) {
      console.error(error);
      throw new Error('Error getting order by ID');
    }
  }

  async deleteOrder(connection, orderId) {
    try {
      await connection.query('DELETE FROM Orders WHERE id_Order = ?', [orderId]);
      return { message: 'Order deleted successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Error deleting order');
    }
  }
}

module.exports = new OrderModel();