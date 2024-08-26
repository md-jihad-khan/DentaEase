import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Dashboard from "../layouts/Dashboard";
import Appointment from "../pages/Appointment";
import AllAppointments from "../pages/dashboard/AllAppointments";
import TodayAppointments from "../pages/dashboard/TodayAppointments";
import BlockAppointmentDates from "../pages/dashboard/BlockAppointmentDates";
import AllPatients from "../pages/dashboard/AllPatients";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/appointment",
        element: <Appointment />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "allAppointments",
        element: <AllAppointments />,
      },
      {
        path: "todayAppointments",
        element: <TodayAppointments />,
      },
      {
        path: "blockedDates",
        element: <BlockAppointmentDates />,
      },
      {
        path: "allPatients",
        element: <AllPatients />,
      },
    ],
  },
]);
