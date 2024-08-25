import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div className="relative min-h-screen md:flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Outlet --> Dynamic content */}
        <div className="flex-1 font-poppins md:ml-64">
          <div className="p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
