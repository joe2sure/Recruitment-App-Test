import { RouterProvider } from "react-router-dom";
import { Routes } from "./routes/routes";
// import "./index.css";
// import "./styles/customstyles.css";
const App = () => {
  return (
    <div>
      <RouterProvider router={Routes} />
    </div>
  );
};

export default App;
