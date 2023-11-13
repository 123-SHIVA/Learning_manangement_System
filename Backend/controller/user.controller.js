import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import User from "../models/user.model.js";
import fs from "fs/promises";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new AppError("All fields are required", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url:
        "https://res.cloudinary.com/djalpwlxo/image/upload/v1674647316/avatar_drzgxv.jpg",
    },
  });
  if (!user) {
    return next(new AppError("User registration fail please try again", 400));
  }

  //Todo file upload
  //    console.log("file details",req.file)
  if (req.file) {
    console.log(req.file);
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "LMS Project",
        width: 250,
        height: 250,
        gravitty: "faces",
        crops: "fill",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        //remove file from server
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (e) {
      return next(new AppError(e || "file not uploaded,please try again", 500));
    }
  }

  await user.save();

  User.password = undefined;

  const token = await user.generateJWTToken();

  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
};
// const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return next(new AppError("All fiels is required"), 400);
//     }
//     const user = await user
//       .findOne({
//         email
//       })
//       .select("password");

//     if (!user || !user.comparePassword(password)) {
//       return next(new AppError("eamil or password does not match", 400));
//     }

//     const token = await user.generateJWTToken();
//     user.password = undefined;

//     res.cookie("token", token, cookieOptions);

//     res.status(200).json({
//       success: true,
//       message: "User logged in successfully",
//       user,
//     });
//   } catch (error) {
//     return next(new AppError(error.message, 500));
//   }
// };




 const login = async (req, res, next) => {
  // Destructuring the necessary data from req object
  const { email, password } = req.body;

  // Check if the data is there or not, if not throw error message
  if (!email || !password) {
    return next(new AppError('Email and Password are required', 400));
  }

  // Finding the user with the sent email
  const user = await User.findOne({ email }).select('+password');

  // If no user or sent password do not match then send generic response
  if (!(user && (await user.comparePassword(password)))) {
    return next(
      new AppError('Email or Password do not match or user does not exist', 401)
    );
  }

  // Generating a JWT token
  const token = await user.generateJWTToken();

  // Setting the password to undefined so it does not get sent in the response
  user.password = undefined;

  // Setting the token in the cookie with name token along with cookieOptions
  res.cookie('token', token, cookieOptions);

  // If all good send the response to the frontend
  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    user,
  });
};



const logout = (req, res) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await user.findById(userId);

    res.status(200).json({
      success: true,
      message: "user details",
      user,
    });
  } catch (e) {
    return next(new AppError("Failed to fetch profile ", 400));
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Email not registered", 400));
  }

  const resetToken = await user.generatePasswordResetToken();

  await user.save();

  const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  console.log('--- -',resetPasswordURL);
  const subject = "reset password";
  const message = `you can  reset your password by clicking <a href=${resetPasswordURL} target=""/>`;
  try {
    await sendEmail(email, subject, message);

    res.status(200).json({
      success: true,
      message: `Reset password token has ${email} been sent to successfully`,
      resetToken,
    });
  } catch (e) {
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save();

    return next(new AppError(e.message, 500));
  }
};
const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;

  const { password } = req.body;

  const forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError("token is invalid or expired,please try again", 400)
    );
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  user.save();

  res.status(200).json({
    success: true,
    message: "passwor changed successfully",
  });
};

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const { id } = req.user;

  if (!oldPassword || !newPassword) {
    return next(new AppError("All fields are mandatory", 400));
  }

  const user = await User.findById(id).select("+password");

  if (!user) {
    return next(new AppError("user does not exist", 400));
  }
  const isPasswordValid = await user.comparePassword(oldPassword);

  if (!isPasswordValid) {
    return next(new AppError("invalid old password", 400));
  }

  user.password = newPassword;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "password changed succesfully",
  });
};

const updateUser = async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError(" user does not exist", 400));
  }
  if (req.name) {
    user.name = name;
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "LMS Project",
        width: 250,
        height: 250,
        gravitty: "faces",
        crops: "fill",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        //remove file from server
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (e) {
      return next(new AppError(e || "file not uploaded,please try again", 500));
    }
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "profile updated successfully",
  });
};

export {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser,
};
