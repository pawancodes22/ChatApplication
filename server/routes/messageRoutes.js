const { Router } = require("express");
const {
  addMessage,
  getMessages,
} = require("../controllers/messagesController.js");

const router = Router();

router.post("/addMessage", addMessage);

router.get("/getMessages", getMessages);

module.exports = router;
