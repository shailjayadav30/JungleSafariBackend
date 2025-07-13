import { Request, Response } from "express";
import { prisma } from "../db/index";
import { uploadImageoncloudinary } from "../utils/cloudinary";
import { UploadApiResponse } from "cloudinary";

export const addvehicle = async (req: Request, res: Response) => {
  try {
    console.log("Inside add vehicle");
    const localImagePath = req.file;
    if (!localImagePath) {
      res.status(400).json({ message: "Image is required" });
      return;
    }

    const imageUrl: UploadApiResponse = await uploadImageoncloudinary(
      localImagePath
    );
    const vehicleUrl = imageUrl.secure_url;

    const { vehicleNo, vehicleType } = req.body;
    const capacity = req.body.capacity
      ? parseInt(req.body.capacity, 10)
      : undefined;
    if (!vehicleNo || !vehicleType) {
      res
        .status(400)
        .json({ message: "vehicleNo and vehicleType are required" });
      return;
    }

    const newVehicle = await prisma.$transaction(async (tx) => {
      let existingvehicletype = await tx.vehicleType.findUnique({
        where: { type: vehicleType },
      });

      if (!existingvehicletype) {
        existingvehicletype = await tx.vehicleType.create({
          data: {
            type: vehicleType,
            vehicleName: `${vehicleType} Default Name`,
            capacity: capacity ?? 6,
          },
        });
      }

      const createdehhicle = await tx.vehicle.create({
        data: {
          vehicleNo,
          capacity,
          vehicleType,
          typeId: existingvehicletype.id,
          imageUrl: vehicleUrl,
        },
      });
      return createdehhicle;
    });

    res.status(201).json({
      message: "Vehicle added successfully",
      newVehicle,
    });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ message: "Failed to add vehicle", error });
  }
};

export const getonevehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
    });
    if (!vehicle) {
      res.status(404).json({ message: "vehicle not found" });
      return;
    }
    res.status(200).json({ message: "vehicle get succesfully", vehicle });
  } catch (error) {
    res.status(400).json({ message: "server errorr", error });
  }
};

export const deletevehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vehicle = await prisma.vehicle.delete({
      where: { id },
    });
    if (!vehicle) {
      res.status(400).json({ message: "vehicle not found" });
      return;
    }

    res.status(200).json({ message: "vehicle deleted successfully" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internalserver error" });
  }
};

export const updatevehicle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const existingvehicle = await prisma.vehicle.findUnique({
      where: { id },
    });

    if (!existingvehicle) {
      res.status(400).json({ message: "vehicle does not exists" });
      return;
    }
    let imageUrl = existingvehicle.imageUrl;

    // ✅ Handle new image upload (if a new file is provided)
    if (req.file) {
      const uploadResult: UploadApiResponse = await uploadImageoncloudinary(
        req.file
      );
      imageUrl = uploadResult.secure_url;
    }
    const updatedvehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        vehicleNo: body.vehicleNo,
        capacity: parseInt(body.capacity),
        vehicleType: body.vehicleType,
        typeId: body.typeId,
        imageUrl: imageUrl,
      },
    });
    res
      .status(200)
      .json({ message: "vehicle updated successfully", updatedvehicle });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in updating vehicle", error });
  }
};
