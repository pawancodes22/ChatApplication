const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
require("dotenv").config();

app.use(cors());

app.use(express.json());

app.use("/api/auth", userRoutes);

app.use("/api/messages", messageRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connection was successfull!");
  })
  .catch((err) => console.log(err.message));

app.listen(process.env.PORT, () =>
  console.log(`Server started at port: ${process.env.PORT}`)
);
