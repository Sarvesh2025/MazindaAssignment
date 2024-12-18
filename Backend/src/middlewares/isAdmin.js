import jwt from "jsonwebtoken";
import prisma from "../lib/db.js";

export default async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    const isAuth = true;
    if (!token) isAuth = false;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) isAuth = false;

    if (!user.isAdmin) isAuth = false;

    if (isAuth) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
