const Product = require("../models/Product");
const { cloudinary } = require("../utils/cloudinary");

exports.createProduct = async (req, res) => {
  try {
    //const {thumbnail} = req.body

    const thumbnailResponse = await cloudinary.uploader.upload(
      req.body.thumbnail
    );

    const newProduct = new Product({
      ...req.body,
      thumbnail: thumbnailResponse.secure_url,
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      status: "success",
      product: savedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, Internal server error",
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, Internal server error",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: "success",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, Internal server error",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    if (product) {
      return res.status(200).json({
        status: "success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, Internal server error",
    });
  }
};
