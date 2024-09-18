const Orders = require('../Order/order.entity'); // Order modelini chaqiramiz

const getSalesData = async () => {
  try {
    const orders = await Orders.find({}); // Barcha orderlarni olamiz
    const salesData = orders.map(order => ({
      date: order.createdAt,
      amount: order.totalPrice,
    }));

    // Chart uchun labels va data formatlash
    const labels = salesData.map(data => data.date.toISOString().split('T')[0]);
    const data = salesData.map(data => data.amount);

    return { labels, data };
  } catch (err) {
    console.error('Error fetching sales data:', err.message);
    throw new Error('Sales data olishda xatolik');
  }
};

module.exports = { getSalesData };
