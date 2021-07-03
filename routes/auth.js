const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
// middlewares
// const { enshureGeust } = require("../middleware/auth");
const { validateLogin, validateRegister } = require("../middleware/validate");

//@@@method POST
//@@@route /auth/login
//@@@desc login the user
router.post(
  "/login",
  validateLogin,
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

//@@@method POST
//@@@route /auth/regiset
//@@@desc register the user

router.post("/register", validateRegister, async (req, res) => {
  if (req.body.password != req.body.password2) {
    req.flash("error", "رمز عبورها باید یکی باشند");
    return res.redirect("/register");
  }
  if (!req.body.password || !req.body.password2 || !req.body.username) {
    req.flash("error", "  ورود نا معتبر");
    return res.redirect("/register");
  }

  // search for user if that
  const user = await User.findOne({ username: req.body.username });

  if (user) {
    req.flash("error", "ورود نا معتبر");
    return res.redirect("/register");
  }

  const newUser = {
    username: req.body.username,
     
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
  };
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    const user = await User.create(newUser);
    req.flash("success", "کاربر با موفقیت ایجاد شد");

    res.redirect("/login");
  } catch (err) {
    req.flash("error", err.messeage);
    res.render("500");
  }
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

module.exports = router;
