import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { TbFidgetSpinner } from "react-icons/tb";
import Swal from "sweetalert2";
import axios from "axios";
import "react-multi-date-picker/styles/layouts/mobile.css";

const Appointment = () => {
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const comment = e.target.comment.value;
    const formattedDate = date ? date.format("DD/MM/YYYY dddd") : ""; // Format the date
    const formattedTime = time ? time.format("hh:mm A") : ""; // Format the time

    const parts = formattedDate.split(" ");

    // The last part is the day of the week
    const day = parts[parts.length - 1];

    const appointmentData = {
      name,
      email,
      phone,
      comment,
      date: formattedDate,
      time: formattedTime,
      day,
    };

    axios
      .post(`${import.meta.env.VITE_SERVER}/appointments`, appointmentData)
      .then((res) => {
        setLoading(false);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Appointment Booked Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        e.target.reset();
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while booking the appointment. Please try again later.",
        });
        setLoading(false);
      });
  };

  return (
    <section>
      <h3 className="text-5xl font-bold text-center text-sky-500 my-5">
        Appointment
      </h3>

      <div className="flex flex-col md:flex-row gap-5 mb-9  px-5 items-center">
        <div className="md:w-1/2 p-10">
          <img
            className="object-cover w-full rounded-md"
            src="https://images.pexels.com/photos/6812561/pexels-photo-6812561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Patient Name"
                className="input w-full text-gray-800 border-sky-500  border "
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Patient email"
                className="input w-full text-gray-800 border-sky-500  border "
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                name="phone"
                type="number"
                placeholder="Enter Phone Number"
                className="input w-full text-gray-800 border-sky-500  border "
                required
              />
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Appointment Date</span>
                </label>
                <DatePicker
                  placeholder="Select The Date"
                  required
                  className="rmdp-mobile"
                  inputClass="input w-full text-gray-800 border-sky-500  border "
                  format="DD/MM/YYYY dddd"
                  onChange={(date) => {
                    setDate(date);
                  }}
                  value={date}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Appointment Time</span>
                </label>
                <DatePicker
                  required
                  inputClass="input w-full text-gray-800 border-sky-500  border "
                  placeholder="Select The Time"
                  disableDayPicker
                  value={time}
                  onChange={(time) => {
                    setTime(time);
                  }}
                  format="hh:mm A"
                  plugins={[<TimePicker />]}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Comment</span>
              </label>
              <textarea
                name="comment"
                placeholder="Comment"
                className="textarea w-full border-sky-500 textarea-bordered textarea-lg  "
              ></textarea>
            </div>

            <button
              disabled={loading}
              className="block mt-5  w-full p-3 text-center rounded-sm bg-sky-500 text-white"
              type="submit"
            >
              {loading ? (
                <TbFidgetSpinner className="text-xl text-white animate-spin m-auto" />
              ) : (
                "submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
