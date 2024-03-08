// Import the dotenv library to load environment variables
import dotenv from "dotenv";
dotenv.config();

// Import the Express and Mongoose libraries
import express from "express";
import mongoose from "mongoose";

import path from "path"

// Import the GymRouter for handling gym-related routes
import { GymRouter } from "./routes/Gym-routes.js";

// Create an instance of the Express application
const app = express();

// Define the port number for the server
const PORT = 3000;
const __dirname=path.resolve()
// Use JSON middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Use the GymRouter middleware for routes starting with "/api"
app.use("/api", GymRouter);
app.use(express.static(path.join(__dirname,"/client/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
// Connect to the MongoDB database using the provided URI
mongoose.connect(process.env.MONGO_URI).then(() => {
    // Log a message upon successful database connection
    console.log("Connected to the gym database");

    // Start the server and listen on the specified port
    app.listen(PORT, () => {
        console.log(`Server connected to http://localhost:${PORT}`);
    });
}).catch((err) => {
    // Log an error message if the database connection fails
    console.log("Something went wrong");
    console.log(err.message);
});

