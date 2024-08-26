import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaPlus } from "react-icons/fa";
import { RiDeleteBin3Fill } from "react-icons/ri";

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/patients`
      );
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleAddPatient = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const comment = form.comment.value;

    const newPatient = { name, email, phone, comment };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/patients`,
        newPatient
      );
      console.log("Added patient:", response.data); // Debugging log
      fetchPatients();
      form.reset(); // Reset the form after successful submission
      document.getElementById("add_patient_modal").close();
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const handleDeletePatient = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER}/patients/${id}`
      );
      console.log("Deleted patient:", response.data); // Debugging log
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    document.getElementById("add_patient_modal").showModal();
  };

  const handleUpdatePatient = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const comment = form.comment.value;

    const updatedPatient = { name, email, phone, comment };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER}/patients/${selectedPatient._id}`,
        updatedPatient
      );
      console.log("Updated patient:", response.data); // Debugging log
      fetchPatients();
      document.getElementById("add_patient_modal").close();
      setSelectedPatient(null);
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  return (
    <div>
      <button
        className="btn"
        onClick={() => {
          setSelectedPatient(null);
          document.getElementById("add_patient_modal").showModal();
        }}
      >
        Add Patient <FaPlus />
      </button>

      <dialog id="add_patient_modal" className="modal">
        <div className="modal-box">
          <form
            onSubmit={selectedPatient ? handleUpdatePatient : handleAddPatient}
          >
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() =>
                document.getElementById("add_patient_modal").close()
              }
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">
              {selectedPatient ? "Edit Patient Info" : "Add Patient Info"}
            </h3>
            <div className="py-4">
              <div className="form-control">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={selectedPatient?.name || ""}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={selectedPatient?.email || ""}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={selectedPatient?.phone || ""}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">Comment</label>
                <textarea
                  name="comment"
                  defaultValue={selectedPatient?.comment || ""}
                  className="textarea textarea-bordered"
                  required
                ></textarea>
              </div>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                {selectedPatient ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient, index) => (
          <div key={index} className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{patient.name}</h2>
              <p>Email: {patient.email}</p>
              <p>Phone: {patient.phone}</p>
              <p>Comment: {patient.comment}</p>
              <div className="card-actions justify-between mt-5">
                <button
                  onClick={() => handleEditPatient(patient)}
                  className="btn bg-sky-400 text-white"
                >
                  Edit <FaEdit />
                </button>
                <button
                  onClick={() => handleDeletePatient(patient._id)}
                  className="btn bg-red-500 text-white"
                >
                  Delete <RiDeleteBin3Fill />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPatients;
