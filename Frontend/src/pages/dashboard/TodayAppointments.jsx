import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TodayAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch today's appointments from the API
    const fetchTodayAppointments = () => {
      axios
        .get(`${import.meta.env.VITE_SERVER}/appointments/today`)
        .then((res) => {
          setAppointments(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while fetching today's appointments. Please try again later.",
          });
          setError("Failed to fetch today's appointments");
          setLoading(false);
        });
    };

    fetchTodayAppointments();
  }, []);

  if (loading) return <p>Loading today's appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3 className="text-3xl font-bold text-center my-5">
        Today's Appointments {appointments?.length}
      </h3>
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
    </div>
  );
};

export default TodayAppointments;
