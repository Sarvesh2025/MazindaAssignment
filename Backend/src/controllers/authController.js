import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prismaClient from "../lib/db.js";

const saltrounds = 10;

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin,
    isActivated: user.isActivated,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return token;
}

export const signUp = async (req, res) => {
  const body = req.body;
  const pass = await bcrypt.hash(body.password, saltrounds);

  const user = await prismaClient.user.create({
    data: {
      email: body.email,
      username: body.username,
      isAdmin: false,
      isActivated: true,
      password: pass,
    },
  });

  if (!user) return res.status(400).send("Bad Request");

  return res.status(201).cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
  });
  return res.status(200).json("User Signed Up successfully");
};

export const login = async (req, res) => {
  console.log(req.body.email,req.body.password);
  const { email, password } = req.body;
  
  const user = await prismaClient.user.findFirst({
    where: { email },
  });
  if(!user) console.log("Land MIla");
  
  if (!user) return res.status(404).send("User not found");

  const matched = await bcrypt.compare(password, user.password);

  if (matched) {
    const token = generateToken(user);
     res.status(200).cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
     });
    console.log("DOne");
    
     return res.status(200).json({ message: "Login successful" });
  }
};



