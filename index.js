require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);

const mongoURI = process.env.MONGOURI;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongodb connected successfully");
  })
  .catch((err) => {
    console.log(err, "failed to connect");
  });

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
