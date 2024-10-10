const express = require("express");
const cors = require("cors");
const sequelize = require("./models/db");
const storeRoutes = require("./router/store.Router"); // นำเข้า routes ของ store
const SUser = require("./models/User.models"); // นำเข้าโมเดล SUser
const SRole = require("./models/Role.model");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://localhost:5173",
};

// Initialize roles
const initSRole = async () => {
  const existingSRoles = await SRole.findAll();
  if (existingSRoles.length === 0) {
    await SRole.create({ id: 1, name: "user" });
    await SRole.create({ id: 2, name: "admin" });
  } else {
    console.log("SRoles already exist.");
  }
};

// Initialize Express app
const app = express();
app.use(cors(corsOptions));
app.use(express.json()); // ใช้ middleware เพื่ออ่าน JSON

// Sync กับฐานข้อมูล
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
  initSRole(); // เรียกใช้เพื่อสร้าง role เริ่มต้น
});

// เชื่อมต่อ routes
app.use("/api/stores", storeRoutes); // ใช้เส้นทาง /api/stores เพื่อเชื่อมต่อกับ router

// Home page
app.get("/", (req, res) => {
  res.send("<h1>Welcome to API for Store Delivery Zone Check</h1>");
});

// Start the server
app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});         
