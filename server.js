const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://taskmern:taskmern@cluster0.m3w4pnj.mongodb.net/productsdb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB DAta'))
  .catch(error => console.error('Error connecting to MongoDB', error));

// Define the product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  ratings: String
});

// Define the product model
const Product = mongoose.model('Product', productSchema);

// Define the route to retrieve the product information
app.get('/compare', async (req, res) => {
  try {
    const productIds = req.query.productIds;
    const products = await Product.find({ _id: { $in: productIds } });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
