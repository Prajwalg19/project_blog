import express from "express";
import {register, login, Oauth, deleteUser} from "../controllers/authController.js";
const route = express.Router();

route.post("/register", register);
route.post("/login", login)
route.post("/oauth", Oauth)
route.delete("/delete/:id", deleteUser)

export default route;
