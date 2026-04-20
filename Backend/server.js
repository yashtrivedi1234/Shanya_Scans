import cloudinary from 'cloudinary';
import app from './app.js';
import ConnectionToDB from './config/dbConnection.js';
import Razorpay from 'razorpay';
import { config } from 'dotenv';
import http from 'http';
// import { Server } from 'socket.io';
// import MessageModel from './models/Message.model.js';
// import checkoutModel from './models/checkout.model.js';
// import collectionModel from './models/collectionSales.js';
// import mongoose from 'mongoose';
// import OrderModel from './models/order.model.js';
// import User from './models/user.model.js';
import { initSocket } from './socket/index.js';


config();

const PORT = process.env.PORT || 5500;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});


const server = http.createServer(app);

const io = initSocket(server);
const onlineUsers = new Map();
const onlineActiveUsers = new Map()

app.set("io", io); 
app.set("onlineUsers", onlineUsers); 
app.set("onlineActiveUsers", onlineActiveUsers);
const startServer = async () => {
  await ConnectionToDB();
  server.listen(PORT, () => {
    console.log(`Server is running at :${PORT}`);
  });
};

startServer();
