import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const Main = () => {
  return (
    <div>
      <div className="h-16 relative z-50 w-full">
        <Navbar></Navbar>
      </div>
      <Outlet />
    </div>
  );
};

export default Main;
