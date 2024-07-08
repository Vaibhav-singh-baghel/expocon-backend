import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/user.model.js";

export const registerController = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(req.body)
    
    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ user_email: email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Already Registered. Please Login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User({
      user_role: role,
      user_email: email,
      user_password: hashedPassword,
    }).save();

    const { _id, user_status, user_role, user_email } = newUser;

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user: { _id, email: user_email, status: user_status, role: user_role },
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });

    const user = await User.findOne({ user_email: email });

    const match = await bcrypt.compare(password, user.user_password);

    if (!user || !match)
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        email: user.user_email,
        role: user.user_role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Register First to Login",
      error,
    });
  }
};

export const getUserByToken = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).send({
      success: true,
      message: "user found successfully",
      user: {
        email: user.user_email,
        role: user.user_role,
      },
    });
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "error while getting user",
      error,
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { name, password, status, role } = req.body;
    const user = await User.findById(req.user._id);

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        user_email: name || user.user_email,
        user_password: hashedPassword || user.user_password,
        user_status: status || user.user_status,
        user_role: role || user.user_role,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user._id);

    if (!deletedUser) {
      throw new Error("User Not found");
    }

    res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
      deletedUser,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
