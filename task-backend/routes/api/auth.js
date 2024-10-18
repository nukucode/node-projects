import express from "express";

const route = express.Router();

route.post("/login", () => {
  console.log("first");
});

export { route };
