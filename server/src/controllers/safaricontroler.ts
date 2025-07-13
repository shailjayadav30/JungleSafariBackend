import { Request, Response } from "express";
import { prisma } from "../db";
import { uploadImageoncloudinary } from "../utils/cloudinary";
import { UploadApiResponse } from "cloudinary";
export const addsafari = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const localImagePath = req.file;
    if (!localImagePath) {
      res.status(400).json({ message: "image is required" });
      return;
    }
    const safariImage: UploadApiResponse = await uploadImageoncloudinary(
      localImagePath
    );
    const safariUrl = safariImage.secure_url;
    if (
      !body.title ||
      !body.location ||
      !body.duration ||
      !body.price ||
      !body.rating ||
      !body.reviews ||
      !body.bestTime ||
      !body.highlights
    ) {
      res.status(401).json({ message: "All fields are required" });
      return;
    }

    const existingsafari = await prisma.safari.findFirst({
      where: {
        title: body.title,
        location: body.location,
      },
    });
    if (existingsafari) {
      res.status(401).json({ message: "Safari alredy exists" });
      return;
    }
    const newsfari = await prisma.safari.create({
      data: {
        title: body.title,
        location: body.location,
        duration: body.duration,
        price: parseFloat(body.price),
        rating: parseFloat(body.rating),
        reviews: parseInt(body.reviews),
        bestTime: body.bestTime,
        safariImage: safariUrl,
        // highlights: body.highlights,
        highlights: Array.isArray(body.highlights)
          ? body.highlights.join(", ")
          : body.highlights,
      },
    });
    res.status(201).json({ message: "Safari created", safari: newsfari });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error ", error });
    return;
  }
};

// export const getallsafari = async (req: Request, res: Response) => {
//   try {
//     const safari = await prisma.safari.findMany(
//       {
//         select: {
//         id: true,
//         title: true,
//       },
//       }
//     );
//     res
//       .status(200)
//       .json({ message: "All safari fetched successfully!! ", safari });
//   } catch (error) {
//     console.error("Error fetching safari:", error);
//     res.status(400).json({ mesage: "Error in getting safrai", error });
//   }
// };

export const getallsafari = async (req: Request, res: Response) => {
  try {
    const safaris = await prisma.safari.findMany({
      select: {
        id: true,
        title: true,
        location: true,
        duration: true,
        price: true,
        rating: true,
        reviews: true,
        bestTime: true,
        highlights: true,
        safariImage: true,
      },
    })

    // Log the data to check what's being returned
    console.log('Fetched safaris from DB:', safaris)

    // Ensure all fields have default values if they're null/undefined
    const safariWithDefaults = safaris.map(safari => ({
      ...safari,
      title: safari.title || 'Untitled Safari',
      location: safari.location || 'Location TBD',
      duration: safari.duration || 'Duration TBD',
      price: safari.price || 0,
      rating: safari.rating || 0,
      reviews: safari.reviews || 0,
      bestTime: safari.bestTime || 'Year round',
      highlights: safari.highlights || 'Amazing wildlife experience',
      safariImage: safari.safariImage || null
    }))

    res.status(200).json({ 
      message: "All safaris fetched successfully!!", 
      safari: safariWithDefaults 
    })
  } catch (error) {
    console.error("Error fetching safaris:", error)
    res.status(500).json({ 
      message: "Error in getting safaris", 
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
export const updatesafari = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    console.log("body", body);
    const existingsafari = await prisma.safari.findUnique({
      where: { id },
    });

    if (!existingsafari) {
      res.status(400).json({ message: "Safari not found" });
      return;
    }

    const updatedsafari = await prisma.safari.update({
      where: { id },
      data: {
        title: body.title,
        location: body.location,
        duration: body.duration,
        rating: parseFloat(body.rating),
        price: parseFloat(body.price),
        reviews: parseFloat(body.reviews),
        bestTime: body.bestTime,
        highlights: Array.isArray(body.highlights)
          ? body.highlights.join(", ")
          : body.highlights,
        safariImage: body.safariImage,
      },
    });
    res.status(200).json({ message: "safari updated", safar: updatedsafari });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deletesafari = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletesafari = await prisma.safari.delete({
      where: {
        id,
      },
    });
    res
      .status(200)
      .json({ message: "SAFARI DELETED SUCCESSFULLY", deletesafari });
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
};

export const getonesafari = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const safari = await prisma.safari.findUnique({
      where: { id },
    });
    if (!safari) {
      res.status(400).json({ message: "safari not found" });
      return;
    }
    res.status(200).json({ message: "safari fetched successfully", safari });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal sever error" });
  }
};
