const db = require('../config/database');

const productsController = {
  // Obtener todos los productos
  getAllProducts: async (req, res) => {
    try {
      const [products] = await db.query(`
        SELECT p.*, c.name as category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.category_id
      `);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Obtener un producto por ID
  getProductById: async (req, res) => {
    try {
      const [product] = await db.query(`
        SELECT p.*, c.name as category_name 
        FROM products p 
        LEFT JOIN categories c ON p.category_id = c.category_id 
        WHERE p.product_id = ?
      `, [req.params.id]);
      
      if (product.length === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(product[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Crear un nuevo producto
  createProduct: async (req, res) => {
    try {
      const { name, description, price, category_id } = req.body;
      
      // Validaciones
      if (!name || !description || !price) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }
      
      if (isNaN(price) || price <= 0) {
        return res.status(400).json({ message: 'El precio debe ser un número positivo' });
      }

      const [result] = await db.query(
        'INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)',
        [name, description, price, category_id]
      );
      
      res.status(201).json({
        id: result.insertId,
        name,
        description,
        price,
        category_id
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Actualizar un producto
  updateProduct: async (req, res) => {
    try {
      const { name, description, price, category_id } = req.body;
      
      // Validaciones
      if (!name || !description || !price) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }
      
      if (isNaN(price) || price <= 0) {
        return res.status(400).json({ message: 'El precio debe ser un número positivo' });
      }

      const [result] = await db.query(
        'UPDATE products SET name = ?, description = ?, price = ?, category_id = ? WHERE product_id = ?',
        [name, description, price, category_id, req.params.id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.json({
        id: req.params.id,
        name,
        description,
        price,
        category_id
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Eliminar un producto
  deleteProduct: async (req, res) => {
    try {
      const [result] = await db.query('DELETE FROM products WHERE product_id = ?', [req.params.id]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = productsController;