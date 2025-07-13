import { Router } from "express";
import { createBooking } from "../controllers/bookingcontroller";
// import { authmiddleware } from "../middlewares/authmiddlewares";
const router = Router();
// router.use(authmiddleware);

router.post("/book",createBooking);

export default router;
