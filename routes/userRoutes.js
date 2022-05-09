const express = require("express");
const router = express.Router();

//const verifyUser = require("../middlewares/verifyUser");

const {
  signup,
  signin,
  getUsers,
  getUser,
  updateUser,
} = require("../controllers/userControllers");

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/", getUsers);

router.get("/:id", getUser);

router.put("/:id", updateUser);

module.exports = router;
