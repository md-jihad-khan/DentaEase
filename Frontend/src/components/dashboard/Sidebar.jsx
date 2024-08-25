import { Link } from "react-router-dom";

import { GrLogout } from "react-icons/gr";
import { TbCalendarCancel } from "react-icons/tb";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaFileSignature, FaHome, FaRegUser, FaUsers } from "react-icons/fa";
import { RiCoupon3Fill } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { MdOutlineAnnouncement } from "react-icons/md";
import { AiOutlineBars } from "react-icons/ai";
import { HiCalendar } from "react-icons/hi";

import MenuItem from "./MenuItem";

import { useState } from "react";

const Sidebar = () => {
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-base-200  flex items-center justify-between md:hidden">
        <div>
          <div className="w-full mx-auto">
            <Link className="flex " to="/">
              <p className="font-poppins text-xl flex items-center font-bold">
                <span className="text-sky-500">Denta</span> Ease
              </p>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none "
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-base-200 w-64  py-2 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full  md:flex   rounded-lg items-center  mx-auto">
              <Link className="flex gap-5  justify-center w-full" to="/">
                <p className="font-poppins text-xl flex items-center font-bold">
                  <span className="text-sky-500">Denta</span> Ease
                </p>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex mt-5 flex-col justify-between flex-1 ">
            {/*  Menu Items */}
            <nav>
              <>
                <MenuItem
                  label="My Profile"
                  address="/dashboard"
                  icon={FaRegUser}
                />
                <MenuItem
                  label="Today Appointments"
                  address="/dashboard/todayAppointments"
                  icon={HiCalendar}
                />
                <MenuItem
                  label="All Appointments"
                  address="/dashboard/allAppointments"
                  icon={FaUsers}
                />
                <MenuItem
                  label="Block Appointment"
                  address="/dashboard/blockedDates"
                  icon={TbCalendarCancel}
                />
                <MenuItem
                  label="Agreement Requests"
                  address="/dashboard/agreementRequest"
                  icon={FaFileSignature}
                />
                <MenuItem
                  label="Manage Coupons"
                  address="/dashboard/manageCoupons"
                  icon={RiCoupon3Fill}
                />
              </>
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}

          <Link
            to={"/"}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-sky-500   hover:text-white transition-colors duration-300 transform"
          >
            <FaHome className="w-5 h-5" />

            <span className="mx-4 font-medium">Home</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
