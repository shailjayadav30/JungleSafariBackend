import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authmiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;
  console.log("🛡️ Auth Middleware Triggered");
  console.log("📦 Token received:", token);
  if (!token) {
    console.log("❌ No token found");
    res.status(400).json({ message: "Unauthorized:no token" });
    return;
  }

  try {
    const decodetoken = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
    };
    (req as any).userId = decodetoken.id;
    console.log("✅ Token verified. User ID:", decodetoken.id);

    next();
  } catch (error) {
    console.log("❌ Token verification failed:", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }
};
