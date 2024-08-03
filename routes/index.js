//Here you will import route files and export them as used in previous labs
import homeRoute from "./home.js";
import loginRoutes from "./login.js";
import daycareRoutes from "./daycares.js"
import express from "express";

const constructorMethod = (app) => {
  app.use(express.json());

  app.use("/", homeRoute);
  app.use("/login", loginRoutes);
  app.use("/daycares", daycareRoutes);

  app.use("*", (req, res) => {
    return res.status(404).json({ error: "Not found" });
  });
};

export default constructorMethod;
