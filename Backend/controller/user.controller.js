import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/error.utlis.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import sendEmail from "../utils/email.utlis.js";
import bcrypt from "bcryptjs";
import { error, log } from "console";
import validator from "validator";
import OrderModel from "../models/order.model.js";
import checkoutModel from "../models/checkout.model.js";

const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes OTP expiry

// Email Transporter Setup

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const ENCRYPTION_KEY =
  "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";

const encryptionKey = Buffer.from(ENCRYPTION_KEY, "hex"); // Load from environment variable

const ivLength = 16; // AES requires a 16-byte IV

// Function to encrypt text (user ID)
const encrypt = (text) => {
  const iv = crypto.randomBytes(ivLength); // Generate a random IV
  const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex"); // Encrypt the text
  encrypted += cipher.final("hex"); // Finalize encryption
  return iv.toString("hex") + ":" + encrypted; // Store IV and encrypted text together
};

// Function to decrypt text (user ID)
const decrypt = (encryptedText) => {
  if (!encryptedText.includes(":")) {
    throw new Error("Invalid encrypted text format");
  }

  const parts = encryptedText.split(":");
  if (parts.length !== 2) {
    throw new Error("Malformed encrypted text");
  }

  const iv = Buffer.from(parts[0], "hex"); // Extract IV
  const encryptedData = parts[1]; // Extract encrypted text

  if (!iv || !encryptedData) {
    throw new Error("IV or encrypted data is missing");
  }

  const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionKey, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    decoded.userId = decrypt(decoded.userId); // Decrypt user ID
    return decoded;
  } catch (error) {
    return null; // Invalid token
  }
};

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" });
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// **1. Register User**
// export const register = async (req, res, next) => {
//   try {
//     let { name, email, password,phoneNumber } = req.body;

//     // name = name.trim();
//     // email = email.trim().toLowerCase();
//     // password = password.trim();

//     if (!name || !email || !password) {
//       return next(new AppError("All field are Required", 400))
//     }

//     if (!validator.isEmail(email)) {
//       return next(new AppError("Email is not Valid", 400))
//     }

//     if (name.length > 30) {
//       return next(new AppError("Name is too long", 400))
//     }

//     // Check if user already exists
//     const userExists = await User.findOne({ email: email.toLowerCase() });
//     if (userExists) {
//       return next(new AppError("User Already Exists", 400))
//     }

//     // Generate verification code
//     const verificationCode = crypto.randomInt(100000, 999999).toString();

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//     const user = new User({ name, email, password: hashedPassword, verificationCode,phoneNumber });
//     await user.save();

//     // Send verification email
//     await sendEmail(email, 'OTP(One Time Password) for Shanya Registration Login', `
//       <div style="font-family: Poppins, sans-serif; max-width: 600px; background-color: #f8f8f8; margin:0 auto; border-radius: 10px; padding: 20px;">

//         <!-- Logo -->
//         <img src="https://ayush.webakash1806.com/assets/Shanya-Djn2HjOw.png" style="width: 13rem; display: block;" />

//         <h1 style="font-size: 18px; font-weight: 600; line-height: 20px; margin:10px 0px; font-family: Poppins, sans-serif; color: #464646; letter-spacing:0.5px ">
//           Thank you for registering with <strong>Shanya Scans & Theranostics</strong>. To complete your verification, please use the code below
//         </h1>

//         <div style="background-color: #e7f3ff; color: #1877f2; padding: 12px 32px; border-radius: 7px; border: 1px solid #1877f2; font-size: 20px; font-weight: 600; text-align: center; letter-spacing:8px">
//           ${verificationCode}
//         </div>

//         <p style="font-size: 16px; color: #333; font-weight:500; margin-top:10px;  letter-spacing:0.5px color: #494949;">
//          If you didn't request the otp, there's nothing to worry just ignore it.
//         </p>

//         <p style="font-size: 14px; color:rgb(64, 64, 64); ">
//          <b>Best Regards</b>,<br/>Shanya Scans & Theranostics <br/>Toll Free No: 1800 123 4187 <br/> www.shanyascans.com
//         </p>
//       </div>
//     `);

