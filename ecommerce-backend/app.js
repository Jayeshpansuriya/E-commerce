import express from "express";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";




//config 
dotenv.config();//? database configuration from this config file will redirect to the app.js
const app = express();//? whole express is stord in this config 

//middleware
app.use(express.json()); //? Parses incoming JSON data from the request body Converts it into a JavaScript object So you can easily use req.body in your routes
app.use(cors())//? This enables CORS (Cross-Origin Resource Sharing).
// When your frontend (like React) is hosted on one domain (e.g. localhost:3000)
// and your backend (Node.js) is on another (e.g. localhost:5000),
// CORS is required to allow communication between them.

app.use("/api/products",productRoutes);
app.use("/api/users", userRoutes);
//test route
app.get("/",(req,res)=>{
    res.send("API is running..");
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=> console.log(`Server running at PORT ${PORT}`));

})
.catch((err)=> console.log("MongoDB connection failed:" ,err));