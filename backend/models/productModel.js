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
        try 
        {
            const [results] = await connection.query('SELECT * FROM Products');
            return results;
        } 
        catch (error) 
        {
            console.error(error);
            throw new Error('Error getting products');
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