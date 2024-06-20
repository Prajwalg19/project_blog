import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import express from "express"
import morgan from "morgan";
dotenv.config();

const app = express();
const corsConfig = {
    origin: ["http://localhost:5173"]
}

app.use(cors(corsConfig))
app.use(express.json());
app.use(morgan("dev"))

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


app.use("/", (req, res, next) => {res.send("Hello world")})
