import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../models/userModels.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ error: "name is required" });
    }
    if (!email) {
      return res.send({ error: "email is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }
    if (!phone) {
      return res.send({ error: "phone is required" });
    }
    if (!address) {
      return res.send({ error: "address is required" });
    }

    // existing users

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({ success: true, message: "already exist" });
    }

    // hash password

    const hashpass = await hashPassword(password);

    // save user

    const user = await new User({
      name,
      email,
      password: hashpass,
      address,
      phone,
    }).save();

    res.status(201).send({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error in registration", error });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "invalid email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "email does not exists" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid password",
      });
    }

    // Token

    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "error in login", error });
  }
};
