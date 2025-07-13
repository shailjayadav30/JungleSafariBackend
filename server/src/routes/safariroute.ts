import { Router } from "express";
import {
  addsafari,
  deletesafari,
  getallsafari,
  getonesafari,
  updatesafari,
} from "../controllers/safaricontroler";
import { upload } from "../middlewares/multer";
const router = Router();

router.post("/add", upload.single("safariImage"), addsafari);
router.get("/all", getallsafari);
router.get("/:id", getonesafari);
router.put("/:id", upload.single("safariImage"), updatesafari);
router.delete("/:id", deletesafari);

export default router;