//     const encryptedUserId = encrypt(user._id.toString());
//     // Generate JWT token
//     const token = jwt.sign({ userId: encryptedUserId }, process.env.SECRET, { expiresIn: "2d" });

//     user.token = token

//     const decoded = verifyToken(token);
//     console.log("Decoded User ID:", decoded.userId);

//     await user.save()

//     // Set the token in an HTTP-only secure cookie
//     res.cookie('authToken', token, {
//       httpOnly: false,
//       secure: true,
//       sameSite: 'None',
//       maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
//     });

//     res.status(201).json({
//       success: true,
//       message: "User Registered,Check email for verificicaion code",

//     })

//   } catch (error) {
//     console.log(error);

//     res.status(500).json({ message: error.message });
//   }
// };
// dob,age,gender
export const register = async (req, res, next) => {
  let userData;

  try {
    const { name, phoneNumber, dob, age, gender, email } = req.body;

    // 🔴 Required fields
    if (!name || !phoneNumber || !dob || !age || !gender) {
      return next(new AppError("All fields are required", 400));
    }

    // 📧 Email validation (optional but recommended)
    // if (email && !validator.isEmail(email)) {
    //   return next(new AppError("Email is not valid", 400));
    // }

    // 📱 Phone validation - Remove country code if present
    const cleanPhone = phoneNumber.replace(/^\+91|^0/, "").trim();

    // ✅ Manual validation for 10-digit Indian phone numbers
    if (!/^\d{10}$/.test(cleanPhone)) {
      return next(new AppError("Phone number must be a 10-digit number", 400));
    }

    // 👤 Name length
    if (name.length > 30) {
      return next(new AppError("Name is too long", 400));
    }

    // 🎂 Age validation
    const parsedAge = Number(age);
    if (isNaN(parsedAge) || parsedAge <= 0 || parsedAge > 150) {
      return next(
        new AppError("Age must be a valid number between 1 and 150", 400)
      );
    }

    // 🔍 Check existing user by phone number
    const userExists = await User.findOne({ phoneNumber: cleanPhone });
    if (userExists) {
      return next(
        new AppError("User already exists with this phone number", 400)
      );
    }

    // 🔐 Hash password
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // 🔢 Generate OTP
    // const otp = crypto.randomInt(100000, 999999).toString();

    // 👤 Create user
    const user = new User({
      name,
      email: email || `${cleanPhone}@shanyascans.temp`,
      // password: hashedPassword
      phoneNumber: cleanPhone,
      dob,
      age: parsedAge,
      gender: gender.toLowerCase(),
      // verificationCode: otp,
      // otpExpiresAt: new Date(Date.now() + OTP_EXPIRY_TIME),
    });

    userData = await user.save();

    // 📲 SEND OTP (SMS GATEWAY)
    // console.log("📱 REGISTER OTP SENT:", cleanPhone, "OTP:", otp);
    // await sendSmsOtp(cleanPhone, otp);

    // 🔐 JWT Token
    const encryptedUserId = encrypt(user._id.toString());

    const token = jwt.sign({ userId: encryptedUserId }, process.env.SECRET, {
      expiresIn: "2d",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      user: userData,
    });
  } catch (error) {
    // ❌ Rollback if failed
    if (userData?._id) {
      await User.findByIdAndDelete(userData._id);
    }

    console.error("[REGISTER ERROR]", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};


// **2. Verify User**
export const verifyUser = async (req, res) => {
  console.log("========== AUTH VERIFY (EMAIL / PHONE OTP) ==========");

  try {
    const { email, phoneNumber, otp } = req.body;
    const { type } = req.query;

    // 🔴 Either email or phone required
    if ((!email && !phoneNumber) || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email or Phone number and OTP are required",
      });
    }

    if (type === "register") {
      const existingUser = await User.findOne({ phoneNumber: phoneNumber });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already existed. Please login.",
        });
      }
    }

    let user;

    // 📧 Email based verification
    if (email) {
      const normalizedEmail = email.toLowerCase().trim();
      user = await User.findOne({ email: normalizedEmail });
    }

    // 📱 Phone based verification
    if (!user && phoneNumber) {
      const cleanPhone = phoneNumber.replace(/^\+91|^0/, "").trim();
      user = await User.findOne({ phoneNumber: cleanPhone });
    }

    if (!user || !user.verificationCode) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // ⏳ OTP expiry check
    if (user.otpExpiresAt && user.otpExpiresAt < Date.now()) {
      user.verificationCode = null;
      user.otpExpiresAt = null;
      await user.save();

      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // ❌ OTP mismatch
    if (user.verificationCode !== otp.toString()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ✅ OTP VERIFIED
    user.isVerified = true;
    user.verificationCode = null;
    user.otpExpiresAt = null;

    // 🔧 Normalize optional fields
    if (user.age && typeof user.age === "string") {
      const parsedAge = Number(user.age);
      user.age = Number.isNaN(parsedAge) ? undefined : parsedAge;
    }

    if (typeof user.dob === "undefined") user.dob = null;
    if (typeof user.gender === "undefined") user.gender = null;

    // 🔐 Encrypt user ID
    const encryptedUserId = encrypt(user._id.toString());

    // 🔐 Generate JWT
    const token = jwt.sign({ userId: encryptedUserId }, process.env.SECRET, {
      expiresIn: "7d",
    });

    // 🍪 Set auth cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        whatsappNumber: user.whatsappNumber,
        age: user.age,
        dob: user.dob,
        gender: user.gender,
        isVerified: user.isVerified,
        orderDetails: user.orderDetails,
        member: user.member,
      },
    });
  } catch (error) {
    console.error("[COMMON OTP VERIFY ERROR]", error);
    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
      error: error.message,
    });
  }
};

