import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Dashboard from "../layouts/Dashboard";
import Appointment from "../pages/Appointment";
import AllAppointments from "../pages/dashboard/AllAppointments";
import TodayAppointments from "../pages/dashboard/TodayAppointments";
import BlockAppointmentDates from "../pages/dashboard/BlockAppointmentDates";
import AllPatients from "../pages/dashboard/AllPatients";
import AdminLogin from "../pages/AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/Home";
import Profile from "../pages/dashboard/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/appointment",
        element: <Appointment />,
      },
    ],
  },

  {
    path: "/adminLogin",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: "allAppointments",
        element: (
          <ProtectedRoute>
            <AllAppointments />
          </ProtectedRoute>
        ),
      },
      {
        path: "todayAppointments",
        element: (
          <ProtectedRoute>
            <TodayAppointments />
          </ProtectedRoute>
        ),
      },
      {
        path: "blockedDates",
        element: (
          <ProtectedRoute>
            <BlockAppointmentDates />
          </ProtectedRoute>
        ),
      },
      {
        path: "allPatients",
        element: (
          <ProtectedRoute>
            <AllPatients />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
