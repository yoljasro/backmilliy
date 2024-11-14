const express = require('express');
const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
const mongoose = require('mongoose');
const cors = require('cors');
const options = require('./admin.options');
const buildAdminRouter = require('./admin.router');
const axios = require('axios');
const crypto = require('crypto');
const path = require("path")
const http = require('http');

const { Server } = require('socket.io');


// Sales Chart uchun kerakli kutubxonalar

const app = express();
const port = 9000;

// Create an HTTP server to use with Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Frontend manzilingiz
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true // Agar kerak bo'lsa
  }
});

// Click API ma'lumotlari
const MERCHANT_ID = '27487'; // Sizning merchant ID
const SERVICE_ID = '37711'; // Sizning service ID
const MERCHANT_USER_ID = '46815'; // Sizning merchant user ID
const SECRET_KEY = 'isJihg1thilU'; // Sizning secret key\


// const upload = multer({
//   dest: 'uploads/', 
//   limits: { fileSize: 5 * 1024 * 1024 }, 
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png/;
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = fileTypes.test(file.mimetype);
//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error('Only images are allowed!'));
//   },
// });

// app.post("/profiles", upload.fields([{ name: 'avatar', maxCount: 1 }]), createProfile);?


//controllers 
const { createProduct, getAllProducts, deleteProduct, updateProduct } = require("./controllers/product.controller");
const { createOrder, getAllOrders, getOrderById, updateOrderStatus, updateOrder, deleteOrder } = require("./controllers/orders.controller");
const { createBanner, getAllBanners } = require("./controllers/banner.controller");
const { createProfile, getAllProfiles, deleteProfile, updateProfile } = require("./controllers/profile.controller.js");
const e = require('express');

app.use(cors());

// Middleware
app.use(express.json()); // JSON formatida ma'lumotlarni qabul qilish
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use('/uploads', express.static('uploads'));




// Click - Invoice yaratish
app.post('/create-invoice', async (req, res) => {
  const { amount, phoneNumber, merchantTransId } = req.body; // Telefon raqamini qabul qilish
  const timestamp = Math.floor(Date.now() / 1000); // UNIX vaqt
  const digest = crypto.createHash('sha1').update(timestamp + SECRET_KEY).digest('hex'); // sha1 hash

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Auth': `${MERCHANT_USER_ID}:${digest}:${timestamp}`
  };

  const data = {
    service_id: SERVICE_ID,
    amount: amount,
    phone_number: phoneNumber, // Telefon raqamini yuborish
    merchant_trans_id: merchantTransId
  };

  try {
    const response = await axios.post('https://api.click.uz/v2/merchant/invoice/create', data, { headers });

    // Olingan invoice_id yordamida to'lov sahifasiga yo'naltirish
    const paymentUrl = `https://my.click.uz/services/pay?service_id=${SERVICE_ID}&merchant_id=${MERCHANT_ID}&amount=${amount}&transaction_param=${merchantTransId}&return_url=http://localhost:${port}/return-url`;

    res.json({ paymentUrl }); // To'lov sahifasiga yo'naltirish URLini yuborish
  } catch (error) {
    console.error('Error creating invoice:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Invoice creation failed', details: error.message });
  }
});

// AdminBro va boshqa marshrutlarni o'rnatish
const run = async () => {
  try {
    await mongoose.connect('mongodb+srv://saidaliyevjasur450:e2vxdfq0ZpZBINMU@kardiseproject.rbqdzor.mongodb.net', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log('Connected to MongoDB database');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }

  const admin = new AdminBro(options);
  const router = buildAdminRouter(admin);

  app.use(admin.options.rootPath, router);

  // Default routes
  app.get("/", (req, res) => {
    res.send("hello world. I'm JasurBek");
  });

  // CRUD marshrutlar
  app.post("/products", createProduct);
  app.get('/products', getAllProducts);
  app.delete('/products/:id', deleteProduct);
  app.put('/products/:id', updateProduct);
  app.post("/orders", createOrder);
  app.get("/orders", getAllOrders);
  app.get("/orders/:id", getOrderById);
  app.put("/orders/:id", updateOrder);
  app.delete("/orders/:id", deleteOrder);
  app.post("/banners", createBanner)
  app.get("/banners", getAllBanners)
  //profile
  app.post('/profiles', createProfile);
  app.put('/profiles/:id', updateProfile);
  app.get('/profiles', getAllProfiles);
  app.delete('/profiles/:id', deleteProfile);
  // app.put('/profiles/:id',  updateProfile);
  // Socket.IO configuration
  io.on('connection', (socket) => {z``
    console.log('A user connected:', socket.id);

    // Emit a message when a new order is created    
    socket.on('new-order', (data) => {
      io.emit('update-order-list', data); // Broadcast to all clients
      console.log('New order created:', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  // Start the server using HTTP server
  server.listen(port, () => console.log(
    `Example app listening at http://localhost:${port}`,
  ));
};

module.exports = run;
