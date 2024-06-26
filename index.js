import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import categoriesRoutes from "./src/routes/categories.routes.js";
import productsRoutes from "./src/routes/product.routes.js";
import sizeRoutes from "./src/routes/size.routes.js";
import sellRoutes from "./src/routes/sell.routes.js";

import mongoose from "mongoose";

// ENTORNO
dotenv.config();
//DATABASE CONECTION
// Conexión a MongoDB Atlas
const dbURI = process.env.DATABASE_MONGO_URI;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10
  })
  .then(() => {
    console.log("Conexión a MongoDB Atlas exitosa!");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB Atlas", err);
  });

// SERVER
const app = express();
app.use(morgan("dev"));
const corsOptions = {
  origin: "*",
  credentials: false, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(express.static(path.join("public")));
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port);
console.log("Server on port: " + port);

// ROUTER
app.get("/", (req, res) => {
  res.json({ message: "hola perro" });
});

app.use("/category", categoriesRoutes);
app.use("/product", productsRoutes);
app.use("/size", sizeRoutes);
app.use("/sell", sellRoutes);
