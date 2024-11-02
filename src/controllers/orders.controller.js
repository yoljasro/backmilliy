  const { Orders } = require('../Order/order.entity');

  const TELEGRAM_BOT_TOKEN = 'AAH5IzcmAEZ89E9LZ5deg2AlNX5c7exS_uw'; // Telegram bot tokeningiz
  const TELEGRAM_CHAT_ID = '8157570693'; // Telegram chat ID

  // Telegram bot orqali xabar yuborish funksiyasi
  const sendTelegramMessage = async (message) => {
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });
      return response.json(); // Yuborilgan xabarning natijasini qaytaradi
    } catch (error) {
      console.error('Telegram message sending error:', error); // Telegramga xabar yuborishda xato
    }
  };

  // Yangi buyurtma qilish
  const createOrder = async (req, res) => {
    try {
      const { products, deliveryType, address, totalPrice } = req.body;
      const newOrder = new Orders({
        products,
        deliveryType,
        address,
        totalPrice,
        paymentStatus: 'Принял',
        orderStatus: 'Принял', // Boshlang'ich status
      });
      await newOrder.save();

      // Click test to'lov integratsiyasi
      const paymentUrl = `https://my.click.uz/payment/${newOrder.id}`;
      
      // Telegramga xabar yuborish
      await sendTelegramMessage(`Yangi buyurtma qabul qilindi:\nID: ${newOrder.id}\nManzil: ${address}\nUmumiy narx: ${totalPrice} so'm`);

      res.status(201).json({ order: newOrder, paymentUrl });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Barcha buyurtmalarni olish
  const getAllOrders = async (req, res) => {  
    try {
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
      const order = await Orders.findById(req.params.id); // req.params.id ishlatildi
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.status(200).json(order);
    } catch (error) {
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
      
      // Telegramga xabar yuborish
      await sendTelegramMessage(`Buyurtma yangilandi:\nID: ${updatedOrder.id}\nTo'lov holati: ${status}`);

      res.status(200).json(updatedOrder);
    } catch (error) {
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

      // Telegramga xabar yuborish
      await sendTelegramMessage(`Buyurtma holati yangilandi:\nID: ${updatedOrder.id}\nYangi holat: ${orderStatus}`);

      res.status(200).json(updatedOrder);
    } catch (error) {
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
        orderStatus, // Yangi qo'shildi
      }, { new: true }).populate('products.productId');
      
      if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
      
      // Telegramga xabar yuborish
      await sendTelegramMessage(`Buyurtma yangilandi:\nID: ${updatedOrder.id}\nUmumiy narx: ${totalPrice} so'm\nYangi holat: ${orderStatus}`);

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

      // Telegramga xabar yuborish
      await sendTelegramMessage(`Buyurtma o'chirildi:\nID: ${deletedOrder.id}`);

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
    updateOrderStatusByAdmin, // Yangi funksiya export qilingan
    updateOrder,
    deleteOrder
  };