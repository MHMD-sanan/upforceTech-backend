require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const corsOptions = require("./config/corsOption");
const errorHandler = require("./middleware/errorHandler");

//cors settting
app.use(cors(corsOptions));

//middleware for json and form data
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));

// connection to db
require("./config/db");

//routing
app.use("/", require("./route/route"));

// 404 page
app.all("*", (req, res) => {
  res.send("404 page");
});

//global error handler
app.use(errorHandler);

//server
const server = app.listen(PORT, () => {
  console.log(`server connected at ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
