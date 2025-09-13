const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
// const agentRoutes = require("./agentRoutes");
// const leadRoutes = require("./leadRoutes");

router.use("/auth", authRoutes);
// router.use("/agents", agentRoutes);
// router.use("/leads", leadRoutes);

module.exports = router ; 