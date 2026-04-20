import collectionModel from "../models/collectionSales.js";
import OrderModel from "../models/order.model.js";
import User from "../models/user.model.js";
import { onlineUsers, onlineActiveUsers } from "./index.js";

export default function trackingSocket(io, socket) {
  // Join salesman room
  socket.on("joinRoom", (salesPersonId) => {
    socket.join(salesPersonId);
    onlineUsers.set(salesPersonId, socket.id);
    console.log(`[TRACKING] Salesperson joined: ${salesPersonId}`);
  });

  // Salesman sends location update
  socket.on("sales-dashboard-join", async (data) => {
    console.log("[DEBUG] sales-dashboard-join fired with:", data);
    try {
       if (typeof data === "string") {
      data = JSON.parse(data); 
    }
      const { salesId, lat, lng } = data;
console.log("[DEBUG] Parsed Data - Sales ID:", salesId, "Lat:", lat, "Lng:", lng);
      const validSales = await collectionModel.findById(salesId);
console.log("[DEBUG] Valid Salesperson:", validSales);
      validSales.lat = lat;
      validSales.lng = lng;
      const locationData = await validSales.save();
      console.log("[DEBUG] Location data saved:", locationData);

      const getSalesData = onlineActiveUsers.get(salesId);
      if (getSalesData) {
        io.to(getSalesData.socketId).emit("get-updated-sales-lat-lng", {
          sales_lat: Number(lat),
          sales_lng: Number(lng),
        });
        console.log(`[TRACKING] Live Location -> LAT: ${lat}, LNG: ${lng}`);
      }
    } catch (error) {
      console.error("[TRACKING ERROR]", error.message);
    }
  });

  // User requests salesman location
  socket.on("get-sales-lat-lng", async (data) => {
    try {
      console.log("get-sales-lat-lng",data)
      const validOrder = await OrderModel.findById(data?.orderDetailId);
      if (!validOrder) return console.log("Invalid Order ID");

      const validSales = await collectionModel.findById(validOrder?.assignedTo);
      if (!validSales) return console.log("No Salesman Assigned");

      socket.join(validOrder.userId);
      onlineActiveUsers.set(validSales._id.toString(), {
        userId: validOrder.userId,
        socketId: socket.id,
      });

      io.to(socket.id).emit("get-updated-sales-lat-lng", {
        sales_lat: Number(validSales.lat),
        sales_lng: Number(validSales.lng),
      }, 
  //     (ack) => {
        
  //       console.log("Client acknowledged:", ack); 
  // }
    );
    } catch (error) {
      console.error("[TRACKING ERROR]", error.message);
    }
  });
}
