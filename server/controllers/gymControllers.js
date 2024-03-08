// Import the Gym model
import Gym from "../model/GYM.js";

// Controller function to add data to the Gym collection
export const addData = async (req, res) => {
  try {
    // Destructure workout and weight from the request body
    const { workout, weight } = req.body;

    // Fetch the existing data from the Gym collection
    const data = await Gym.findOne({});

    // Calculate the new add_count
    const newAddCount = data ? data.add_count + 1 : 1;

    // Delete all existing documents in the collection (ensures only one document in the collection)
    await Gym.deleteMany({});

    // Create a new Gym instance with the updated add_count
    const newData = await new Gym({
      workout,
      weight,
      add_count: newAddCount,
    });

    // Save the new data to the Gym collection
    await newData.save();

    // Send the newly added data in the response
    res.status(200).send(newData);
  } catch (err) {
    console.error(err);
    // Handle server error and send an appropriate response
    res.status(500).send({ success: false, message: err.message });
  }
};

// Controller function to update data in the Gym collection
export const updateData = async (req, res) => {
  try {
    // Destructure workout and weight from the request body
    const { workout, weight } = req.body;

    // Find the existing data in the Gym collection
    const data = await Gym.findOne({});

    // If no data is found, return a 404 response
    if (!data) {
      return res.status(404).send({ success: false, message: "No data found" });
    }

    // Update the update_count
    const updateCount = data.update_count + 1;

    // Use findOneAndUpdate to update the document and get the updated data
    const updatedData = await Gym.findOneAndUpdate(
      {},
      { workout, weight, update_count: updateCount },
      { new: true }
    );

    // Send the updated data in the response
    res.status(200).send(updatedData);
  } catch (error) {
    console.error(error);
    // Handle server error and send an appropriate response
    res.status(500).send({ success: false, message: error.message });
  }
};

// Controller function to get data from the Gym collection
export const getData = async (req, res) => {
  try {
    // Fetch data from the Gym collection
    const data = await Gym.findOne({});

    // Send the fetched data in the response
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    // Handle server error and send an appropriate response
    res.status(500).send({ success: false, message: error.message });
  }
};
