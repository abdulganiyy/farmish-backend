const express = require("express");
const router = express.Router();

//const verifyUser = require("../middlewares/verifyUser");

const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

router.post("/", createProduct);

router.get("/", getProducts);

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
