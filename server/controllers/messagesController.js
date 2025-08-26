const Message = require("../models/messageModel.js");

const addMessage = async (req, res, next) => {
  try {
    const { from, to, msg } = req.body;
    const data = await Message.create({
      message: { text: msg },
      users: [from, to],
      sender: from,
    });

    if (data)
      return res.json({ msg: "Message sent successfully!", status: true });
  } catch (err) {
    next(err);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { senderId, recieverId } = req.query;
    const data = await Message.find({
      users: { $all: [senderId, recieverId] },
    });
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports.addMessage = addMessage;
module.exports.getMessages = getMessages;
