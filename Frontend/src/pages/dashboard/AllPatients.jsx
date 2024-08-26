import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaPlus, FaSearch } from "react-icons/fa";
import { RiDeleteBin3Fill } from "react-icons/ri";

const AllPatients = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
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

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SERVER
        }/patients?page=${currentPage}&search=${search}`
      );
      setPatients(response.data.patients);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [currentPage, search]);

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

  return (
    <div>
      <div>
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

        <button
          className="btn"
          onClick={() => {
            setSelectedPatient(null);
            document.getElementById("add_patient_modal").showModal();
          }}
        >
          Add Patient <FaPlus />
        </button>
      </div>

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

export default AllPatients;
