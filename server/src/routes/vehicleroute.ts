import { Router } from "express";
import {
  addvehicle,
  deletevehicle,
  getonevehicle,
  updatevehicle,
} from "../controllers/vehiclecontroller";
import { upload } from "../middlewares/multer";
const router = Router();

router.post("/add", upload.single("imageUrl"), addvehicle);
router.get("/:id", getonevehicle);
router.delete("/:id", deletevehicle);
router.put("/:id", upload.single("imageUrl"), updatevehicle);

export default router;
