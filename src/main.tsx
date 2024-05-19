import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HomePage, ViewPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/videoFilter/",
    element: <HomePage />,
  },{
    path: "/videoFilter/view/",
    element: <ViewPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>,
);
