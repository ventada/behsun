const router = require("express").Router();
const { enshureAuth, enshureGeust } = require("../middleware/auth");
const solarHeat = require("../model/solarHeater");
const path = require("path");
router.get("/all", async (req, res) => {
  try {
    let solars = await solarHeat.find({}).limit(2).lean();
    res.render("product/products", {
      solars,
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});

router.get("/add", async (req, res) => {
  try {
    res.render("product/addProduct");
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});

router.post("/add", enshureAuth, async (req, res) => {
  try {
    req.body.images = [];
    console.log();
    if (req.files) {
      if (req.files.pics.length > 1) {
        const images = req.files.pics;

        images.forEach((img, index) => {
          const photoName = `photo_${Date.now()}${path.parse(img.name).ext}`;

          req.body.images.push({ fileName: photoName });
          img.mv(`./public/uploads/${photoName}`, (err) => {
            if (err) {
              req.flash("error", err.message);
              return res.redirect("/products/add");
            }
          });
        });
      } else {
        const image = req.files.pics;

        const photoName = `photo_ ${Date.now()}${path.parse(image.name).ext}`;

        req.body.images.push({ fileName: photoName });
        image.mv(`./public/uploads/${photoName}`, (err) => {
          if (err) {
            req.flash("error", err.message);
            return res.redirect("/products/add");
          }
        });
      }
    }
    let solar = await solarHeat.create(req.body);
    res.json(solar);
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    let solar = await solarHeat.findOne({ _id: req.params.id }).lean();
    if (!solar) {
      return res.render("error/404");
    }
    res.render("product/product", {
      solar,
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    let solar = await solarHeat.findOne({ _id: req.params.id }).lean();
    if (!solar) {
      return res.render("error/404");
    }

    res.render("product/editProduct", {
      solar,
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});
router.post("/edit/:id", async (req, res) => {
  try {
    let solar = await solarHeat.findOne({ _id: req.params.id }).lean();
    if (!solar) {
      return res.render("error/404");
    }
    const doc = await solarHeat.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      // If `new` isn't true, `findOneAndUpdate()` will return the
      // document as it was _before_ it was updated.
      { new: true }
    );
    res.redirect(`/products/single/${doc._id}`);
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});
module.exports = router;
