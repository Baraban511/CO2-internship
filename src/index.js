import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import {MyResponsiveChoropleth} from './Map.js';
import Landing from './Landing.js';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Navbar from './components/navbar'; // Assurez-vous d'importer votre composant Navbar


const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/map",
    element: <MyResponsiveChoropleth />,
  },
  {
    path: "/array",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
);