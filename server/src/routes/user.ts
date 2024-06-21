import { signinInput, signupInput } from "../zod";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  const { success } = signupInput.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "invalid inputs",
    });
  }

  const userExists = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  if (userExists) {
    return res.status(411).json({
      message: "user already exits please signin",
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({
      message: "Internal server error: JWT_SECRET is not defined",
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
      },
    });
    const jwtToken = jwt.sign({ id: user.id }, jwtSecret);
    return res.json({
      msg: "user created successfully",
      token: jwtToken,
    });
  } catch {
    return res.status(403).json({
      msg: "error while signing up",
    });
  }
});



router.post("/signin", async (req: Request, res: Response) => {
  const { success } = signinInput.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "enter valid inputs",
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.json({
      msg: "user do not exits",
    });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({
      message: "Internal server error: JWT_SECRET is not defined",
    });
  }

  try {
    const passwordVerification = await bcrypt.compare( req.body.password , user.password);
    if (passwordVerification) {
      const jwtToken = jwt.sign({ id: user.id }, jwtSecret);
      return res.json({
        msg: "login successful",
        token: jwtToken,
      });
    } else {
      return res.status(411).json({
        error: "enter correct password",
      });
    }
  } catch (e) {
    return res.status(403).json({
      msg: "error while signing in",
      error: e,
    });
  }
});

export default router