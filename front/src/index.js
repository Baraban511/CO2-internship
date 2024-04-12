import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import App from "./App.js";
import { MyResponsiveChoropleth } from "./Map.js";
import Landing from "./Landing.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Navbar from "./components/navbar";
import Add from "./Add.js";
import { SpeedInsights } from "@vercel/speed-insights/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <Landing />,
  },
  {
    path: "/map",
    element: <MyResponsiveChoropleth />,
  },
  {
    path: "/data",
    element: <App />,
  },
  {
    path: "/add",
    element: <Add />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>
);
