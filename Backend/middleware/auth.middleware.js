import jwt from "jsonwebtoken";
import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const encryptionKey = Buffer.from(ENCRYPTION_KEY, "hex");
const ivLength = 16;

const decrypt = (encryptedText) => {
  const parts = encryptedText.split(":");
  const iv = Buffer.from(parts[0], "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionKey, iv);
  let decrypted = decipher.update(parts[1], "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

export const authenticate = (req, res, next) => {
  try {
    // Get token from header first (priority for GET requests)
    let token = req.headers.authorization?.replace("Bearer ", "");

    // Fall back to cookies for POST requests
    if (!token) {
      token = req.cookies.authToken;
    }

    // Fall back to body for POST requests only
    if (!token && req.method === "POST") {
      token = req.body.token;
    }

    console.log("🔍 TOKEN CHECK:", token ? "✅ Found" : "❌ Not Found");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is required",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    // Decrypt userId
    const userId = decrypt(decoded.userId);
    req.user = { userId }; // ✅ Attach to request

    console.log("✅ AUTHENTICATED USER:", userId);
    next();
  } catch (error) {
    console.error("❌ AUTH MIDDLEWARE ERROR:", error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      error: error.message,
    });
  }
};
