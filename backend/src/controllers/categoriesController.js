const db = require('../config/database');

const categoriesController = {
  // Obtener todas las categorías
  getAllCategories: async (req, res) => {
    try {
      const [categories] = await db.query('SELECT * FROM categories');
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Obtener una categoría por ID
  getCategoryById: async (req, res) => {
    try {
      const [category] = await db.query('SELECT * FROM categories WHERE category_id = ?', [req.params.id]);
      if (category.length === 0) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      res.json(category[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Crear una nueva categoría
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: 'El nombre es requerido' });
      }
      const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
      res.status(201).json({ id: result.insertId, name });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Actualizar una categoría
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: 'El nombre es requerido' });
      }
      const [result] = await db.query('UPDATE categories SET name = ? WHERE category_id = ?', [name, req.params.id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      res.json({ id: req.params.id, name });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Eliminar una categoría
  deleteCategory: async (req, res) => {
    try {
      const [result] = await db.query('DELETE FROM categories WHERE category_id = ?', [req.params.id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      res.json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = categoriesController;