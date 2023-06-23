const mongoose = require("mongoose");
const connectDB = mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((err) => {
    console.log("Error connecting to mongodb", err.message);
  });

module.exports = connectDB;
