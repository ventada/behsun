const router = require("express").Router();
const { enshureAuth, enshureGeust } = require("../middleware/auth");
const solarHeater = require("../model/solarHeater");
const Order = require("../model/Order");

router.get("/all", async (req, res) => {
  try {
    let orders = await Order.find({ processed: false })
      .sort("-createdAt")
      .populate("product")
      .lean();

    res.render("order/orders", {
      orders,
      Link: ` <a href="/order/all/processed" class="btn btn-secondary">سفارشات پردازش شده</a>`,
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});
router.get("/all/processed", async (req, res) => {
  try {
    let orders = await Order.find({ processed: true })
      .populate("product")
      .lean();

    res.render("order/orders", {
      orders,
      Link: ` <a href="/order/all" class="btn btn-primary">سفارشات </a>`,
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});
router.get("/single/:id", async (req, res) => {
  try {
    let order = await Order.findOne({ _id: req.params.id })
      .populate("product")
      .lean();

    res.render("order/singleOrder", {
      order,
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});
router.get("/process/:id", async (req, res) => {
  try {
    let order = await Order.findOne({ _id: req.params.id })
      .populate("product")
      .lean();
    if (!order) {
      return res.render("error/404");
    }

    await Order.findOneAndUpdate({ _id: req.params.id }, { processed: true });

    res.redirect(`/order/single/${order._id}`);
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});
router.get("/:id", async (req, res) => {
  try {
    let solar = await solarHeater.findOne({ _id: req.params.id }).lean();
    if (!solar) {
      return res.render("error/404");
    }

    res.render("order/order", {
      solar,
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});
router.post("/:id", async (req, res) => {
  try {
    let solar = await solarHeater.findOne({ _id: req.params.id }).lean();
    if (!solar) {
      return res.render("error/404");
    }
    req.body.product = req.params.id;
    let order = await Order.create(req.body);
    req.flash("success", "سفارش شما با موفقیت ثبت شد");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});

module.exports = router;
