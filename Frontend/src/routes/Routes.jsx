import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Dashboard from "../layouts/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [],
  },
]);
