import { Router } from "express";
import { register, login } from "../controllers/authconroller";

const authrouter = Router();

authrouter.post("/register", register);
authrouter.post("/login", login);

export default authrouter;
