import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("verifyToken middleware hit");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // 🔧 Yaha galti thi — 'autheader' ko 'authHeader' se replace kiya
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      _id: decoded.id,
      role: decoded.role
    };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
