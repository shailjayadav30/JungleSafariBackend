import { Request, Response } from "express";
import { prisma } from "../db";

export const contactController = async (req: Request, res: Response) => {
  const { FullName, email, phone, inquiryType, message, Subject } = req.body;

  if (!FullName || !email || !phone || !inquiryType || !message) {
     res.status(400).json({ message: "All required fields must be provided." });
     return
  }

  try {
    const contact = await prisma.contact.create({
      data: {
        FullName,
        email,
        phone,
        inquiryType,
        message,
        Subject: Subject || null, // in case Subject is optional
      },
    });

    res.status(201).json({

      message: "Message sent successfully. We will contact you soon.",
      contact,
    });
    return
  } catch (error) {
    console.error("Error creating contact:", error);
     res.status(500).json({ message: "Internal server error." });
     return
  }
};
