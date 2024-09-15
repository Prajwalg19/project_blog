import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import express from "express"
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js"
import blogRoutes from "./routes/blogRoutes.js"
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const corsConfig = {
    credentials: true,
    origin: ["http://localhost:5173", "https://blog-space-sigma.vercel.app", "https://blogs.prajwal19.tech"]
}

app.use(cors(corsConfig))
app.use(express.json());
app.use(morgan("dev"))
app.use(cookieParser())

const port = process.env.PORT || 4500
const con_str = process.env.MONGO_CON_STR || ""
app.listen(port, () => {
    console.log("Server started successfully in port", port);
})

mongoose.connect(con_str).then(() => {
    console.log("Database connected successfully")
}).catch(() => {
    console.log("Coudln't connect to the Database");
})


app.use("/auth/", authRoutes);
app.use('/blog', blogRoutes);
app.use((error, req, res, next) => {
    const message = error.message || "Internal server error";
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({message});
})
