const router = require("express").Router();
const { enshureAuth, enshureGeust } = require("../middleware/auth");
const solarHeater = require("../model/solarHeater");
const Message = require("../model/Message");

router.get("/all", async (req, res) => {
  try {
    let messages = await Message.find({}).sort("-createdAt").lean();
    res.render("messages/messages", {
      messages,
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});
router.post("/add", async (req, res) => {
  try {
    const m = {};
    m.name = req.body.name;
    m.phone = req.body.phone;
    m.text = req.body.text;

    if (!m.name) {
      req.flash("error", "اسم نباید خالی باشد");
      return res.redirect("/");
    }
    if (!m.phone) {
      req.flash("error", "شماره تماس نباید خالی باشد");
      return res.redirect("/");
    }
    if (!m.text) {
      req.flash("error", "متن پیام نباید خالی باشد");
      return res.redirect("/");
    }

    await Message.create(m);

    req.flash("success", "پیام شما با موفقیت ثبت شد");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});

module.exports = router;
