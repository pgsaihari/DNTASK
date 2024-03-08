// Import the Express library
import express from "express";

// Import the controller functions for handling gym-related routes
import { addData, getData, updateData } from "../controllers/gymControllers.js";

// Create an instance of the Express Router
const router = express.Router();

// Define routes and associate them with corresponding controller functions

// Route to get gym data
router.get("/get", getData);

// Route to add gym data
router.post('/add', addData);

// Route to update gym data
router.put('/update', updateData);

// Export the router for use in other files
export { router as GymRouter };
