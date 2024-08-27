import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Swal from "sweetalert2";
import "react-multi-date-picker/styles/layouts/mobile.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BlockAppointmentDates = () => {
  const axiosSecure = useAxiosSecure();

  const [blockedDates, setBlockedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch blocked dates, times, and days from the server
    axiosSecure
      .get(`/blocked-dates`)
      .then((res) => setBlockedDates(res.data))
      .catch((error) => console.error("Error fetching blocked dates:", error));
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const blockData = {
      date: selectedDate ? selectedDate.format("DD/MM/YYYY dddd") : null,
      day: selectedDay,
      startTime: startTime ? startTime.format("hh:mm A") : null,
      endTime: endTime ? endTime.format("hh:mm A") : null,
    };

    axiosSecure
      .post(`/block-date`, blockData)
      .then((res) => {
        setLoading(false);
        setBlockedDates([...blockedDates, res.data]);
        Swal.fire({
          icon: "success",
          title: "Blocked",
          text: "Date/Time/Day blocked successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error blocking date/time/day:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while blocking. Please try again later.",
        });
      });
  };

  const handleDelete = (id) => {
    axiosSecure
      .delete(`/blocked-dates/${id}`)
      .then((res) => {
        setBlockedDates(blockedDates.filter((date) => date._id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Blocked entry deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error deleting blocked entry:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while deleting. Please try again later.",
        });
      });
  };

  return (
    <div className="p-5">
      <h3 className="text-3xl font-bold text-center my-5">
        Block Appointment Dates/Times/Days
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-gray-700">Select Date</label>
            <DatePicker
              placeholder="Select The Date"
              inputClass="input w-full text-gray-800 border-sky-500 border"
              onChange={(date) => setSelectedDate(date)}
              className="rmdp-mobile"
              value={selectedDate}
              format="DD/MM/YYYY dddd"
            />
          </div>

          <div>
            <label className="block text-gray-700">Select Day</label>
            <select
              className="input w-full text-gray-800 border-sky-500 border"
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option value="">Select Day</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </div>

          <div className="flex gap-5">
            <div>
              <label className="block text-gray-700">Start Time</label>
              <DatePicker
                inputClass="input w-full text-gray-800 border-sky-500 border"
                disableDayPicker
                placeholder="Select Start Time"
                onChange={(time) => setStartTime(time)} // Update state with selected time
                value={startTime}
                format="hh:mm A" // Format for displaying time
                plugins={[<TimePicker position="bottom" hideSeconds />]} // TimePicker plugin
              />
            </div>

            <div>
              <label className="block text-gray-700">End Time</label>
              <DatePicker
                inputClass="input w-full text-gray-800 border-sky-500 border"
                disableDayPicker
                placeholder="Select End Time"
                onChange={(time) => setEndTime(time)}
                value={endTime}
                format="hh:mm A"
                plugins={[<TimePicker hideSeconds />]}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-5 block w-full p-3 text-center rounded-sm bg-sky-500 btn text-white"
          disabled={loading}
        >
          {loading ? "Blocking..." : "Block Date/Time/Day"}
        </button>
      </form>

      <div className="mt-10">
        <h4 className="text-2xl font-bold text-center">
          Blocked Dates/Times/Days List
        </h4>
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full table-xs md:table-md divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Range
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blockedDates.map((blocked) => (
                <tr key={blocked._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {blocked.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{blocked.day}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {blocked.startTime} - {blocked.endTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(blocked._id)}
                      className="text-white bg-red-400 btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlockAppointmentDates;
