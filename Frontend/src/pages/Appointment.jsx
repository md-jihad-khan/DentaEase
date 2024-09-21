import { useEffect, useRef, useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { TbFidgetSpinner } from "react-icons/tb";
import Swal from "sweetalert2";
import axios from "axios";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import img1 from "../assets/faq2.png";

const Appointment = () => {
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inView, setInView] = useState(false);
  const imageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const comment = e.target.comment.value;
    const formattedDate = date ? date.format("DD/MM/YYYY dddd") : ""; // Format the date
    const formattedTime = time ? time.format("hh:mm A") : ""; // Format the time

    const parts = formattedDate.split(" ");
    const day = parts[parts.length - 1]; // The last part is the day of the week

    const appointmentData = {
      name,
      email,
      phone,
      comment,
      date: formattedDate,
      time: formattedTime,
      day,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/appointments`,
        appointmentData
      );
      setLoading(false);
      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Appointment Booked Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      e.target.reset();
    } catch (error) {
      setLoading(false);

      const {
        error: errorMsg,
        message,
        blockedTimes,
      } = error.response?.data || {};

      const errorMessage = errorMsg || "An error occurred. Please try again.";
      let detailedMessage = message || "";

      // Helper function to format time with AM/PM
      const formatTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = (((hours + 11) % 12) + 1)
          .toString()
          .padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        return `${formattedHours}:${formattedMinutes} ${period}`;
      };

      // Handle blocked times and include details about time ranges
      if (blockedTimes && blockedTimes.length > 0) {
        detailedMessage += "\nClosed";
        blockedTimes.forEach(({ startTime, endTime }) => {
          if (startTime && endTime) {
            const formattedStartTime = formatTime(startTime);
            const formattedEndTime = formatTime(endTime);
            detailedMessage += `\n Time Range: ${formattedStartTime} to ${formattedEndTime} please add appointment before or after this time`;
          }
        });
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: detailedMessage || errorMessage,
      });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    const img = imageRef.current;
    if (img) observer.observe(img);
    return () => img && observer.unobserve(img);
  }, []);

  return (
    <section>
      <h3 className="text-5xl font-bold text-center text-sky-500 my-5">
        Appointment
      </h3>

      <div className="flex flex-col md:flex-row gap-5 mb-9  px-5 items-center ">
        <div className="md:w-1/2 p-10 relative">
          <img
            ref={imageRef}
            className={`object-cover w-full rounded-3xl ${
              inView ? "initial-animation" : ""
            }`}
            src={img1}
            alt=""
          />
          <div className="bg-sky-500 text-white p-3 w-3/4 rounded-3xl border-white border-4 absolute right-0 bottom-5 ">
            <div className="flex items-center gap-5">
              <h5 className="text-xl md:text-5xl font-bold">4.5/5</h5>{" "}
              <p className="font-semibold text-xs md:text-base">
                This rate is given by user after visiting our location
              </p>
            </div>

            <div className="flex gap-5 items-center border-t mt-3 pt-3 text-xl">
              <span className="flex ">{renderStars(4.5)}</span>
              <p className="font-bold text-xs md:text-base">
                For excellence services
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">
                <span className="label-text ">Name</span>
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
              <label className="label font-bold">
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
              <label className="label font-bold">
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
                <label className="label font-bold">
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
                <label className="label font-bold">
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
                  plugins={[<TimePicker hideSeconds />]}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label font-bold">
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
              className="block mt-5  w-full p-3 text-center btn bg-sky-500 text-white rounded-xl"
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
