import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof payload === "string") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = {
      id: payload.id,
      email: payload.email,
      name: payload.name,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
