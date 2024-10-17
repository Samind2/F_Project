const storecontrollers = require("../controllers/store.controllers");
const express = require("express");
const router = express.Router();

// Route สำหรับ CRUD รายวิชา
router.post("/", storecontrollers.create);
router.get("/", storecontrollers.getAll);
router.get("/", storecontrollers.getById);

module.exports = router; // ตรวจสอบให้แน่ใจว่าส่งออกเป็น router
