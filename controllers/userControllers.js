const User = require("../models/User");
const bcrypt = require("bcryptjs");
//const { cloudinary } = require("../utils/cloudinary");
//const sendMail = require("../utils/sendEmail");
const generateToken = require("../utils/generateToken");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (user) {
      return res.status(401).json({
        status: "fail",
        message: "Please try a different username and email combinations",
      });
    } else {
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(password, salt);

      const newUser = new User({
        ...req.body,
        password: hash,
      });

      const savedUser = await newUser.save();

      const token = generateToken(savedUser);

      res.status(201).json({
        status: "success",
        token,
        user: savedUser,
      });

      //sendMail(savedTutor.username, savedTutor.email);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, Internal server error",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const pass = await bcrypt.compare(password, user.password);
      if (pass) {
        const token = generateToken(user);

        return res.status(200).json({
          status: "success",
          user,
          token,
        });
      } else {
        return res.status(403).json({
          status: "fail",
          message: "Incorrect password, please try a different passowrd",
        });
      }
    }

    return res.status(403).json({
      status: "fail",
      message: "Incorrect email, please try a different email",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, Internal server error",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, Internal server error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (user) {
      return res.status(200).json({
        status: "success",
        user,
      });
    }

    return res.status(404).json({
      status: "fail",
      message: "User does not exist",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, Internal server error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (user) {
      return res.status(200).json({
        status: "success",
        user,
      });
    }

    return res.status(404).json({
      status: "fail",
      message: "User does not exist",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went wrong, Internal server error",
    });
  }
};
