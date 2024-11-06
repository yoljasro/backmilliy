const { Orders } = require('../Order/order.entity');
const TelegramBot = require('node-telegram-bot-api');

const telegramToken = '8157570693:AAGgUIBA55U91Pi4sIuHN94gTlv2TV5nEUg'; // Telegram bot tokenini o'zgartiring
const chatId = '8157570693'; // To'g'ri chat ID'ni kiriting
const bot = new TelegramBot(telegramToken, { polling: true });

// Yangi buyurtma qilish
const createOrder = async (req, res) => {
  try {
    const { products, deliveryType, address, totalPrice } = req.body;

    console.log("Yangi buyurtma yaratilmoqda..."); // Buyurtma yaratilayotganini tekshirish

    const newOrder = new Orders({
      products,
      deliveryType,
      address,
      totalPrice,
      paymentStatus: 'Принял',
      orderStatus: 'Принял', // Boshlang'ich status
    });
    await newOrder.save();
    console.log("Buyurtma ma'lumotlar bazasida saqlandi:", newOrder); // Saqlangan buyurtma

    // Telegramga xabar yuborish
    const message = `
      Yangi buyurtma yaratildi:
      Buyurtma ID: ${newOrder._id}
      Mahsulotlar: ${newOrder.products.map(product => `${product.productName} (x${product.quantity})`).join(', ')}
      Yetkazib berish turi: ${newOrder.deliveryType}
      Manzil: ${newOrder.address}
      Jami narx: ${newOrder.totalPrice} so'm
      To'lov holati: ${newOrder.paymentStatus}
      Buyurtma holati: ${newOrder.orderStatus}
    `;
    
    console.log("Telegramga xabar yuborilmoqda..."); // Xabar yuborish jarayoni
    try {
      await bot.sendMessage(chatId, message);
      console.log("Xabar Telegram botga muvaffaqiyatli yuborildi!");
    } catch (error) {
      console.error("Telegram botga xabar yuborishda xatolik:", error);
    }

    // Click test to'lov integratsiyasi
    const paymentUrl = `https://my.click.uz/payment/${newOrder.id}`;
    res.status(201).json({ order: newOrder, paymentUrl });

  } catch (error) {
    console.error("Buyurtma yaratishda xato:", error); // Xatolikni logga yozish
    res.status(500).json({ message: error.message });
  }
};

// Barcha buyurtmalarni olish
const getAllOrders = async (req, res) => {  
  try {
    const orders = await Orders.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: error.message });
  }
};

// Ma'lum bir buyurtmani olish
const getOrderById = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ message: error.message });
  }
};

// Buyurtmani yangilash (to'lov holatini yangilash)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Orders.findByIdAndUpdate(id, { paymentStatus: status }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: error.message });
  }
};

// Buyurtma holatini yangilash (orderStatus)
const updateOrderStatusByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const updatedOrder = await Orders.findByIdAndUpdate(id, { orderStatus }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status by admin:', error);
    res.status(500).json({ message: error.message });
  }
};

// Buyurtmani umumiy yangilash
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { products, deliveryType, address, totalPrice, paymentStatus, orderStatus } = req.body;

    const updatedOrder = await Orders.findByIdAndUpdate(id, {
      products,
      deliveryType,
      address,
      totalPrice,
      paymentStatus,
      orderStatus,
    }, { new: true }).populate('products.productId');
    
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
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
    console.error('Error deleting order:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updateOrderStatusByAdmin,
  updateOrder,
  deleteOrder
};
