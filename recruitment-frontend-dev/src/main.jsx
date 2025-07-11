import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Routes } from './routes/routes.jsx';
import { store } from './store/index.js';
import "./index.css";
import "./App.css";
import "./styles/customstyles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Routes} />
    </Provider>
  </StrictMode>
);