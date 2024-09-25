const { Product } = require('../Product/product.entity');

// Yangi mahsulot qo'shish
const createProduct = async (req, res) => {
  try {
    const { image, title, desc, price } = req.body;
    const newProduct = new Product({ image, title, price , desc });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Barcha mahsulotlarni olish
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mahsulotni o'chirish
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Mahsulot topilmadi' });
    }
    res.status(200).json({ message: 'Mahsulot o\'chirildi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mahsulotni tahrirlash
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { image, title, desc ,  price } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, { image, title, desc, price }, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProduct, getAllProducts, deleteProduct, updateProduct };