// **3. Login User**
export const login = async (req, res, next) => {
  try {
    const { email, password, phoneNumber } = req.body;
    // if (!email || !password) {
    //   return next(new AppError("All field are Required", 400))
    // }

    // if (!validator.isEmail(email)) {
    //   return next(new AppError("Email is Invalid", 400))
    // }

    let user;

    if (email) {
      user = await User.findOne({ email: email.toLowerCase() });
    } else {
      if (phoneNumber) {
        user = await User.findOne({ phoneNumber });
      } else {
        return next(new AppError("Email or Phone Number is Required", 400));
      }
    }

    if (!user) return next(new AppError("User not Found", 400));
    // if (!user.isVerified) return next(new AppError("User not Verfied", 400))

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new AppError("Password is Incorrect", 400));
    }

    const encryptedUserId = encrypt(user._id.toString());
    const token = jwt.sign({ userId: encryptedUserId }, process.env.SECRET, {
      expiresIn: "2d",
    });

    user.token = token;
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Login Succesfully",
      data: user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const loginwithOrder = async (req, res, next) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email });
      await user.save();
    }

    // Generate a 6-digit verification code
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    user.verificationCode = verificationCode;
    await user.save();

    // Send verification email
    try {
      await sendEmail(
        email,
        "OTP(One Time Password) for Shanya Registration Login",
        `
      <div style="font-family: Poppins, sans-serif; max-width: 600px; background-color: #f8f8f8; margin:0 auto; border-radius: 10px; padding: 20px;">
    
        <h1 style="font-size: 18px; font-weight: 600; line-height: 20px; margin:10px 0px; font-family: Poppins, sans-serif; color: #464646; letter-spacing:0.5px ">
          Thank you for registering with <strong>Shanya Scans & Theranostics</strong>. To complete your verification, please use the code below
        </h1>
    
        <div style="background-color: #e7f3ff; color: #1877f2; padding: 12px 32px; border-radius: 7px; border: 1px solid #1877f2; font-size: 20px; font-weight: 600; text-align: center; letter-spacing:8px">
          ${verificationCode}
        </div>
    
        <p style="font-size: 16px; color: #333; font-weight:500; margin-top:10px;  letter-spacing:0.5px color: #494949;">
         If you didn't request the otp, there's nothing to worry just ignore it.
        </p>
    
      
    
        <p style="font-size: 14px; color:rgb(64, 64, 64); ">
         <b>Best Regards</b>,<br/>Shanya Scans & Theranostics <br/>Toll Free No: 1800 123 4187 <br/> www.shanyascans.com
        </p>
      </div>
    `
      );
    } catch (error) {
      return next(new AppError("Failed to send email. Try again later", 500));
    }

    const encryptedUserId = encrypt(user._id.toString());
    // Generate JWT token
    const token = jwt.sign({ userId: encryptedUserId }, process.env.SECRET, {
      expiresIn: "2d",
    });

    user.token = token;

    // Set the token in an HTTP-only secure cookie
    res.cookie("authToken", token, {
      httpOnly: false,
      secure: true,
      sameSite: "None",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
    });

    await user.save();

    // Set the token in an HTTP-only secure cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
    });

    res.status(200).json({
      success: true,
      message: "User Registered. Check email for verification code.",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// **4. Logout User**
export const logout = async (req, res) => {
  try {
    // Clear the authToken cookie
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({
      success: true,
      message: "Logout Succesfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// **5. Resend Verification Code**
export const resendVerificationCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new AppError("Email is Required", 400));
    }
    const user = await User.findOne({ email });

    if (!user) {
      return next(new AppError("User not Found", 400));
    }

    const newCode = crypto.randomInt(100000, 999999).toString();

    try {
      await sendEmail(
        email,
        "Resent OTP(One Time Password) for Shanya Registration Login",
        `
      <div style="font-family: Poppins, sans-serif; max-width: 600px; background-color: #f8f8f8; margin:0 auto; border-radius: 10px; padding: 20px;">
        
        <!-- Logo -->
        <img src="https://res.cloudinary.com/diz0v7rws/image/upload/v1757410386/hope-hospital/gallery/WhatsApp_Image_2025-09-09_at_3.01.08_PM.jpg" style="width: 13rem; display: block;" />
    
        <h1 style="font-size: 18px; font-weight: 600; line-height: 20px; margin:10px 0px; font-family: Poppins, sans-serif; color: #464646; letter-spacing:0.5px ">
          Thank you for registering with <strong>Shanya Scans & Theranostics</strong>. To complete your verification, please use the code below
        </h1>
    
        <div style="background-color: #e7f3ff; color: #1877f2; padding: 12px 32px; border-radius: 7px; border: 1px solid #1877f2; font-size: 20px; font-weight: 600; text-align: center; letter-spacing:8px">
          ${newCode}
        </div>
    
        <p style="font-size: 16px; color: #333; font-weight:500; margin-top:10px;  letter-spacing:0.5px color: #494949;">
         If you didn't request the otp, there's nothing to worry just ignore it.
        </p>
    
      
    
        <p style="font-size: 14px; color:rgb(64, 64, 64); ">
         <b>Best Regards</b>,<br/>Shanya Scans & Theranostics <br/>Toll Free No: 1800 123 4187 <br/> www.shanyascans.com
        </p>
      </div>
    `
      );
    } catch (error) {
      return next(new AppError("Failed to send email. Try again later", 500));
    }

    user.verificationCode = newCode;
    await user.save();
    // try{

    //   await sendEmail(email, 'New Verification Code', `Your new verification code is: ${newCode}`);
    // }catch (error) {
    //       return next(new AppError("Failed to send email. Try again later", 500));
    //     }

    res.status(200).json({
      success: true,
      message: "Verification code resent. Check your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **6. Forgot Password (Generate Reset Code)**
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new AppError("Email is Required", 400));
    }
    console.log("Forgot Password Email:", email);
    const user = await User.findOne({ email });
    console.log("Forgot Password User:", user);
    if (!user) return res.status(400).json({ message: "User not found" });

    const resetCode = crypto.randomInt(100000, 999999).toString();
    user.verificationCode = resetCode;
    await user.save();
    try {
      await sendEmail(
        email,
        "Password Reset Code - Shanya Scans & Theranostics",
        `
  <div style="font-family: Poppins, sans-serif; max-width: 600px; background-color: #f8f8f8; margin:0 auto; border-radius: 10px; padding: 20px;">
    
    <!-- Logo -->
    <img src="https://res.cloudinary.com/diz0v7rws/image/upload/v1757410386/hope-hospital/gallery/WhatsApp_Image_2025-09-09_at_3.01.08_PM.jpg" style="width: 13rem; display: block;" />

    <h1 style="font-size: 18px; font-weight: 600; line-height: 20px; margin:10px 0px; font-family: Poppins, sans-serif; color: #464646; letter-spacing:0.5px ">
      You requested a <strong>Password Reset</strong> for your <strong>Shanya Scans & Theranostics</strong> account. Use the code below to reset your password.
    </h1>

    <div style="background-color: #e7f3ff; color: #1877f2; padding: 12px 32px; border-radius: 7px; border: 1px solid #1877f2; font-size: 20px; font-weight: 600; text-align: center; letter-spacing:8px">
      ${resetCode}
    </div>

    <p style="font-size: 16px; color: #333; font-weight:500; margin-top:10px; letter-spacing:0.5px; color: #494949;">
      If you did not request a password reset, please ignore this email. Your account is safe.
    </p>

    <p style="font-size: 14px; color:rgb(64, 64, 64); ">
      <b>Best Regards</b>,<br/>
      Shanya Scans & Theranostics <br/>
      Toll Free No: 1800 123 4187 <br/>
      <a href="https://www.shanyascans.com" style="color:#1877f2; text-decoration:none;">www.shanyascans.com</a>
    </p>
  </div>
  `
      );
    } catch (error) {
      return next(new AppError("Failed to send email. Try again later", 500));
    }
    res.status(200).json({
      success: true,
      message: "Password reset code sent to email.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// **7. Reset Password**
export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.verificationCode !== code) {
      return res.status(400).json({ message: "Invalid reset code" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.verificationCode = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful. You can now log in.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const validUser = await User.findById(id).populate("orderDetails");

    if (!validUser) {
      return next(new AppError(error.message, 500));
    }

    const allOrders = await OrderModel.find({ userId: id });

    let reversedOrders;

    if (allOrders.length != 0) {
      reversedOrders = allOrders.reverse();
      console.log("revserse order is ", reversedOrders);
    }

    res.status(200).json({
      success: true,
      message: "Order Details",
      data: reversedOrders,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const userAllOrder = async (req, res, next) => {
  try {
    const token = req.cookies.authToken; // Get the token from the HTTP-only cookie

    const decoded = verifyToken(token);

    console.log(decoded);

    const validUser = await User.findById(decoded.userId).populate(
      "orderDetails"
    );
    console.log(validUser);

    if (!validUser) {
      return next(new AppError(error.message, 500));
    }

    const allOrders = await OrderModel.find({ userId: validUser?._id });

    let reversedOrders;

    if (allOrders.length != 0) {
      reversedOrders = allOrders.reverse();
      console.log("revserse order is ", reversedOrders);
    }

    res.status(200).json({
      success: true,
      message: "Order Details",
      data: {
        user: validUser,
        orders: reversedOrders,
      },
    });
  } catch (error) {
    console.log(error);

    return next(new AppError(error.message, 500));
  }
};

export const isLogin = async (req, res, next) => {
  try {
    // Extract token from headers (Bearer token) or body
    const token = req.cookies.authToken; // Get the token from the HTTP-only cookie

    const decoded = verifyToken(token);

    if (!token) {
      return next(new AppError("Token is required", 400));
    }

    // Here, decoded.exp is the expiration timestamp from the token
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    if (decoded.exp < currentTime) {
      return next(new AppError("Token has expired", 401));
    }

    // If the token is not expired, proceed with the user lookup
    const validUser = await User.findOne({ _id: decoded.userId }).populate(
      "orderDetails"
    ); // Assuming orderDetails contains order IDs

    if (!validUser) {
      return next(new AppError("User not found or invalid token", 404));
    }

    if (!validUser.isVerified) {
      return next(new AppError("User Not Verified", 400));
    }

    // Token is valid, and user exists
    res.status(200).json({
      success: true,
      message: "You are Looged In",
    });
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Token has expired", 401));
    } else if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token", 401));
    }

    return next(new AppError(error.message, 500));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const validUser = await User.findById(id);
    if (!validUser) {
      return next(new AppError("User not found", 400));
    }

    // Update user and return updated data
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true, // Return updated document
      runValidators: true, // Validate before update
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
