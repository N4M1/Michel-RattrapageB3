class ProductModel {
    async createProduct(connection, productData) {
        const { AlbumName, ArtistName, Price, pictures } = productData;

        try 
        {
            const [productResults] = await connection.query(
                'INSERT INTO Products (AlbumName, ArtistName, Price) VALUES (?, ?, ?)',
                [AlbumName, ArtistName, Price]
            );

            const productId = productResults.insertId;

            if (pictures && pictures.length > 0) {
                const pictureValues = pictures.map((pic) => [productId, pic.imgPath, pic.imgName]);
                await connection.query(
                'INSERT INTO Pictures (id_Product, imgPath, imgName) VALUES ?',
                [pictureValues]
                );
            }

            return { id: productId, message: 'Product created successfully' };
        } 
        catch (error) 
        {
            console.error(error);
            throw new Error('Error creating product');
        }
    }
  
    async getProducts(connection) {
        try {
          const [results] = await connection.query(`
            SELECT P.*, GROUP_CONCAT(Pic.imgPath, '|', Pic.imgName) AS Pictures
            FROM Products P
            LEFT JOIN Pictures Pic ON P.id_Product = Pic.id_Product
            GROUP BY P.id_Product
          `);
    
          return results.map((result) => {
            const product = { ...result };
            if (product.Pictures) {
              product.Pictures = product.Pictures.split(',').map((pic) => {
                const [imgPath, imgName] = pic.split('|');
                return { imgPath, imgName };
              });
            }
            return product;
          });
        } catch (error) {
          console.error(error);
          throw new Error('Error getting products');
        }
    }

    async getProductById(connection, productId) {
        try {
          const [results] = await connection.query(`
            SELECT P.*, GROUP_CONCAT(Pic.imgPath, '|', Pic.imgName) AS Pictures
            FROM Products P
            LEFT JOIN Pictures Pic ON P.id_Product = Pic.id_Product
            WHERE P.id_Product = ?
            GROUP BY P.id_Product
          `, [productId]);
    
          if (results.length === 0) {
            return null;
          }
    
          const product = { ...results[0] };
    
          if (product.Pictures) {
            product.Pictures = product.Pictures.split(',').map((pic) => {
              const [imgPath, imgName] = pic.split('|');
              return { imgPath, imgName };
            });
          }
    
          return product;
        } catch (error) {
          console.error(error);
          throw new Error('Error getting product by ID');
        }
      }
  
    async deleteProduct(connection, productId) {
        try 
        {
            await connection.query('DELETE FROM Products WHERE id_Product = ?', [productId]);
            return { message: 'Product deleted successfully' };
        } 
        catch (error) 
        {
            console.error(error);
            throw new Error('Error deleting product');
        }
    }
  }
  
  module.exports = new ProductModel();