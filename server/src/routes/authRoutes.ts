import { Router } from "express";
import { register, login, updatepassword } from "../controllers/authconroller";

const authrouter = Router();

authrouter.post("/register", register);
authrouter.post("/login", login);
authrouter.put("/updatepass/:id", updatepassword);


export default authrouter;
