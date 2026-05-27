/*require("dotenv").config({
    path:`.env.${process.env.NODE_ENV || "development"}`
});*/

const config=require("./config/config");

const express=require("express");

const categoryRoutes=require("./routes/categoryRoutes");

const productRoutes=require("./routes/productRoutes");

//const path=require("path");

const cors=require("cors");

const app=express();

app.use(express.json());

app.use(cors());

app.use("/api/category",categoryRoutes);

app.use("/api/product",productRoutes)

app.listen(config.port, () => console.log("Servidor corriendo en http://localhost:3000"));

