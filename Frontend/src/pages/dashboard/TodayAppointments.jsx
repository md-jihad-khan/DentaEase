import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TodayAppointments = () => {
  const axiosSecure = useAxiosSecure();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch today's appointments from the API
    const fetchTodayAppointments = () => {
      axiosSecure
        .get(`/appointments/today`)
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
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="card bg-sky-500 text-white shadow-lg"
          >
            <div className="card-body">
              <h2 className="card-title">{appointment.name}</h2>
              <p className="text-sm">Date: {appointment.date}</p>
              <p className="text-sm">Time: {appointment.time}</p>
              <p className="text-sm">Comment: {appointment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayAppointments;
