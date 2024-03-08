// Importing necessary components and libraries
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// React functional component for the resizable demo
export function ResizableDemo() {
  // State to store gym data
  const [gymData, setGymData] = useState({
    workout: "No workouts added",
    weight: "no weight added",
    add_count: 0,
    update_count: 0,
  });

  // Hook to navigate between routes
  const navigate = useNavigate();

  // Function to fetch gym data from the server
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/get");
      
      // Update the component state with fetched data
      setGymData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // JSX structure for the resizable panels and content
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w max-h rounded-lg border-2"
    >
      {/* Left resizable panel containing workout information */}
      <ResizablePanel defaultSize={100}>
        <div className="flex h-[100vh] items-center justify-center p-6  ">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Workout today:
            <span className="text-blue-600 dark:text-blue-500">
              {gymData.workout}
            </span>
            <br />{" "}
            {/* Button to navigate to the 'Add Workout' page */}
            <span>
              <button
                type="button"
                onClick={() => {
                  navigate("/add-workout");
                }}
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Add
              </button>
            </span>
          </h1>
        </div>
      </ResizablePanel>

      {/* Resizable handle between panels */}
      <ResizableHandle />

      {/* Right resizable panel containing weight and workout count information */}
      <ResizablePanel defaultSize={100}>
        <ResizablePanelGroup direction="vertical">
          {/* Top section displaying weight information */}
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6 border-2">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                <span className="text-blue-600 dark:text-blue-500">
                  Weight:
                </span>
                {gymData.weight}kgs{" "}
              </h1>
            </div>
          </ResizablePanel>

          {/* Resizable handle between top and bottom sections */}
          <ResizableHandle />

          {/* Bottom section displaying workout count information */}
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6 border-2">
              <h1 className="text-5xl font-extrabold dark:text-white">
                {gymData.add_count}
                <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
                  workouts added
                </small>
                ,todays workout is updated
                <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
                  {gymData.update_count} times 
                  {/* Link to navigate to the 'Update Workout' page */}
                  <Link to="/update-workout">... [click to update]</Link> 
                </small>
              </h1>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
