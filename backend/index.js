const express = require("express");
const cors = require("cors");
const storeRoutes = require("./router/store.Router"); // นำเข้า routes ของ store
const SRole = require("./models/Role.model");
const db = require("./models")
require("dotenv").config();
const authRouter = require("./router/auth.router") // นำเข้า Router สำหรับ Authentication

const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://localhost:5173",
};

// Initialize roles
const initSRole = async () => {
  const existingSRoles = await SRole.findAll();
  if (existingSRoles.length === 0) {
    // สร้างบทบาทใหม่: "user" และ "admin"
    await SRole.create({ id: 1, name: "user" });
    await SRole.create({ id: 2, name: "admin" });
  } else {
        // ถ้ามีบทบาทอยู่แล้วจะแสดงข้อความ
    console.log("SRoles already exist.");
  }
};

// Initialize Express app
const app = express();
app.use(cors(corsOptions));
app.use(express.json()); // ใช้ middleware เพื่ออ่าน JSON

// Sync กับฐานข้อมูล
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
  initSRole(); // เรียกใช้เพื่อสร้าง role เริ่มต้น
});

// เชื่อมต่อ routes
app.use("/api/v1/stores", storeRoutes); // ใช้เส้นทาง /api/stores เพื่อเชื่อมต่อกับ router
app.use("/api/v1/auth", authRouter); // เพิ่มเส้นทาง authRouter

// Home page
app.get("/", (req, res) => {
  res.send("<h1>Welcome to API for Store Delivery Zone Check</h1>");
});

// Start the server
app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});
