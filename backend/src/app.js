const express = require('express');
const cors = require('cors');
require('dotenv').config();

const categoriesRoute = require('./routes/categoriesRoute');
const productsRoute = require('./routes/productsRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/categories', categoriesRoute);
app.use('/api/products', productsRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal!' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});