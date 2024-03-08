// Import the Mongoose library
import mongoose from "mongoose";

// Define the schema for the Gym collection
const gymSchema = new mongoose.Schema({
    // Define a field for workout with a String type and is required
    workout: {
        type: String,
        required: true
    },
    
    // Define a field for weight with a Number type and is required
    weight: {
        type: Number,
        required: true
    },
    
    // Define a field for add_count with a Number type, default value of 0, and is required
    add_count: {
        type: Number,
        default: 0,
        required: true
    },
    
    // Define a field for update_count with a Number type, default value of 0, and is required
    update_count: {
        type: Number, 
        default: 0,
        required: true
    }
}, { 
    // Enable timestamps to automatically add createdAt and updatedAt fields
    timestamps: true
});  

// Create the Gym model using the defined schema
const Gym = mongoose.model("Gym", gymSchema);

// Export the Gym model for use in other files
export default Gym;
