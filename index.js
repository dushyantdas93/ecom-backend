import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js"
import cors from "cors"

dotenv.config();

const app = express();

connectDB()
app.use(cors());

// middleware

app.use(express.json())
app.use(morgan('dev'))

app.use("/api/v1/auth",authRoute)

app.get("/", (req, res) => {
  res.send({ message: "welcome to ecommerce app" });
});

// port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on ${process.env.DEV_MODE} port ${PORT}`);
});
