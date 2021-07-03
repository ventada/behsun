// import mongoose from 'mongoose'
const mongoose = require("mongoose");

const db = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`mongo db connected on ${con.connection.name}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = db;
