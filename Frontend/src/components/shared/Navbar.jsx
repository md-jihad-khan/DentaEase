import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-sky-500 border-b-2 rounded-none border-sky-500 font-bold"
              : "font-normal hover:gradient-text "
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-sky-500 border-b-2 rounded-none border-sky-500 font-bold"
              : "font-normal  "
          }
          to={"/apartments"}
        >
          About us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-white/30 shadow-sm   font-poppins backdrop-blur-md fixed w-full ">
      <div className="mx-auto lg:container ">
        <div className="navbar font-poppins">
          <div className="navbar-start ">
            <div className="dropdown ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-base-100"
              >
                {navLinks}
              </ul>
            </div>
            <Link
              to={"/"}
              className=" text-lg md:text-3xl font-semi-bold gradient-text font-rancho justify-center flex flex-col items-center "
            >
              <p className="font-poppins flex items-center font-bold">
                <span className="text-sky-500">Denta</span> Ease
              </p>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-3">{navLinks}</ul>
          </div>
          <div className="navbar-end md:mr-10 mr-3 ">
            <Link
              to={"/appointment"}
              className="btn bg-sky-500  text-sm text-white"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
