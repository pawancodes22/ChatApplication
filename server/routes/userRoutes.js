const { Router } = require("express");
const {
  register,
  login,
  setAvatar,
  getAllUsers,
} = require("../controllers/usersController");

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/setAvatar/:userId", setAvatar);

router.get("/allUsers/:userId", getAllUsers);

module.exports = router;
