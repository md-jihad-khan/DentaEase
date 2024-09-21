import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// Helper function to group patients by day
const groupPatientsByDay = (patients) => {
  const groupedData = {};
  patients.forEach((patient) => {
    const [month, day, year] = patient.createdAt.split("/");
    const formattedDate = `${month}/${day}`; // You can change this format as needed
    groupedData[formattedDate] = (groupedData[formattedDate] || 0) + 1;
  });
  return Object.keys(groupedData).map((date) => ({
    date,
    patients: groupedData[date],
  }));
};

const groupAppointmentsByDate = (appointments) => {
  const groupedData = {};
  appointments.forEach((appointment) => {
    const [datePart] = appointment.date.split(" "); // Get only the date part
    const [day, month, year] = datePart.split("/"); // Split by '/'
    const formattedDate = `${day}-${month}-${year}`;
    groupedData[formattedDate] = (groupedData[formattedDate] || 0) + 1;
  });
  return Object.keys(groupedData).map((date) => ({
    date,
    appointments: groupedData[date],
  }));
};

const Profile = () => {
  const [data, setData] = useState({ appointments: [], patients: [] });
  const [yearOptions, setYearOptions] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get(
          `/chart-data?year=${year}&month=${month}`
        );
        setData(response.data);

        const uniqueYears = Array.from(
          new Set(
            response.data.appointments.map((appointment) => {
              const [datePart] = appointment.date.split(" ");
              const [, , year] = datePart.split("/");
              return year;
            })
          )
        );
        setYearOptions(uniqueYears);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    fetchData();
  }, [year, month, axiosSecure]);

  const appointmentData = groupAppointmentsByDate(data.appointments);

  const patientData = groupPatientsByDay(data.patients);

  //   const patientData = data.patients.map((patient) => ({
  //     month: patient.createdAt?.split("-").reverse().join("/"),
  //     patients: data.patients.length,
  //   }));

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-4">
        Appointment and Patient Trends
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full">
          <h3 className="text-center font-semibold mb-2">Appointment Trends</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="appointments" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full">
          <h3 className="text-center font-semibold mb-2">Patient Trends</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={patientData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="patients" fill="#0EA5E9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <label className="mr-4">
          <span>Select Year: </span>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border rounded p-2"
          >
            {yearOptions.map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Select Month: </span>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border rounded p-2"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default Profile;
