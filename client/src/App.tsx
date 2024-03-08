import "./App.css";
import AddData from "./pages/AddDataModel";
import { ResizableDemo } from "./pages/ResizableLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import UpdateData from "./pages/UpdateData";
function App() {
  return (
    <BrowserRouter>

       <div className="bg-slate-100">
        <div>
          <ToastContainer/>
  <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
   GYM logger
  </h1>
  <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
   Thank you DataNeuron for this opportunity,Instead of filling each component with some HTML elements I made it slightly creative.
   
     <br/>
   
  </p>
</div>

        

       
      </div>
    <Routes>
      <Route path="/" element={ <ResizableDemo />}/>
      <Route path="/add-workout" element={<AddData/>}/>
      <Route path="/update-workout" element={<UpdateData/>}/>
    </Routes>

   
    </BrowserRouter>
  );
}

export default App;
