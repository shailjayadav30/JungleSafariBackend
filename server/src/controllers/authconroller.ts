import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../db/index";
import jwt from "jsonwebtoken";
export const register = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    if (
      !body.email ||
      !body.phone ||
      !body.role ||
      !body.password ||
      !body.username
    ) {
      res.status(400).json({ message: "ALl fields are required" });
      return;
    }
    if (body.phone.length < 10) {
      res.status(401).json({ message: "Enter a valid number" });
      return;
    }
    const existinguser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (existinguser) {
      res.status(404).json({ message: "user allready registered Login" });
      return;
    }
    const hashedpass = await bcrypt.hash(body.password, 10);
    const newuser = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedpass,
        username: body.username,
        phone: `+91${body.phone}`,
        role: body.role,
      },
    });
    res.status(200).json({ message: "User created successfully", newuser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const login = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    if (!body.email || !body.password) {
      res.status(404).json({ message: "All fields are required" });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: body.email }, { password: body.password }],
      },
    });
    if (!user) {
      res.status(400).json("User not found");
      return;
    }
    const ismatch = await bcrypt.compare(body.password, user.password);
    if (!ismatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      maxAge: 60 * 60 * 1000,
      // localhost

      // httpOnly: true,
      // secure: false,
      // sameSite: "lax",
      // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      // maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({ message: "user login successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
};






export const updatepassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { currentpass, newpass } = req.body;

    if (!currentpass || !newpass) {
      res.status(400).json({ message: "Current password and new password are required" });
      return;
    }

    if (newpass.length < 8) {
      res.status(400).json({ message: "New password must be at least 8 characters long" });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isCurrentPassCorrect = await bcrypt.compare(currentpass, existingUser.password);

    if (!isCurrentPassCorrect) {
      res.status(401).json({ message: "Current password is incorrect" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newpass, 10);

    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
