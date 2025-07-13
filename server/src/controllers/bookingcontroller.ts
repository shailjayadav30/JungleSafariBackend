import { prisma } from "../db";
import { Request, Response } from "express";

export const createBooking = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    checkInDate,
    adults,
    children,
    accommodationType,
    safariId,
    totalPrice,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !checkInDate ||
    adults === undefined ||
    children === undefined ||
    !accommodationType ||
    !safariId ||
    totalPrice === undefined
  ) {
     res.status(400).json({ message: "All details are required" });
     return
  }

  try {
    const data: any = {
      firstName,
      lastName,
      email,
      phoneNumber,
      checkInDate: new Date(checkInDate),
      adults,
      children,
      accommodationType,
      safari: { connect: { id: safariId } },
      totalPrice,
    };

    const userId = (req as any).userId;
    if (userId) {
      data.user = { connect: { id: userId } };
    }

    const booking = await prisma.booking.create({ data });

    res.status(200).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      message: "Booking failed",
      error: error instanceof Error ? error.message : error,
    });
  }
};
