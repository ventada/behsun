const router = require("express").Router();
const { enshureAuth, enshureGeust } = require("../middleware/auth");
const solarHeater = require("../model/solarHeater");
router.get("/", async (req, res) => {
  let solars = await solarHeater.find({}).limit(2).lean();
  res.render("index", {
    solars,
  });
});

router.get("/login", enshureGeust, (req, res) => {
  res.render("auth/login"); // { layout: "login" }
});

router.get("/register", enshureGeust, (req, res) => {
  res.render("auth/register");
});

module.exports = router;
