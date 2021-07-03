// import express from 'express'
// import config from 'dotenv'
// import schedule from './model/Schedule.js'

const express = require("express");
const config = require("dotenv");
const session = require("express-session");
const MongoDbStore = require("connect-mongo");
const flash = require("connect-flash");
const path = require("path");
const passport = require("passport");
const exphbs = require("express-handlebars");
const fileupload = require("express-fileupload");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
// models

config.config({ path: "./config/.env" });
const app = express();

// config database
require("./config/db")();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  fileupload({
    limits: { fileSize: 20 * 1024 * 1024 },
  })
);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// sanitize data
app.use(mongoSanitize());

// set sequrity headers
app.use(helmet());
// prevent xss atack
app.use(xss());

// rateLimit

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 100,
});
app.use(limiter);

// prevent http param polution
app.use(hpp());

// helpers
const {
  adminAddLink,
  commaSeparate,
  adminFeature,
  getImage,
  texttruncate,
} = require("./helpers/exphs");
app.engine(
  ".hbs",
  exphbs({
    helpers: {
      adminAddLink,
      commaSeparate,
      adminFeature,
      getImage,
      texttruncate,
    },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// confog passport
require("./config/passport")(passport);

// local vars config
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.info = req.flash("info");
  next();
});

// routes

app.use("/", require("./routes/index"));
app.use("/products", require("./routes/solarHeat"));
app.use("/order", require("./routes/order"));
app.use("/message", require("./routes/messages"));

app.use("/auth", require("./routes/auth"));
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
