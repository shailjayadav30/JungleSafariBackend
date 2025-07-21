import { Router } from "express";
import {contactController} from '../controllers/contactcontroller'
const router=Router()

router.post("/c",contactController)


export default router