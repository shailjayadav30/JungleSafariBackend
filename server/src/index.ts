import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authrouter from "./routes/authRoutes";
import bookingrouter from "./routes/bookingroutes";
import vehicleroute from "./routes/vehicleroute";
import safariroute from "./routes/safariroute";
dotenv.config();
const PORT = process.env.PORT || "3000";
const app = express();

app.use(
  cors({
    // origin:"http://localhost:3000" ,
    origin:"https://jungle-safari-frontend.vercel.app/" ,

    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authrouter);
app.use("/api/booking", bookingrouter);
app.use("/api/vehicle", vehicleroute);
app.use("/api/safari", safariroute);

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});


// "https://jungle-safari-frontend.vercel.app/"