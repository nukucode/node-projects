import express from "express";
import { getUser, login, signup, updateUser } from "../../controllers/auth.js";

const route = express.Router();

route.post("/login", login);

route.post("/signup", signup);

route.post("/update", updateUser);

route.get("/user", getUser);

export { route };
