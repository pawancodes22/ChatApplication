// import User from "../models/usersModel";
const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    const emailCheck = await User.findOne({ email });
    if (usernameCheck) {
      return res.json({ msg: "Username already used!", status: false });
    }
    if (emailCheck) {
      return res.json({ msg: "Email already used!", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    const user = userDoc.toObject();
    delete user.password;

    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "Username is incorrect", status: false });
    }
    const isPasswordTrue = await bcrypt.compare(password, user.password);
    if (!isPasswordTrue)
      return res.json({ status: false, msg: "Password is incorrect" });

    const userObj = user.toObject();
    delete userObj.password;

    return res.json({ status: true, user: userObj });
  } catch (error) {
    next(error);
  }
};
const setAvatar = async (req, res, next) => {
  try {
    const { image } = req.body;
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.json({ isSet: false, msg: "User doesn't exist!" });
    } else {
      await User.updateOne(
        { _id: userId },
        { $set: { isAvatarImageSet: true, avatarImage: image } }
      );
      return res.json({ isSet: true, avatarImage: image });
    }
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const users = await User.find({ _id: { $ne: userId } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json({ users });
  } catch (error) {
    next(error);
  }
};

module.exports.register = register;
module.exports.login = login;
module.exports.setAvatar = setAvatar;
module.exports.getAllUsers = getAllUsers;
