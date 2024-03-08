// Import necessary dependencies and libraries
import axios from "axios";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Functional component for adding workout data
const AddData = () => {
  // State variables to manage form inputs and loading state
  const [workout, setWorkout] = useState("");
  const [weight, setWeight] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Hook for navigation between routes
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Set loading state to true while processing the form
      setLoading(true);

      // Send a POST request to the server to add workout data
      const { data } = await axios.post("/api/add", { workout, weight });

      // Handle response from the server
      if (data.success === false) {
        setLoading(false);
        // Display error message using toast notification
        return toast.error("Something went wrong");
      }

      // Reset loading state and navigate to the home page
      setLoading(false);
      navigate('/');
      // Display success message using toast notification
      return toast.success("Workout added");
    } catch (error) {
      // Log the error to the console
      console.log(error);
      // Display error message using toast notification
      return toast.error("Error in adding workout");
    }
  };

  // JSX structure for the workout data form
  return (
    <form className="max-w-sm mx-auto " onSubmit={handleSubmit}>
      {/* Form input for workout */}
      <div className="mb-5">
        <label className="block mb-2 text-l font-medium text-gray-900 dark:text-white">
          Today's Workout
        </label>
        <input
          type="text"
          id="workout"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="CHEST DAY"
          required
          onChange={(e) => {
            setWorkout(e.target.value);
          }}
        />
      </div>

      {/* Form input for weight */}
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Weight
        </label>
        <input
          type="number"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
          onChange={(e) => {
            // Parse the input value to a number
            const parsedWeight = parseFloat(e.target.value);

            // Check if the conversion is successful before setting the state
            if (!isNaN(parsedWeight)) {
              setWeight(parsedWeight);
            }
          }}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {/* Display "LOADING" text when loading, otherwise display "ADD WORKOUT" */}
        {loading ? "LOADING" : "ADD WORKOUT"}
      </button>
    </form>
  );
};

// Export the AddData component
export default AddData;
