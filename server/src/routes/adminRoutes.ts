import { Router } from "express";
import { createvehicle } from "../controllers/vehiclecontroller";

const router=Router()

router.post("/vehicle",createvehicle)

export default router;
