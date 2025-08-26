const { Router } = require("express");
const { addMessage } = require("../controllers/messagesController.js");

const router = Router();

router.post("/addMessage", addMessage);

// router.get("/getMessage", getMessages);

module.exports = router;
