import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { TbFidgetSpinner } from "react-icons/tb";

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
    const formattedDate = date ? date.format("DD/MM/YYYY") : ""; // Format the date
    const formattedTime = time ? time.format("hh:mm A") : ""; // Format the time

    setLoading(false);
    console.log(name, email, phone, comment, formattedDate, formattedTime);
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
                  inputClass="input w-full text-gray-800 border-sky-500  border "
                  format="dd/mm/YY/dddd"
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
