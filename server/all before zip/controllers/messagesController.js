const Message = require("../models/messageModel.js");

const addMessage = async (req, res, next) => {
  try {
    const { from, to, msg } = req.body;
    console.log("ready to create", from, to, msg);
    const data = await Message.create({
      message: { text: msg },
      users: [from, to],
      sender: from,
    });
    console.log("the data is ", data);

    if (data)
      return res.json({ msg: "Message sent successfully!", status: true });
    console.log("the data is ", data);
  } catch (err) {
    next(err);
  }
};

module.exports.addMessage = addMessage;
