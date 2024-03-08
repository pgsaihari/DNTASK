// Import necessary dependencies and libraries
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Functional component for updating workout data
const UpdateData = () => {
  // State variables to manage form inputs, loading state, and navigation
  const [workout, setWorkout] = useState("");
  const [weight, setWeight] = useState<number>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to fetch existing data from the server
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/get");
      
      // Set the default values for workout and weight based on fetched data
      setWorkout(data.workout);
      setWeight(data.weight);
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Set loading state to true while processing the form
      setLoading(true);

      // Send a PUT request to the server to update workout data
      const { data } = await axios.put("/api/update", { workout, weight });

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
      return toast.success("Workout updated");

    } catch (error) {
      // Log the error to the console
      console.log(error);
      // Display error message using toast notification
      return toast.error("Error occurred");
    }
  };

  // JSX structure for the workout data update form
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
          defaultValue={workout}
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
          defaultValue={weight}
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
        {/* Display "LOADING" text when loading, otherwise display "UPDATE WORKOUT" */}
        {loading ? "LOADING" : "UPDATE WORKOUT"}
      </button>
    </form>
  );
};

// Export the UpdateData component
export default UpdateData;
