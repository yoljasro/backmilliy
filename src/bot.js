const TelegramBot = require('node-telegram-bot-api');

const botToken = '8157570693:AAH5IzcmAEZ89E9LZ5deg2AlNX5c7exS_uw'; // Bot tokeningizni bu yerga kiriting
const chatId = '8157570693'; // Telegram kanal yoki chat ID

const bot = new TelegramBot(botToken, { polling: true });

/**
 * Telegram bot orqali yangi buyurtma haqida xabar yuborish funksiyasi
 * @param {string} message - Xabar matni
 */
const sendOrderNotification = async (message) => {
    try {
        await bot.sendMessage(chatId, message);
        console.log('Telegram bot orqali xabar yuborildi');
    } catch (error) {
        console.error('Telegram xabarini yuborishda xatolik:', error);
    }
};

// Bot /start komandasini qayta ishlaydi
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = 'Вы можете отслеживать заказы через этого бота';
    bot.sendMessage(chatId, welcomeMessage);
    console.log('Foydalanuvchi /start komandasi bilan xush kelibsiz xabarini oldi');
});

// Funksiyani eksport qilish
module.exports = { sendOrderNotification };
