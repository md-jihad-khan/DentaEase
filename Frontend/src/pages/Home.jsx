import doctor from "../assets/doctor.png";

const Home = () => {
  return (
    <section className="flex min-h-screen items-center justify-center flex-col md:flex-row bg-gradient-to-b from-sky-100 from-10%  to-transparent">
      <div className="w-1/2 p-10  space-y-5">
        <h3 className="font-bold text-6xl">Consult Your Dental Health Issue</h3>
        <p className="text-sm text-gray-500">
          Achieve a healthy, beautiful smile with our comprehensive dental care
          services. From routine cleanings and exams to advanced restorative
          treatments, we are committed to maintaining your oral health. Our
          experienced team provides personalized care in a comfortable,
          state-of-the-art environment, ensuring your teeth and gums remain in
          top condition.
        </p>

        <button className="btn rounded-3xl bg-sky-500 text-white ">
          Book a Appointment
        </button>
      </div>
      <div className="w-1/2">
        <img className="" src={doctor} alt="" />
      </div>
    </section>
  );
};

export default Home;
