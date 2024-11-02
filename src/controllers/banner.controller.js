const { Banner } = require('../Banner/banner.entity');

// Yangi mahsulot qo'shish
const createBanner = async (req, res) => {
  try {
    const { image, link } = req.body;
    const newBanner = new Product({ image, link });
    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Barcha mahsulotlarni olish                                                                                           
const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mahsulotni o'chirish
// const deleteProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedProduct = await Product.findByIdAndDelete(id);
//     if (!deletedProduct) {
//       return res.status(404).json({ message: 'Mahsulot topilmadi' });
//     }
//     res.status(200).json({ message: 'Mahsulot o\'chirildi' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Mahsulotni tahrirlash
// const updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { image, title, desc , minute ,   price } = req.body;
//     const updatedProduct = await Product.findByIdAndUpdate(id, { image, title, desc, minute ,  price }, { new: true });
//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = { createBanner, getAllBanners };
