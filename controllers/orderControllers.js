const Order = require("../models/Order");
const User = require("../models/User");

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
    });

    const savedOrder = await newOrder.save();

    const totatlOrderPrice = req.body.products.reduce(
      (acc, product) => acc + product.price,
      0
    );

    const user = await User.findByIdAndUpdate(
      "62729a68ed0bd3a190c75ea5",
      {
        price: totatlOrderPrice,
      },
      { new: true }
    );

    return res.status(201).json({
      status: "success",
      order: savedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, Internal server error",
    });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({
      user: userId,
    }).populate("products");

    return res.status(200).json({
      status: "success",
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, Internal server error",
    });
  }
};
