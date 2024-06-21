import express from "express";
import {register, login, Oauth} from "../controllers/authController.js";
const route = express.Router();

route.post("/register", register);
route.post("/login", login)
route.post("/oauth", Oauth)

export default route;
