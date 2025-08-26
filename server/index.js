const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

require("dotenv").config();

app.use(cors());

app.use(express.json());

app.use("/api/auth", userRoutes);

app.use("/api/messages", messageRoutes);

app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connection was successfull!");
  })
  .catch((err) => console.log(err.message));

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started at port: ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
