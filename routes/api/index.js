const router = require("express").Router();
const userRoutes = require("./user");
const goalRoutes = require("./goals");
const soulRoutes = require("./soul");


//User routes?
router.use("/user", userRoutes);

//Goals routes?
router.use("/goal", goalRoutes);

//Soul Time routes?
router.use("/soul", soulRoutes);

module.exports = router;
