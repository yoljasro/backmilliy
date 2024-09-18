const { Orders } = require('../Order/order.entity');

// Yangi buyurtma qilish
const createOrder = async (req, res) => {
  try {
    const { products, deliveryType, address, totalPrice } = req.body;
    // Example products: [{ productId: '123', quantity: 2 }]
    const newOrder = new Orders({ products, deliveryType, address, totalPrice, paymentStatus: 'pending' });
    await newOrder.save();

    // Click test to'lov integratsiyasi
    const paymentUrl = `https://my.click.uz/payment/${newOrder.id}`;
    res.status(201).json({ order: newOrder, paymentUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Barcha buyurtmalarni olish
const getAllOrders = async (req, res) => {  
  try {
    // Barcha buyurtmalarni olish
    const orders = await Orders.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error); // Xatolikni logga yozish
    res.status(500).json({ message: error.message });
  }
};

// Ma'lum bir buyurtmani olish
const getOrderById = async (req, res) => {
  try {
    const order = await Orders.findById();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buyurtmani yangilash (to'lov qabul qilish)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Orders.findByIdAndUpdate(id, { paymentStatus: status }, { new: true });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buyurtmani yangilash (umumiy ma'lumotlar)
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { products, deliveryType, address, totalPrice, paymentStatus } = req.body;

    const updatedOrder = await Orders.findByIdAndUpdate(id, {
      products,
      deliveryType,
      address,
      totalPrice,
      paymentStatus,
    }, { new: true }).populate('products.productId');
    
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buyurtmani o'chirish
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Orders.findByIdAndDelete(id);
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updateOrder,
  deleteOrder
};
