import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllAppointments = () => {
  const axiosSecure = useAxiosSecure();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  useEffect(() => {
    // Function to fetch appointments from the API
    const fetchAppointments = () => {
      axiosSecure
        .get(`/appointments?page=${currentPage}&search=${search}`)
        .then((res) => {
          setAppointments(res.data.appointments);
          setTotalPages(res.data.totalPages);
          setLoading(false);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while fetching appointments. Please try again later.",
          });
          setError("Failed to fetch appointments");
          setLoading(false);
        });
    };

    fetchAppointments();
  }, [currentPage, search]);

  const MAX_VISIBLE_PAGES = 8;
  const halfMaxPages = Math.floor(MAX_VISIBLE_PAGES / 2);

  // Calculate the start page
  let startPage = Math.max(1, currentPage - halfMaxPages);

  // Calculate the end page
  let endPage = startPage + MAX_VISIBLE_PAGES - 1;

  // If the endPage exceeds the totalPages, adjust the startPage and endPage
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3 className="text-3xl font-bold text-center my-5">Appointments</h3>

      <form onSubmit={handleSearch} className="w-full md:w-1/2 mx-auto px-2">
        <label className="flex items-center border-r-0 pr-0">
          <input
            type="text"
            name="search"
            className="w-full input focus:outline-none border border-gray-300 rounded-full rounded-r-none"
            placeholder="Enter the name or email"
          />
          <button
            type="submit"
            className="btn-square rounded-r-full px-10 bg-sky-500 text-white"
          >
            <FaSearch />
          </button>
        </label>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comment
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.comment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div className="flex justify-center mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePaginationButton(currentPage - 1)}
            className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-sky-500 hover:text-white"
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="mx-1">previous</span>
            </div>
          </button>

          {Array.from(
            { length: endPage - startPage + 1 },
            (_, idx) => startPage + idx
          ).map((btnNum) => (
            <button
              onClick={() => handlePaginationButton(btnNum)}
              key={btnNum}
              className={`hidden ${
                currentPage === btnNum ? "bg-sky-500 text-white" : ""
              } px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-sky-500 hover:text-white`}
            >
              {btnNum}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePaginationButton(currentPage + 1)}
            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-sky-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
